import Image from "next/image";
import { Project } from "@/lib/types/profile";
import Link from "next/link";
import defaultImage from "../../../../public/assets/media/avatars/default-image.png";

type ProjectHistoryCardProps = {
  projects: Project[];
};

const ProjectHistoryCard = ({ projects }: ProjectHistoryCardProps) => {
  const currentProject =
    projects?.filter((project) => project.isCurrentProject) || [];

  const previousProjects =
    projects?.filter((project) => !project.isCurrentProject) || [];

  console.log(previousProjects);

  return (
    <div className='card' style={{ zIndex: -1 }}>
      <div className='card-header'>
        <h3 className='card-title'>Projects History</h3>
      </div>
      <div className='card-body text-start'>
        <div className='flex flex-col'>
          {currentProject?.map((item, index) => {
            const members = item.project?.profiles || [];
            const projectCode = item.project?.code || "";
            const displayedMembers = members?.slice(0, 3);
            const remainingMembersCount =
              members.length - displayedMembers?.length;

            return (
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
                      {new Date(item.startDate).toLocaleDateString()} -{" "}
                      {item.endDate
                        ? new Date(item.endDate).toLocaleDateString()
                        : "Ongoing"}
                    </span>
                  </div>
                  <div className='card p-4 shadow-none'>
                    <div className='flex flex-wrap gap-2.5'>
                      <i className='ki-filled ki-code text-info text-lg'></i>
                      <div className='flex grow flex-col gap-5'>
                        <div className='flex flex-wrap items-center justify-between'>
                          <div className='flex flex-col gap-0.5'>
                            <span className='capitalize text-md mb-px cursor-pointer font-semibold text-gray-900 hover:text-primary'>
                              {item.roleInProject}
                            </span>
                            <span className='text-xs font-medium text-gray-500'>
                              {item.description}
                            </span>
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
                                {displayedMembers?.map((member) => (
                                  <div key={member.id} className='flex'>
                                    <Image
                                      className='hover:z-5 ring-light-light relative size-7 shrink-0 rounded-full ring-1'
                                      src={member?.employeeImage || defaultImage}
                                      alt={member.employeeName}
                                      width={28}
                                      height={28}
                                    />
                                  </div>
                                ))}
                                {remainingMembersCount > 0 && (
                                  <div className='flex'>
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
                      {new Date(item.startDate).toLocaleDateString()} -{" "}
                      {item.endDate
                        ? new Date(item.endDate).toLocaleDateString()
                        : "Ongoing"}
                    </span>
                  </div>
                  <div className='card p-4 shadow-none'>
                    <div className='flex flex-wrap gap-2.5'>
                      <i className='ki-filled ki-code text-info text-lg'></i>
                      <div className='flex grow flex-col gap-5'>
                        <div className='flex flex-wrap items-center justify-between'>
                          <div className='flex flex-col gap-0.5'>
                            <span className='capitalize text-md mb-px cursor-pointer font-semibold text-gray-900 hover:text-primary'>
                              {item.roleInProject}
                            </span>
                            <span className='text-xs font-medium text-gray-500'>
                              {item.description}
                            </span>
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
                                {displayedMembers?.map((member) => (
                                  <div key={member.id} className='flex'>
                                    <Image
                                      className='hover:z-5 ring-light-light relative size-7 shrink-0 rounded-full ring-1'
                                      src={
                                        member?.employeeImage || defaultImage
                                      }
                                      alt={member?.employeeName}
                                      width={28}
                                      height={28}
                                    />
                                  </div>
                                ))}
                                {remainingMembersCount > 0 && (
                                  <div className='flex'>
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
            );
          })}
        </div>
      </div>
      <div className='card-footer justify-center'>
        <a
          className='btn btn-link'
          href='html/demo1/public-profile/activity.html'
        >
          All-time Activities
        </a>
      </div>
    </div>
  );
};

export default ProjectHistoryCard;
