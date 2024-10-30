"use client";

import { useState, useEffect } from "react";
import ResumeCard from "@/components/views/account/ResumeCard";
import CertificateTable from "@/components/views/profile/CertificateTable";
import { useAppContext } from "@/app/context/AppContext";
import { uploadCertificate } from "@/app/utils/certificateUpload";

interface Certificate {
  id: number;
  name: string;
  obtainedDate: string;
  expiryDate: string;
}

const CertificatePage: React.FC = () => {
  const { profile } = useAppContext();
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    fetchCertificates(profile.id);
  }, []);

  const fetchCertificates = async (userId: string) => {
    try {
      const response = await fetch(`/api/certificates/list?userId=${userId}`);
      const data = await response.json();
      setCertificates(data);
    } catch (error) {
      console.error("Failed to fetch certificates:", error);
    }
  };

  const handleCertificateUpload = async (newCertificate: {
    name: string;
    obtainedDate: string;
    expiryDate: string;
    certificateFile: File;
    description: string;
  }) => {
    const { name, obtainedDate, expiryDate, certificateFile, description } =
      newCertificate;
    if (!certificateFile) {
      alert("No file selected!");
      return;
    }

    try {
      const uploadedCertificate = await uploadCertificate(
        certificateFile,
        profile.id,
        name,
        obtainedDate,
        expiryDate,
        description,
      );
      console.log("Uploaded Certificate:", uploadedCertificate);
    } catch (uploadError: unknown) {
      if (uploadError instanceof Error) {
        console.error("Error uploading certificate:", uploadError);
        alert("Error uploading certificate: " + uploadError.message);
      } else {
        console.error("Unknown error uploading certificate:", uploadError);
        alert("Error uploading certificate: Unknown error");
      }
    } finally {
      // Reset uploading state once upload is complete or fails
      // setUploading(false);
    }
  };

  const handleEdit = async (
    id: number,
    updatedData: Omit<Certificate, "id">,
  ) => {
    try {
      const response = await fetch(`/api/certificates/upload-certificate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          certificateId: id,
          ...updatedData,
          createdBy: profile.id,
        }),
      });
      const updatedCertificate = await response.json();
      setCertificates((prev) =>
        prev.map((cert) => (cert.id === id ? updatedCertificate : cert)),
      );
    } catch (error) {
      alert(error.message);
      console.error("Failed to update certificate:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/certificates/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setCertificates((prev) => prev.filter((cert) => cert.id !== id));
        console.log("Certificate status set to Inactive.");
      } else {
        console.error("Failed to update certificate status to Inactive.");
      }
    } catch (error) {
      console.error("Failed to update certificate status:", error);
    }
  };

  const handleDownload = async (url: string) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to download the certificate.");
      }

      // Convert the response to a blob
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      // Extract the filename from the URL
      const fileName = url.split("/").pop() || "certificate.pdf";

      // Create a link element to trigger the download
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileName; // Use the extracted filename
      link.click();

      // Clean up by revoking the object URL
      window.URL.revokeObjectURL(downloadUrl);
      console.log("Download initiated for:", fileName);
    } catch (error) {
      console.error("Error downloading certificate:", error);
    }
  };

  return (
    <div>
      <div className='container-fixed text-start'>
        <div className='grid grid-cols-1 justify-between gap-4 lg:grid-cols-2 lg:grid-cols-[60%_40%]'>
          <CertificateTable
            certificates={certificates}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onDownload={handleDownload}
            onAddCertificate={handleCertificateUpload}
          />
          <ResumeCard
            iconSrc='/assets/media/file-types/pdf.svg'
            iconAlt='PDF file icon'
            title='Resume'
            timestamp='3 days ago'
          />
        </div>
      </div>
    </div>
  );
};

export default CertificatePage;
