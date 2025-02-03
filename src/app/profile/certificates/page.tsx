"use client";

import { useAppContext } from "@/app/context/AppContext";
import { useCertificateHandlers } from "@/lib/hooks/profile/useCertificateHandlers";
import useGetCertificates from "@/lib/hooks/profile/useGetCertificates";
import ResumeCard from "@/components/views/account/ResumeCard";
import CertificateTable from "@/components/views/profile/CertificateTable";
import useGetSkillCategory from "@/lib/hooks/profile/useGetSkillCategory";
import { useEffect, useState } from "react";
import { Certificate } from "@/lib/types/profile";
import useGetTrainingDataByUserId from "@/lib/hooks/Training/useGetTraining";
import TableSkeleton from "@/components/skeletons/TableSkeleton";

const CertificatePage = () => {
  const { profile, categorySkills } = useAppContext();
  const { data: certificates, refetch, isLoading } = useGetCertificates(profile.id);
 // const { data: categoryskills } = useGetSkillCategory();
  const [certificatesData, setCertificatesData] = useState<Certificate[]>([]);
  const { data: training_data } = useGetTrainingDataByUserId(
    profile?.id,
    "employeeId",
    "Completed",
  );

  useEffect(() => {
    setCertificatesData(certificates || []);
  }, [certificates]);

  const { handleDelete, handleEdit, handleUpload, handleDownload } =
    useCertificateHandlers(profile.id);

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
      <TableSkeleton
        cols={5}
        tableHeader={false}
        isSearchable={true}
        addNewData={true}
      />
    );
  }

  return (
    <div>
      <div className=''>
        <div className=''>
          <CertificateTable
            headers={headers}
            certificates={certificatesData}
            categorySkills={categorySkills || []}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onDownload={handleDownload}
            onAddCertificate={handleUpload}
            refetch={refetch}
            trainingData={training_data || []}
            isSearchable={true}
            addNewData={true}
            noDataMessage="No certifications found"
          />

          {/* <ResumeCard
            iconSrc='/assets/media/file-types/pdf.svg'
            iconAlt='PDF file icon'
            title='Resume'
            timestamp='3 days ago'
          /> */}
        </div>
      </div>
    </div>
  );
};

export default CertificatePage;
