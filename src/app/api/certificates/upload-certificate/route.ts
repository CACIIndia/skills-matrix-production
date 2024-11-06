import { BlobServiceClient } from '@azure/storage-blob';
import { NextResponse } from 'next/server';

import db from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    // Get the current session
    const session = await getSession();

    // Check if the user is authenticated
    if (!session || !session.user) {
      return NextResponse.json({ error: 'User is not authenticated' }, { status: 401 });
    }

    // Parse the incoming request body
    const { base64Certificate, name, obtainedDate, expiryDate, description, createdBy, certificateId } = await request.json();

    console.log(name, obtainedDate, expiryDate, description, createdBy, certificateId, "Request Data");

    const userId = session.user.id; // Extract userId from the session

    // If no base64Certificate is provided in the request
    if (!base64Certificate) {
      return NextResponse.json({ error: 'No certificate provided' }, { status: 400 });
    }

    // Read Azure storage account details from environment variables
    const storageAccount = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    const containerName = process.env.AZURE_CERTIFICATE_STORAGE_CONTAINER_NAME;
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

    if (!storageAccount || !containerName || !connectionString) {
      return NextResponse.json({ error: 'Azure storage configuration is missing' }, { status: 500 });
    }

    // Create BlobServiceClient
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

    // Get the container client for certificates
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Convert the base64 string to a Buffer
    const certificateBuffer = Buffer.from(base64Certificate, 'base64');

    let certificateUrl;
    let filename;

  
    if (!certificateId) {
     

      // Convert the name to lowercase and replace spaces with hyphens
   const formattedName = name.toLowerCase().replace(/\s+/g, '-');
    

      // Generate the filename
   const filename = `${formattedName}-${createdBy}-certificate.pdf`;

      // Get the block blob client for uploading the certificate
      const blockBlobClient = containerClient.getBlockBlobClient(filename);

      // Upload the certificate to Azure Blob Storage
      await blockBlobClient.uploadData(certificateBuffer, {
        blobHTTPHeaders: {
          blobContentType: 'application/pdf', // Ensure content type is set correctly
        },
      });

      // Construct the certificate URL
      certificateUrl = filename;
      console.log(certificateUrl,"certificateUrlcertificateUrlcertificateUrl");
    } else {
      // Update existing certificate
      const existingCertificate = await db.Certification.findUnique({
        where: { id: certificateId },
      });

      if (!existingCertificate) {
        return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
      }

  
      filename = existingCertificate.url.split('/').pop(); 
      const blockBlobClient = containerClient.getBlockBlobClient(filename);

      // Upload the new certificate data
      await blockBlobClient.uploadData(certificateBuffer, {
        blobHTTPHeaders: {
          blobContentType: 'application/pdf', 
        },
      });

      
      certificateUrl = existingCertificate.url; 
    }

    // Store or update certificate information in the Certification table
    const certificateData = {
      name,
      url: certificateUrl,
      createdBy: {
        connect: { id: createdBy }
      },
      obtainedDate: new Date(obtainedDate),
      expiryDate: new Date(expiryDate),
      description,
      updatedAt: new Date(),
      status: "Active"
    };

    if (certificateId) {
      // Update existing certificate
      await db.Certification.update({
        where: { id: certificateId },
        data: certificateData,
      });
    } else {
      // Create new certificate
      await db.Certification.create({
        data: {
          ...certificateData,
          createdAt: new Date(),
        },
      });
    }

    // Respond with a success message and certificate URL
    return NextResponse.json({ message: certificateId ? 'Certificate updated successfully' : 'Certificate uploaded successfully', certificate_url: `${process.env.AZURE_CERTIFICATE_END_POINT}/${certificateUrl}` }, { status: 200 });

  } catch (error) {
    console.error('Error during certificate upload:', error);
    return NextResponse.json({ error: 'Error occurred during certificate upload' }, { status: 500 });
  }
}
