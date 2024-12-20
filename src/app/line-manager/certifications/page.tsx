"use client";
import { useAppContext } from "@/app/context/AppContext";
import CertificateTable from "@/components/views/profile/CertificateTable";
import { useCertificateHandlers } from "@/lib/hooks/profile/useCertificateHandlers";
import useGetCertificates from "@/lib/hooks/profile/useGetCertificates";
import { Certificate } from "@/lib/types/profile";
import { useEffect, useState } from "react";

export default function Certifications() {
  const { profile } = useAppContext();
  const { data: certificates, refetch } = useGetCertificates(profile?.id);
  const [certificatesData, setCertificatesData] = useState<Certificate[]>([]);
  const { handleDelete, handleEdit, handleUpload, handleDownload } =
    useCertificateHandlers(profile?.id);

  const mockData = [
    {
      id: "2d698fc5-25bc-4e69-b15c-32db596eaf4c",
      name: "Typescript",
      url: "typescript-1ea25887-ac9f-492a-9868-380438febe80-certificate.pdf",
      obtainedDate: "2024-12-17T18:30:00.000Z",
      expiryDate: "2025-02-05T18:30:00.000Z",
      description: "",
      createdAt: "2024-12-19T06:40:30.257Z",
      updatedAt: "2024-12-19T06:40:30.257Z",
      status: 1,
      createdById: "1ea25887-ac9f-492a-9868-380438febe80",
      categoryId: "7a368270-aa59-4f39-a5a4-6d041b5677a9",
      categoryName: "Frontend",
    },
  ];

  useEffect(() => {
    setCertificatesData(certificates || []);
  }, [certificates]);

  const headers = [
    {
      key: "categoryName",
      label: "Category",
      sortable: true,
      className: "w-[150px] cursor-pointer",
    },
    {
      key: "name",
      label: "Name",
      sortable: true,
      className: "w-[280px] cursor-pointer",
    },
    {
      key: "obtainedDate",
      label: "Obtained Date",
      sortable: true,
      className: "min-w-[135px]",
    },
    {
      key: "expiryDate",
      label: "Valid Until",
      sortable: true,
      className: "min-w-[135px]",
    }
  ];

  return (
    <>
      <div className='container-fixed'>
        <CertificateTable
          headers={headers}
          certificates={certificatesData}
          categoryskills={[]}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDownload={handleDownload}
          onAddCertificate={handleUpload}
          refetch={() => {}}
          trainingData={[]}
          isSearchable={true}
          addNewData={false}
        />
      </div>
    </>
  );
}
