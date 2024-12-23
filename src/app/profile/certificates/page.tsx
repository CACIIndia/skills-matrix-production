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

const CertificatePage = () => {
  const { profile } = useAppContext();
  const { data: certificates, refetch } = useGetCertificates(profile.id);
  const { data: categoryskills } = useGetSkillCategory();
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

  return (
    <div>
      <div className='text-start'>
        <div className='grid grid-cols-1 justify-between gap-4 lg:grid-cols-1'>
          <CertificateTable
            headers={headers}
            certificates={certificatesData}
            categoryskills={categoryskills || []}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onDownload={handleDownload}
            onAddCertificate={handleUpload}
            refetch={refetch}
            trainingData={training_data || []}
            isSearchable={true}
            addNewData={true}
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
