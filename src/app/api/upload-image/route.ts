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

    // Read Azure storage account details from environment variables
    const storageAccount = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

    if (!storageAccount || !containerName || !connectionString) {
      return NextResponse.json({ error: 'Azure storage configuration is missing' }, { status: 500 });
    }

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
