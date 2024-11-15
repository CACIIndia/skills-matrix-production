"use server";

import { BlobServiceClient } from "@azure/storage-blob";
import { getSession } from "@/lib/auth";
import db from "@/lib/db";
import { Certification } from "@prisma/client";
import { getAzureConfig, uploadCertificateToBlob } from "@/lib/azure";

type CertificateUpdateData = {
  base64Certificate?: string;
  name: string;
  obtainedDate: string;
  expiryDate: string;
  description: string;
  createdBy: string;
  categoryId:string;
  categoryName:string
};

type UpdateCertificateResponse = {
  message: string;
  certificate: Certification;
};

export async function updateCertificate(
  certificateId: string,
  data: CertificateUpdateData,
): Promise<UpdateCertificateResponse> {
  try {
    // Validate session
    const session = await getSession();
   
    if (!session?.user) {
      throw new Error("User is not authenticated");
    }

    // Get existing certificate
    const existingCertificate = await db.certification.findUnique({
      where: { id: certificateId },
    });

   

    if (!existingCertificate) {
      throw new Error("Certificate not found");
    }

    // Handle certificate file upload if provided
    let certificateUrl = existingCertificate.url;
   

    if (data.base64Certificate) {
      const { containerName, connectionString } = getAzureConfig();
      const blobServiceClient =
        BlobServiceClient.fromConnectionString(connectionString);
      const containerClient =
        blobServiceClient.getContainerClient(containerName);

       // Convert the name to lowercase and replace spaces with hyphens
      const formattedName = data.name.toLowerCase().replace(/\s+/g, "-");
      // Generate unique filename
      const filename = `${formattedName}-${data.createdBy}-certificate.pdf`;

      await uploadCertificateToBlob(
        containerClient,
        filename,
        data.base64Certificate,
      );
      certificateUrl = filename;
    } 

    // Update certificate in database
    const updated = await db.certification.update({
      where: { id: certificateId },
      data: {
        name: data.name,
        url: certificateUrl,
        obtainedDate: new Date(data.obtainedDate),
        expiryDate: new Date(data.expiryDate),
        description: data.description,
        updatedAt: new Date(),
        categoryId:data.categoryId,
        categoryName:data.categoryName,
        status: "Active",
      },
    });

    return {
      message: "Certificate updated successfully",
      certificate: updated,
    };
  } catch (error) {
    console.error("Error updating certificate:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to update certificate",
    );
  }
}
