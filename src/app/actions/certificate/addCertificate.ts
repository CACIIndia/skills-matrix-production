"use server";

import { BlobServiceClient } from "@azure/storage-blob";
import { getSession } from "@/lib/auth";
import db from "@/lib/db";
import { Certification } from "@prisma/client";
import { getAzureConfig, uploadCertificateToBlob } from "@/lib/azure";

type CertificateAddData = {
  base64Certificate: string;
  name: string;
  obtainedDate: string;
  expiryDate: string;
  description: string;
  createdBy: string;
};

type AddCertificateResponse = {
  message: string;
  certificate: Certification;
};

export async function addCertificate(
  data: CertificateAddData,
): Promise<AddCertificateResponse> {
  try {
    // Validate session
    const session = await getSession();

    if (!session?.user) {
      throw new Error("User is not authenticated");
    }

    // Handle certificate file upload
    let certificateUrl = "";

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

      console.log(filename, "filename");

      // Upload to blob storage
      certificateUrl = await uploadCertificateToBlob(
        containerClient,
        filename,
        data.base64Certificate,
      );
      certificateUrl = filename;
    }
  

    console.log(certificateUrl, "certificateUrlcertificateUrlcertificateUrl");

    // Create certificate in database
    const newCertificate = await db.certification.create({
      data: {
        name: data.name,
        url: certificateUrl,
        obtainedDate: new Date(data.obtainedDate),
        expiryDate: new Date(data.expiryDate),
        description: data.description,
        createdById: data.createdBy,
        status: "Active",
      },
    });

    return {
      message: "Certificate added successfully",
      certificate: newCertificate,
    };
  } catch (error) {
    console.error("Error adding certificate:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to add certificate",
    );
  }
}
