"use client";
import { useAppContext } from "@/app/context/AppContext";
import React, { useEffect, useState, Suspense } from "react";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import useGetCertificatesByLineManager from "@/lib/hooks/common/useGetCertificationByLineManager";
import { useCertificateHandlers } from "@/lib/hooks/profile/useCertificateHandlers";
import { Certificate } from "@/lib/types/profile";

// Lazy load CertificateTable
const CertificateTable = React.lazy(
  () => import("@/components/views/profile/CertificateTable"),
);

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
    {
      key: "actions",
      label: "Actions",
      sortable: false,
      className: "min-w-[135px]",
    },
  ];

  if (isLoading || !profile) {
    return (
      <div>
        <div className='container-fixed'>
          <TableSkeleton
            cols={5}
            tableHeader={false}
            isSearchable={true}
            addNewData={false}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='container-fixed'>
        <div className='pb-7.5 flex flex-wrap items-center justify-between gap-5 lg:items-end'>
          <div className='flex flex-col justify-center gap-2'>
            <h3 className='text-lg text-[#6D6E82]'>
              Showing {certificatesData.length} team certifications
            </h3>
          </div>
        </div>
      </div>
      <div className='container-fixed'>
        <Suspense
          fallback={
            <TableSkeleton
              cols={5}
              tableHeader={true}
              isSearchable={false}
              addNewData={false}
            />
          }
        >
          <CertificateTable
            headers={headers}
            certificates={certificatesData}
            categorySkills={[]}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onDownload={handleDownload}
            onAddCertificate={handleUpload}
            refetch={() => {}}
            trainingData={[]}
            isSearchable={true}
            addNewData={false}
            noDataMessage='No certifications found'
            showActions={{edit:false, delete:false,download:true}}
          />
        </Suspense>
      </div>
    </>
  );
}
