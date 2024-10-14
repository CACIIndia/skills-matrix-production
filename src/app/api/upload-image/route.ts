// app/api/upload-image/route.ts
import { BlobServiceClient } from '@azure/storage-blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parse the incoming request body
    const { base64Image } = await request.json();

    // If no base64Image is provided in the request
    if (!base64Image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // Azure storage connection string and other details
    const storageAccount = 'smempprofile'; // Storage account name
    const containerName = 'profileimage';  // Replace with your actual container name
    const connectionString = `DefaultEndpointsProtocol=https;AccountName=${storageAccount};AccountKey=uDuP7qbD8FqrHCDDJGUTKbLxepfumKRsR3JeESe3tGT2eJNbEP7RlQP79vm8iFsSrybfownR3XDk+AStERctwQ==;EndpointSuffix=core.windows.net`;

    // Create BlobServiceClient
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

    // Get the container client
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Generate a unique filename using the current timestamp
    const filename = `${Date.now()}.png`;

    // Convert the base64 string to a Buffer
    const imageBuffer = Buffer.from(base64Image, 'base64');

    // Get the block blob client for uploading the image
    const blockBlobClient = containerClient.getBlockBlobClient(filename);

    // Upload the image to Azure Blob Storage
    await blockBlobClient.uploadData(imageBuffer, {
      blobHTTPHeaders: {
        blobContentType: 'image/png', // Ensure content type is set correctly
      },
    });

    // Respond with a success message
    return NextResponse.json({ message: 'Image uploaded successfully', filename }, { status: 200 });

  } catch (error) {
    console.error('Error during image upload:', error);
    return NextResponse.json({ error: 'Error occurred during image upload' }, { status: 500 });
  }
}
