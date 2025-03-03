import { ContainerClient } from "@azure/storage-blob";

type AzureStorageConfig = {
  storageAccount: string;
  containerName: string;
  connectionString: string;
};

export const getAzureConfig = (): AzureStorageConfig => {
  const storageAccount = process.env.AZURE_STORAGE_ACCOUNT_NAME;
  const containerName = process.env.AZURE_CERTIFICATE_STORAGE_CONTAINER_NAME;
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

  if (!storageAccount || !containerName || !connectionString) {
    throw new Error("Azure storage configuration is missing");
  }

  return { storageAccount, containerName, connectionString };
};

export const uploadCertificateToBlob = async (
  containerClient: ContainerClient,
  filename: string,
  base64Certificate: string,
): Promise<string> => {
  const blockBlobClient = containerClient.getBlockBlobClient(filename);
  const certificateBuffer = Buffer.from(base64Certificate, "base64");

  await blockBlobClient.uploadData(certificateBuffer, {
    blobHTTPHeaders: {
      blobContentType: "application/pdf",
    },
  });

  // Return the URL of the uploaded blob
  return blockBlobClient.url;
};
