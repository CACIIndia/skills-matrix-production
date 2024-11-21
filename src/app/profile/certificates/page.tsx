"use client";

import { useAppContext } from "@/app/context/AppContext";
import { useCertificateHandlers } from "@/lib/hooks/profile/useCertificateHandlers";
import useGetCertificates from "@/lib/hooks/profile/useGetCertificates";
import ResumeCard from "@/components/views/account/ResumeCard";
import CertificateTable from "@/components/views/profile/CertificateTable";
import useGetSkillCategory from "@/lib/hooks/profile/useGetSkillCategory";

const CertificatePage = () => {
  const { profile } = useAppContext();

  const { data: certificates } = useGetCertificates(profile.id);
  const {data: categoryskills} = useGetSkillCategory();
 
  const { handleDelete, handleEdit, handleUpload,handleDownload } = useCertificateHandlers(
    profile.id,
  );

  return (
    <div>
      <div className=' text-start'>
        <div className='grid grid-cols-1 justify-between gap-4 lg:grid-cols-1'>
          <CertificateTable
            certificates={certificates}
            categoryskills={categoryskills || []}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onDownload={handleDownload}
            onAddCertificate={handleUpload}
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
