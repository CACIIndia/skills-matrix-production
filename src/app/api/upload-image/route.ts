// app/api/upload-image/route.ts
import { BlobServiceClient } from '@azure/storage-blob';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth'; // Import to access the session
import db from '@/lib/db';
import { options } from '@/lib/auth';// Adjust the import path for your authOptions

export async function POST(request: Request) {
  try {
    // Get the current session
    const session = await getServerSession(options);

    // Check if the user is authenticated
    if (!session || !session.user) {
      return NextResponse.json({ error: 'User is not authenticated' }, { status: 401 });
    }

    // Parse the incoming request body
    const { base64Image } = await request.json();
    const userId = session.user.id; // Extract userId from the session

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

    // Generate a unique filename using the userId
    const filename = `${Date.now()}${userId}.png`;

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

    // Update the user's image in the database
    const updatedUser = await db.user.update({
      where: { id: userId },  // User's unique identifier
      data: { image: `https://smempprofile.blob.core.windows.net/profileimage/${filename}` }, // Set the image field
    });

    // Update the image in the session
    session.user.image = `https://smempprofile.blob.core.windows.net/profileimage/${filename}`;
  

    // Respond with a success message
    return NextResponse.json({ message: 'Image uploaded successfully', image_url: session.user.image }, { status: 200 });

  } catch (error) {
    console.error('Error during image upload:', error);
    return NextResponse.json({ error: 'Error occurred during image upload' }, { status: 500 });
  }
}
