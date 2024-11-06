import { BlobServiceClient } from "@azure/storage-blob";
import db from "@/lib/db";

export const uploadUserImageBuffer = async (imageBuffer: Buffer, userId: string): Promise<string> => {
  try {
    const storageAccount = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    const containerUrl = process.env.AZURE_STORAGE_CONTAINER_URL;

    if (!storageAccount || !containerName || !connectionString || !containerUrl) {
      throw new Error("Azure storage configuration is missing");
    }

    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);

   
    const filename = `${Date.now()}-${userId}.png`;
    const blockBlobClient = containerClient.getBlockBlobClient(filename);

  
    await blockBlobClient.uploadData(imageBuffer, {
      blobHTTPHeaders: { blobContentType: "image/png" },
    });

    const profileImageUrl = `${containerUrl}/${filename}`;

 
    await db.user.update({
      where: { id: userId },
      data: { image: profileImageUrl },
    });

    return profileImageUrl;
  } catch (error) {
    throw new Error(`Unexpected error during image upload: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};
