import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

import { addCertificate } from "@/app/actions/certificate/addCertificate";
import { deleteCertificate } from "@/app/actions/certificate/deleteCertificate";
import { updateCertificate } from "@/app/actions/certificate/updateCertificate";
import { fileToBase64 } from "@/lib/utils/fileToBase64";

export const useCertificateHandlers = (userId: string) => {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["certificates", userId] });
  };

  const handleUpload = async (certificate: any) => {
    const { certificateFile, ...rest } = certificate;

    const toastId = toast.loading("Uploading certificate...");

    try {
      const base64Certificate = await fileToBase64(certificate.certificateFile);

      const result = await addCertificate({
        ...rest,
        base64Certificate,
        createdBy: userId,
      });

      invalidate();
      toast.success(result.message, { id: toastId });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";
      console.error("Error uploading certificate:", errorMessage);
      toast.error(errorMessage, { id: toastId });
    }
  };

  const handleEdit = async (id: number, updatedData: any) => {
    const toastId = toast.loading("Updating certificate...");

    try {
      const result = await updateCertificate(String(id), {
        ...updatedData,
        createdBy: userId,
      });

      invalidate();
      toast.success(result.message, { id: toastId });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";
      console.error("Error updating certificate:", errorMessage);
      toast.error(errorMessage, { id: toastId });
    }
  };

  const handleDelete = async (id: number) => {
    const toastId = toast.loading("Deleting certificate...");

    try {
      const result = await deleteCertificate(String(id));

      invalidate();
      toast.success(result.message, { id: toastId });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";
      console.error("Error deleting certificate:", errorMessage);
      toast.error(errorMessage, { id: toastId });
    }
  };

  const handleDownload = async (
    fileUrl: string,
    createdById: string,
    fileName: string,
  ) => {
    try {
      const response = await fetch(
        `https://smempprofile.blob.core.windows.net/certificatestorage/${fileUrl}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/pdf" },
        },
      );

      if (!response.ok) throw new Error("Failed to download the certificate.");

      const fileBlob = await response.blob();
      const downloadLink = window.URL.createObjectURL(fileBlob);
      const formattedFileName = `${fileName.toLowerCase().replace(/\s+/g, "-")}-${createdById}-certificate.pdf`;

      const link = document.createElement("a");
      link.href = downloadLink;
      link.download = formattedFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(downloadLink);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";
      console.error("Error downloading certificate:", errorMessage);
      alert(errorMessage);
    }
  };

  return {
    handleUpload,
    handleEdit,
    handleDelete,
    handleDownload,
  };
};
