"use client";

import FileItem from "@/components/views/account/FileItem";
import ResumeCard from "@/components/views/account/ResumeCard";

const CertificatePage = () => {
  return (
    <div className='grid grid-cols-1 justify-between gap-2 lg:grid-cols-2'>
      <ResumeCard
        iconSrc='/assets/media/file-types/pdf.svg'
        iconAlt='PDF file icon'
        title='Resume'
        timestamp='3 days ago'
      />
      <div className='card grow'>
        <div className='card-header'>
          <h3 className='card-title'>Certificates</h3>
          <div className='menu' data-menu='true'>
            {/* Menu code */}
          </div>
        </div>
        <div className='card-body'>
          <div className='grid gap-2.5 lg:gap-5'>
            <FileItem
              iconSrc='/assets/media/file-types/pdf.svg'
              iconAlt='Azure PDF file'
              fileName='Azure Certificate'
              fileDetails='4.7 MB 26 Sep 2024 3:20 PM'
            />
            <FileItem
              iconSrc='/assets/media/file-types/doc.svg'
              iconAlt='Report DOC file'
              fileName='Report-v1.docx'
              fileDetails='2.3 MB 1 Oct 2024 12:00 PM'
            />
            <FileItem
              iconSrc='/assets/media/file-types/ai.svg'
              iconAlt='Framework App JS file'
              fileName='Framework-App.js'
              fileDetails='0.8 MB 17 Oct 2024 6:46 PM'
            />
            <FileItem
              iconSrc='/assets/media/file-types/js.svg'
              iconAlt='Mobile Logo JS file'
              fileName='Mobile-logo.ai'
              fileDetails='0.2 MB 4 Nov 2024 11:30 AM'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificatePage;
