"use client";
import { useAppContext } from "@/app/context/AppContext";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import CertificateTable from "@/components/views/profile/CertificateTable";
import { useCertificateHandlers } from "@/lib/hooks/profile/useCertificateHandlers";
import useGetCertificates from "@/lib/hooks/profile/useGetCertificates";
import { Certificate } from "@/lib/types/profile";
import { useEffect, useState } from "react";

export default function Certifications() {
  const { profile } = useAppContext();
  const { data: certificates =[], refetch ,isLoading} = useGetCertificates(profile?.id);
 
  const [certificatesData, setCertificatesData] = useState<Certificate[]>([]);
  const { handleDelete, handleEdit, handleUpload, handleDownload } =
    useCertificateHandlers(profile?.id);

  
  

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
  if(isLoading || !certificates || certificates.length === 0){ 

    return (
      <TableSkeleton />
    ) 

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
        />
      </div>
    </>
  );
}
