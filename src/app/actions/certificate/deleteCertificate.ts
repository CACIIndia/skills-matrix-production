// app/actions/certificate/deleteCertificate.ts
"use server";

import { BlobServiceClient } from "@azure/storage-blob";
import { getSession } from "@/lib/auth";
import db from "@/lib/db";
import { getAzureConfig } from "@/lib/azure";

type DeleteCertificateResponse = {
  message: string;
  success: boolean;
};

export async function deleteCertificate(
  id: string,
): Promise<DeleteCertificateResponse> {
  try {
    // Validate session
    const session = await getSession();

    if (!session?.user) {
      throw new Error("User is not authenticated");
    }

    // Get the certificate to delete
    const certificate = await db.certification.findUnique({
      where: { id },
    });

    if (!certificate) {
      throw new Error("Certificate not found");
    }

   // Delete the file from Azure Blob Storage if URL exists
    if (certificate.url) {
      const { containerName, connectionString } = getAzureConfig();
      const blobServiceClient =
        BlobServiceClient.fromConnectionString(connectionString);
      const containerClient =
        blobServiceClient.getContainerClient(containerName);

      // Extract filename from URL
      const filename = certificate.url.split("/").pop();
      if (filename) {
        const blockBlobClient = containerClient.getBlockBlobClient(filename);
        await blockBlobClient.delete();
      }
    }

    // Delete the certificate from the database
    await db.certification.update({
      where: { id },
      data: { status: "Inactive" },
    });

    return {
      message: "Certificate deleted successfully",
      success: true,
    };
  } catch (error) {
    console.error("Error deleting certificate:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to delete certificate",
    );
  }
}
