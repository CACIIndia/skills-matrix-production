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
    const { base64Certificate, name, obtainedDate, expiryDate, description } = await request.json();

    console.log(name, obtainedDate, expiryDate, description ,"name, obtainedDate, expiryDate, description, status ");
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

    // Create the container if it does not exist
    await containerClient.createIfNotExists({
      access: 'blob', 
    });

    // Generate a unique filename using the userId and timestamp
    const filename = `${Date.now()}-${userId}-certificate.pdf`;

    // Convert the base64 string to a Buffer
    const certificateBuffer = Buffer.from(base64Certificate, 'base64');

    // Get the block blob client for uploading the certificate
    const blockBlobClient = containerClient.getBlockBlobClient(filename);

    // Upload the certificate to Azure Blob Storage
    await blockBlobClient.uploadData(certificateBuffer, {
      blobHTTPHeaders: {
        blobContentType: 'application/pdf', // Ensure content type is set correctly
      },
    });

    // Construct the certificate URL
    const certificateUrl = `https://${storageAccount}.blob.core.windows.net/${containerName}/${filename}`;

    // Store certificate information in the Certification table
    await db.Certification.create({
      data: {
        name,
        url: certificateUrl,
        obtainedDate: new Date(obtainedDate),
        expiryDate: new Date(expiryDate),
        description:"",
        createdAt: new Date(),
        updatedAt: new Date(),
        status:"Active"
      },
    });

    // Respond with a success message and certificate URL
    return NextResponse.json({ message: 'Certificate uploaded successfully', certificate_url: certificateUrl }, { status: 200 });

  } catch (error) {
    console.error('Error during certificate upload:', error);
    return NextResponse.json({ error: 'Error occurred during certificate upload' }, { status: 500 });
  }
}
