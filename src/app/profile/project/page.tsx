"use client";
import Modal from "@/components/common/Modal";
import { useState } from "react";
import AddProject from "./AddProject";
import useGetProjects from "@/lib/hooks/profile/projects/useGetProjects";
import { useAppContext } from "@/app/context/AppContext";
import ProjectHistoryCard from "@/components/views/profile/ProjectHistory";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { FaRegEdit } from "react-icons/fa";
import useGetProjectRoles from "@/lib/hooks/profile/projects/useGetProjectRoles";
import { getFormattedDate } from "@/components/common/Date-Handling/DateFormat";
import { useParams } from "next/navigation";

export default function ProjectPage() {
  const params = useParams();
  const { data: projects } = useGetProjects(params?.id ? false : true);
  const { data: projectRoles } = useGetProjectRoles(params?.id ? false : true);
  const { profile, viewedProfile } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState<any>({});
  const joiningDate = profile?.joiningDate;

  return (
    <>
      {((!params.id && profile?.projects?.length === 0 )|| viewedProfile?.projects?.length === 0) && (
        <div className='card'>
          <div className='card-header flex justify-between'>
            <h3 className='card-title'>Projects History</h3>
          </div>
          <div className='flex h-[40vh] flex-col flex-wrap items-center justify-center space-y-4'>
            <div>No projects found, still some work to do...😄</div>
            {joiningDate && (
              <div>
                <h1>
                  Joined in CACI:{" "}
                  <span className='font-semibold'>
                    {getFormattedDate(joiningDate)}
                  </span>
                </h1>
              </div>
            )}

            {

                     !params.id && (
                      <button
                      onClick={() => {
                        setEditData({});
                        setIsEdit(false);
                        setIsOpen(true);
                      }}
                      className='btn-primary relative mb-[4px] mr-[10px] rounded-[4px] bg-[#0d6efd] p-[6px] text-white transition duration-300 hover:bg-blue-700'
                    >
                      
                      <div className='flex items-center justify-center space-x-1'>
                        <HiOutlineDocumentAdd className='h-6 w-6' />
                        <div>Add Project</div>
                      </div>
                    </button>)
            }

          
          </div>
        </div>
      )}

      {profile?.projects?.length !== 0 && !params.id && (
        <ProjectHistoryCard
          projects={profile?.projects || []}
          setIsOpen={setIsOpen}
          setIsEdit={setIsEdit}
          setEditData={setEditData}
          isOpen={isOpen}
          joiningDate={joiningDate}
          viewedProfile={false}
        />
      )}

      {viewedProfile?.projects?.length !== 0 && params.id && (
        <ProjectHistoryCard
          projects={viewedProfile?.projects || []}
          setIsOpen={setIsOpen}
          setIsEdit={setIsEdit}
          setEditData={setEditData}
          isOpen={isOpen}
          joiningDate={joiningDate}
          viewedProfile={true}
        />
      )}

      {!params.id && (
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={`${isEdit ? "Edit" : "Add"} Project`}
          buttonText='Update'
          // handler={handleEdit}
          customWidth='w-[100%] lg:w-[40%] h-auto lg:h-auto'
          isFromAddProject={true}
          icon={
            isEdit ? (
              <FaRegEdit className='h-5 w-5 text-blue-500' />
            ) : (
              <HiOutlineDocumentAdd className='h-6 w-6 text-blue-500' />
            )
          }
        >
          <AddProject
            handleClose={() => setIsOpen(false)}
            projects={(projects || []).map((project) => ({
              ...project,
              code: project.code || "",
            }))}
            isEdit={isEdit}
            editData={editData}
            projectRoles={projectRoles || []}
            joiningDate={joiningDate}
          />
        </Modal>
      )}
    </>
  );
}
