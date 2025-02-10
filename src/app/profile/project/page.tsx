"use client";
import Modal from "@/components/common/Modal";
import { useState } from "react";
import AddProject from "./AddProject";
import useGetProjects from "@/lib/hooks/profile/projects/useGetProjects";
import { useAppContext } from "@/app/context/AppContext";
import ProjectHistoryCard from "@/components/views/profile/ProjectHistory";

export default function ProjectPage() {
  const { data: projects } = useGetProjects();
  const { profile } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {profile?.projects?.length === 0 && (
        <div className='flex h-[40vh] items-center justify-center'>
          <button
            onClick={() => setIsOpen(true)}
            className='relative mb-[4px] mr-[10px] rounded-[4px] bg-[#0d6efd] p-[6px] text-white transition duration-300 hover:bg-blue-700'
          >
            <div className='flex items-center justify-center space-x-1'>
              <div>Add Project</div>
            </div>
          </button>
        </div>
      )}

     

      {
        profile?.projects?.length!==0&&<ProjectHistoryCard projects={profile?.projects || []} setIsOpen={setIsOpen} isOpen={isOpen} />
      }

    
      
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title='Add New Project'
        buttonText='Update'
        // handler={handleEdit}
        customWidth='w-[100%] lg:w-[40%] h-auto lg:h-auto'
        isFromAddProject={true}
      >
        <AddProject handleClose={() => setIsOpen(false)} projects={projects} />
      </Modal>
    </>
  );
}
