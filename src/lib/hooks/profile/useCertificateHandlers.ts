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
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      console.error("Error uploading certificate:", errorMessage);
      alert(errorMessage);
    }
    
  };

  const handleEdit = async (id: number, updatedData: any) => {
    try {
      await updateCertificate(String(id), {
        ...updatedData,
        createdBy: userId,
      });
      invalidate();
      alert("Edited Successfully");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      console.error("Error updating certificate:", errorMessage);
      alert(errorMessage);
    }    
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCertificate(String(id));
      invalidate();
    }catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      console.error("Error deleting certificate:", errorMessage);
      alert(errorMessage);
    }
  };

  const handleDownload = async (fileUrl: string, createdById: string, fileName: string) => {
    try {
      const response = await fetch(`https://smempprofile.blob.core.windows.net/certificatestorage/${fileUrl}`, {
        method: "GET",
        headers: { "Content-Type": "application/pdf" },
      });
     
  
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
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
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
