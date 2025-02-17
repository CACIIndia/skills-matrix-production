import Image from "next/image";
import { Project } from "@/lib/types/profile";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import defaultImage from "../../../../public/assets/media/avatars/default-image.png";
import { CiSquarePlus } from "react-icons/ci";
import EditIcon from "@/components/custom-icons/EditIcon";
import DeleteIcon from "@/components/custom-icons/DeleteIcon";
import useDeleteProject from "@/lib/hooks/profile/projects/useDeleteProjects";
import toast from "react-hot-toast";
import { useAppContext } from "@/app/context/AppContext";
import { getFormattedDate } from "@/components/common/Date-Handling/DateFormat";
import {
  isProjectDeletable,
  isProjectEditable,
} from "@/lib/constants/GlobalVariables";

type ProjectHistoryCardProps = {
  projects: Project[];
  setIsOpen: (isOpen: boolean) => void;
  setIsEdit: (isOpen: boolean) => void;
  setEditData: (data: any) => void;
  isOpen: boolean;
  joiningDate: string | null;
};

const ProjectHistoryCard = ({
  projects,
  setIsOpen,
  setIsEdit,
  setEditData,
  isOpen,
  joiningDate,
}: ProjectHistoryCardProps) => {
  const mutationDelete = useDeleteProject();
  const { removeDeletedProject } = useAppContext();
  const currentProject =
    projects?.filter((project) => project.isCurrentProject) || [];
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const previousProjects =
    projects?.filter((project) => !project.isCurrentProject) || [];
  const memberListRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isScrolled && selectedProject && memberListRef.current) {
      setIsScrolled(false);
      memberListRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [isScrolled, selectedProject]);

  const deleteProject = async (profileId: string) => {
    setSelectedProject(null);
    try {
      let result = await mutationDelete?.mutateAsync({ profileId });
      removeDeletedProject(profileId);
      toast.success(`Project Deleted Successfully`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div
      className='relative flex max-h-screen flex-col md:flex-row'
    >
      <div
        className={`transition-all duration-300 ${selectedProject ? "md:w-2/3" : "w-full"}`}
      >
        <div className='card' style={{ zIndex: -1 }}>
          <div className='card-header flex justify-between'>
            <h3 className='card-title'>Projects History</h3>
            <h3 className='card-title'>
              <button
                onClick={() => {
                  setIsOpen(!isOpen);
                  setIsEdit(false);
                  setEditData({});
                }}
                className='btn btn-sm btn-icon btn-clear btn-primary'
              >
                <CiSquarePlus size={32} />
              </button>
            </h3>
          </div>
          <div className='card-body text-start'>
            <div className='flex flex-col'>
              {currentProject?.map((item, index) => {
                const members = item.project?.profiles || [];
                const projectCode = item.project?.code || "";
                const displayedMembers = members.slice(0, 3);
                const remainingMembersCount =
                  members.length - displayedMembers.length;

                return (
                  <Fragment key={index}>
                    <div key={index} className='relative flex items-start'>
                      <div className='absolute bottom-0 left-0 top-9 w-9 translate-x-1/2 border-l border-l-gray-300'></div>
                      <div className='flex size-9 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-gray-100 text-gray-600'>
                        <i className='ki-filled ki-calendar text-base'></i>
                      </div>
                      <div className='text-md mb-7 grow pl-2.5'>
                        <div className='flex flex-col pb-2.5'>
                          <span className='text-sm font-medium text-gray-700'>
                            Working in {item.projectName}
                          </span>
                          <span className='text-xs font-medium text-gray-500'>
                            {getFormattedDate(item.startDate)} -{" "}
                            {item.endDate
                              ? getFormattedDate(item.endDate)
                              : "Ongoing"}
                          </span>
                        </div>
                        <div className='card p-4 shadow-none'>
                          <div className='flex gap-2.5'>
                            <i className='ki-filled ki-code text-info mt-[3px] text-lg'></i>
                            <div className='flex grow flex-col gap-5'>
                              <div className='flex flex-wrap items-center justify-between'>
                                <div className='flex flex-col gap-0.5'>
                                  <span className='text-md mb-px cursor-pointer font-semibold text-gray-900 hover:text-primary'>
                                    {item.roleInProject}
                                  </span>
                                  <span className='text-xs font-medium text-gray-500'>
                                    {item.description}
                                  </span>
                                </div>
                                <div className='flex gap-2.5'>
                                  {isProjectEditable && (
                                    <div
                                      className='cursor-pointer'
                                      onClick={() => {
                                        setIsOpen(true);
                                        setIsEdit(true);
                                        setEditData(item);
                                      }}
                                    >
                                      <EditIcon />
                                    </div>
                                  )}
                                  {isProjectDeletable && (
                                    <div
                                      className='cursor-pointer'
                                      onClick={() => deleteProject(item.id)}
                                    >
                                      <DeleteIcon />
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Members Section */}
                              <div className='gap-7.5 flex flex-wrap'>
                                <div className='flex items-center gap-1.5'>
                                  <span className='text-2sm font-medium text-gray-500'>
                                    Code:
                                  </span>
                                  <Link
                                    className='text-2sm font-semibold text-primary'
                                    href='#'
                                  >
                                    {projectCode}
                                  </Link>
                                </div>
                                {members.length > 0 && (
                                  <div className='flex items-center gap-1.5'>
                                    <span className='text-2sm font-medium text-gray-500'>
                                      Members:
                                    </span>

                                    <div className='flex -space-x-2'>
                                      {displayedMembers?.map((member: any) => (
                                        <div
                                          key={member.id}
                                          className='flex cursor-pointer'
                                          onClick={() => {
                                            setSelectedProject(item);
                                          }}
                                        >
                                          <Image
                                            className='hover:z-5 ring-light-light relative size-7 shrink-0 rounded-full ring-1'
                                            src={
                                              member?.employeeImage ||
                                              defaultImage
                                            }
                                            alt={member.employeeName}
                                            width={28}
                                            height={28}
                                          />
                                        </div>
                                      ))}
                                      {remainingMembersCount > 0 && (
                                        <div
                                          onClick={() =>
                                            setSelectedProject(item)
                                          }
                                          className='flex cursor-pointer'
                                        >
                                          <span className='hover:z-5 text-3xs text-primary-inverse relative inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-primary font-semibold leading-none ring-1 ring-primary-light'>
                                            +{remainingMembersCount}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                              {/* End of Members Section */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Fragment>
                );
              })}

              {/* Previous Projects */}
              {previousProjects?.map((item, index) => {
                const members = item.project?.profiles || [];
                const projectCode = item.project?.code || "";
                const displayedMembers = members?.slice(0, 3);
                const remainingMembersCount =
                  members.length - displayedMembers?.length;
                return (
                  <Fragment key={index}>
                    <div key={index} className='relative flex items-start'>
                      <div className='absolute bottom-0 left-0 top-9 w-9 translate-x-1/2 border-l border-l-gray-300'></div>
                      <div className='flex size-9 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-gray-100 text-gray-600'>
                        <i className='ki-filled ki-calendar text-base'></i>
                      </div>
                      <div className='text-md mb-7 grow pl-2.5'>
                        <div className='flex flex-col pb-2.5'>
                          <span className='text-sm font-medium text-gray-700'>
                            Worked in {item.projectName}
                          </span>
                          <span className='text-xs font-medium text-gray-500'>
                            {getFormattedDate(item.startDate)} -{" "}
                            {item.endDate
                              ? getFormattedDate(item.endDate)
                              : "Ongoing"}
                          </span>
                        </div>
                        <div className='card p-4 shadow-none'>
                          <div className='flex gap-2.5'>
                            <i className='ki-filled ki-code text-info mt-[3px] text-lg'></i>
                            <div className='flex grow flex-col gap-5'>
                              <div className='flex flex-wrap items-center justify-between'>
                                <div className='flex flex-col gap-0.5'>
                                  <span className='text-md mb-px cursor-pointer font-semibold capitalize text-gray-900 hover:text-primary'>
                                    {item.roleInProject}
                                  </span>
                                  <span className='text-xs font-medium text-gray-500'>
                                    {item.description}
                                  </span>
                                </div>
                                <div className='flex gap-2.5'>
                                  {isProjectEditable && (
                                    <div
                                      className='cursor-pointer'
                                      onClick={() => {
                                        setIsOpen(true);
                                        setIsEdit(true);
                                        setEditData(item);
                                      }}
                                    >
                                      <EditIcon />
                                    </div>
                                  )}
                                  {isProjectDeletable && (
                                    <div
                                      className='cursor-pointer'
                                      onClick={() => deleteProject(item.id)}
                                    >
                                      <DeleteIcon />
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className='gap-7.5 flex flex-wrap'>
                                <div className='flex items-center gap-1.5'>
                                  <span className='text-2sm font-medium text-gray-500'>
                                    Code:
                                  </span>
                                  <Link
                                    className='text-2sm font-semibold text-primary'
                                    href='#'
                                  >
                                    {projectCode}
                                  </Link>
                                </div>

                                {members?.length > 0 && (
                                  <div className='flex items-center gap-1.5'>
                                    <span className='text-2sm font-medium text-gray-500'>
                                      Members:
                                    </span>

                                    <div className='flex -space-x-2'>
                                      {displayedMembers?.map((member: any) => (
                                        <div
                                          onClick={() => {
                                            setSelectedProject(item);
                                            setIsScrolled(true);
                                          }}
                                          key={member.id}
                                          className='flex cursor-pointer'
                                        >
                                          <Image
                                            className='hover:z-5 ring-light-light relative size-7 shrink-0 rounded-full ring-1'
                                            src={
                                              member?.employeeImage ||
                                              defaultImage
                                            }
                                            alt={member?.employeeName}
                                            width={28}
                                            height={28}
                                          />
                                        </div>
                                      ))}
                                      {remainingMembersCount > 0 && (
                                        <div
                                          onClick={() =>
                                            setSelectedProject(item)
                                          }
                                          className='flex cursor-pointer'
                                        >
                                          <span className='hover:z-5 text-3xs text-primary-inverse relative inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-primary font-semibold leading-none ring-1 ring-primary-light'>
                                            +{remainingMembersCount}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                              {/* Members section can be added here if needed */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Fragment>
                );
              })}

              {joiningDate && (
                  <div className='relative flex items-start'>
                    <div className='absolute bottom-0 left-0 top-9 w-9 translate-x-1/2 border-l border-l-gray-300'></div>
                    <div className='flex size-9 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-gray-100 text-gray-600'>
                      <i className='ki-filled ki-entrance-left text-base'></i>
                    </div>
                    <div className='text-md mb-7 grow pl-2.5'>
                      <div className='flex flex-col'>
                        <div className='text-sm font-medium text-gray-800'>
                          Joined in CACI
                        </div>
                        <span className='text-xs font-medium text-gray-500'>
                          {getFormattedDate(joiningDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </div>
          {/* <div className='card-footer justify-center'>
            <span className='btn btn-link'>All-time Activities</span>
          </div> */}
        </div>
      </div>
      {selectedProject && (
        <div
          className={`card 300 mt-4 w-full border bg-white md:relative md:ml-4 md:mt-0 md:w-1/3`}
          style={{ maxHeight: "79vh", minHeight: "200px", overflowY: "auto" }} // Ensure visibility
        >
          {" "}
          <div className='card-header flex justify-between'>
            <h3 className='card-title'>
              Members of {selectedProject.projectName}
            </h3>
            <button
              className='text-gray-600 hover:text-gray-900'
              onClick={() => setSelectedProject(null)}
            >
              ✕
            </button>
          </div>
          {selectedProject.project?.profiles?.map(
            (member: any, index: number) => (
              <div
                ref={memberListRef}
                key={member?.id}
                className={`border-b-1 flex items-center gap-2 border-b p-2 ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
              >
                <div
                  className='cursor-pointer'
                  onClick={() =>
                    window.open(
                      `/profile/overview/${member.employeeId}`,
                      "_blank",
                    )
                  }
                >
                  <Image
                    className='hover:z-5 ring-light-light relative size-7 shrink-0 rounded-full ring-1'
                    src={member?.employeeImage || defaultImage}
                    alt={member?.employeeName}
                    width={36}
                    height={36}
                  />
                </div>
                <div>
                  <div
                    className='cursor-pointer text-sm font-medium text-gray-700'
                    onClick={() =>
                      window.open(
                        `/profile/overview/${member.employeeId}`,
                        "_blank",
                      )
                    }
                  >
                    {member.employeeName}
                  </div>
                  <div className='text-xs font-medium text-gray-500'>
                    {member.employee.email}
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectHistoryCard;
