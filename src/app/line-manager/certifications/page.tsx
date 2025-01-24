"use client";
import { useAppContext } from "@/app/context/AppContext";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import CertificateTable from "@/components/views/profile/CertificateTable";
import useGetCertificatesByLineManager from "@/lib/hooks/common/useGetCertificationByLineManager";
import { useCertificateHandlers } from "@/lib/hooks/profile/useCertificateHandlers";
import { Certificate } from "@/lib/types/profile";
import { useEffect, useState } from "react";

export default function Certifications() {
  const { profile } = useAppContext();
  
  const {
    data: certificates = [],
    refetch,
    isLoading,
  } = useGetCertificatesByLineManager(profile?.id);

  const [certificatesData, setCertificatesData] = useState<Certificate[]>([]);
  const { handleDelete, handleEdit, handleUpload, handleDownload } =
    useCertificateHandlers(profile?.id);

  useEffect(() => {
    setCertificatesData(certificates || []);
  }, [certificates]);

  const headers = [
    {
      key: "employeeName",
      label: "Employee Name",
      sortable: true,
      className: "w-[150px] cursor-pointer",

    },
    {
      key: "categoryName",
      label: "Category",
      sortable: true,
      className: "w-[150px] cursor-pointer",
    },
    {
      key: "name",
      label: "Certification Name",
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
    },
  ];
  if (isLoading || !profile) {
    return (
      <div className='container-fixed'>
        <TableSkeleton
          cols={5}
          tableHeader={false}
          isSearchable={true}
          addNewData={false}
        />
      </div>
    );
  }

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
          noDataMessage="No certifications found"
        />
      </div>
    </>
  );
}
