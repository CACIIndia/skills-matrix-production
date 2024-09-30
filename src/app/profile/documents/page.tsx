"use client";
import Menu from "@/app/components/Menu";
import ProfileActions from "@/components/views/profile/Actions";
import ProfileHeader from "@/app/components/ProfileHeader";
import FileItem from "@/components/views/account/FileItem";
import ResumeCard from "@/components/views/account/ResumeCard";
import { PROFILE_HEADER_ITEMS } from "@/lib/constants/header";
import { useProfile } from "@/context/profileContext";

const DocumentPage = () => {
  const { data, loading, error } = useProfile();
  if (loading) {
    return "...loading";
  }
  return (
    <div>
      <ProfileHeader />
      {/* Profile Actions and Menu */}
      <div className='container-fixed'>
        <div className='dark:border-b-coal-100 mb-5 flex flex-nowrap items-center justify-between gap-6 border-b border-b-gray-200 lg:mb-10 lg:items-end'>
          <Menu items={PROFILE_HEADER_ITEMS} />
          <ProfileActions />
        </div>
      </div>
      <div className='container-fixed text-start'>
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
      </div>
    </div>
  );
};

export default DocumentPage;
