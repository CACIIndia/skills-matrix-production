import { useQueryClient } from "@tanstack/react-query";
import { fileToBase64 } from "@/lib/utils/fileToBase64";
import { addCertificate } from "@/app/actions/certificate/addCertificate";
import { updateCertificate } from "@/app/actions/certificate/updateCertificate";
import { deleteCertificate } from "@/app/actions/certificate/deleteCertificate";

export const useCertificateHandlers = (userId: string) => {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["certificates", userId] });
  };

  const handleUpload = async (certificate: any) => {
    const { certificateFile, ...rest } = certificate;

    try {
      const base64Certificate = await fileToBase64(certificate.certificateFile);
      await addCertificate({
        ...rest,
        base64Certificate,
        createdBy: userId,
      });
      invalidate();
    } catch (error) {
      console.error("Error uploading certificate:", error);
    }
  };

  const handleEdit = async (id: number, updatedData: any) => {
    try {
      await updateCertificate(String(id), {
        ...updatedData,
        createdBy: userId,
      });
      invalidate();
    } catch (error) {
      console.error("Error updating certificate:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCertificate(String(id));
      invalidate();
    } catch (error) {
      console.error("Error deleting certificate:", error);
    }
  };

  // const handleDownload = async (url: string) => {
  //   try {
  //     const response = await fetch(url, {
  //       method: "GET",
  //       headers: { "Content-Type": "application/pdf" },
  //     });
  //
  //     if (!response.ok) throw new Error("Failed to download the certificate.");
  //
  //     const blob = await response.blob();
  //     const downloadUrl = window.URL.createObjectURL(blob);
  //     const fileName = url.split("/").pop() || "certificate.pdf";
  //
  //     const link = document.createElement("a");
  //     link.href = downloadUrl;
  //     link.download = fileName;
  //     link.click();
  //
  //     window.URL.revokeObjectURL(downloadUrl);
  //   } catch (error) {
  //     console.error("Error downloading certificate:", error);
  //   }
  // };

  return {
    handleUpload,
    handleEdit,
    handleDelete,
    // handleDownload, // Uncomment when implemented
  };
};
