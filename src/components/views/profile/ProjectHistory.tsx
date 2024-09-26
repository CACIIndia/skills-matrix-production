import Image from "next/image";
import { CurrentProject, PreviousProject } from "@/lib/types/profile";

type ProjectHistoryCardProps = {
  projects: {
    current_project: CurrentProject;
    previous_projects: PreviousProject[];
    employment_history: {
      company: string;
      joined_date: string;
    };
  };
};

const ProjectHistoryCard = ({
  projects: { current_project, previous_projects, employment_history },
}: ProjectHistoryCardProps) => {
  return (
    <div className='card ' style={{zIndex:-1}}>
      <div className='card-header'>
        <h3 className='card-title'>Projects History</h3>
      </div>
      <div className='card-body text-start'>
        <div className='flex flex-col'>
          {current_project && (
            <div className='relative flex items-start'>
              <div className='absolute bottom-0 left-0 top-9 w-9 translate-x-1/2 border-l border-l-gray-300'></div>
              <div className='flex size-9 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-gray-100 text-gray-600'>
                <i className='ki-filled ki-calendar-tick text-base'></i>
              </div>
              <div className='text-md mb-7 grow pl-2.5'>
                <div className='flex flex-col pb-2.5'>
                  <span className='text-sm font-medium text-gray-700'>
                    Working in {current_project.project_name}
                  </span>
                  <span className='text-xs font-medium text-gray-500'>
                    {current_project.start_date}
                  </span>
                </div>
                <div className='card p-4 shadow-none'>
                  <div className='flex flex-wrap gap-2.5'>
                    <i className='ki-filled ki-code text-info text-lg'></i>
                    <div className='flex grow flex-col gap-5'>
                      <div className='flex flex-wrap items-center justify-between'>
                        <div className='flex flex-col gap-0.5'>
                          <span className='text-md hover:text-primary mb-px cursor-pointer font-semibold text-gray-900'>
                            {current_project.role}
                          </span>
                          <span className='text-xs font-medium text-gray-500'>
                            {current_project.description}
                          </span>
                        </div>
                      </div>

                      <div className='flex items-center gap-1.5'>
                        <span className='text-2sm font-medium text-gray-500'>
                          Members:
                        </span>
                        <div className='flex -space-x-2'>
                          {current_project.members
                            .slice(0, 3)
                            .map((member, index) => (
                              <div
                                key={index}
                                className='relative size-7 shrink-0'
                              >
                                <Image
                                  className='hover:z-5 ring-light-light rounded-full ring-1'
                                  src={`/${member.image_url}`}
                                  alt={member.name || `Member ${index + 1}`}
                                  width={40} // Set your desired width
                                  height={40} // Set your desired height
                                />
                              </div>
                            ))}
                          {/* Display additional members if present */}
                          {current_project.members.length > 3 && (
                            <span className='ring-light-light flex size-7 items-center justify-center rounded-full bg-gray-100 ring-1'>
                              {`+${current_project.members.length - 3}`}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Previous Projects */}
          {previous_projects.map((project, index) => (
            <div key={index} className='relative flex items-start'>
              <div className='absolute bottom-0 left-0 top-9 w-9 translate-x-1/2 border-l border-l-gray-300'></div>
              <div className='flex size-9 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-gray-100 text-gray-600'>
                <i className='ki-filled ki-calendar text-base'></i>
              </div>
              <div className='text-md mb-7 grow pl-2.5'>
                <div className='flex flex-col pb-2.5'>
                  <span className='text-sm font-medium text-gray-700'>
                    Worked in {project.project_name}
                  </span>
                  <span className='text-xs font-medium text-gray-500'>
                    {project.start_date} - {project.end_date}
                  </span>
                </div>
                <div className='card p-4 shadow-none'>
                  <div className='flex flex-wrap gap-2.5'>
                    <i className='ki-filled ki-code text-info text-lg'></i>
                    <div className='flex grow flex-col gap-5'>
                      <div className='flex flex-wrap items-center justify-between'>
                        <div className='flex flex-col gap-0.5'>
                          <span className='text-md hover:text-primary mb-px cursor-pointer font-semibold text-gray-900'>
                            {project.role}
                          </span>
                          <span className='text-xs font-medium text-gray-500'>
                            {project.description}
                          </span>
                        </div>
                      </div>
                      {/* Members */}
                      <div className='flex items-center gap-1.5'>
                        <span className='text-2sm font-medium text-gray-500'>
                          Members:
                        </span>
                        <div className='flex -space-x-2'>
                          {project.members
                            .slice(0, 3)
                            .map((member, memberIndex) => (
                              <img
                                key={memberIndex}
                                className='hover:z-5 ring-light-light relative size-7 shrink-0 rounded-full ring-1'
                                src={`/${member.image_url}`}
                                alt={member.name || `Member ${memberIndex + 1}`}
                              />
                            ))}
                          {/* Display additional members if present */}
                          {project.members.length > 3 && (
                            <span className='ring-light-light flex size-7 items-center justify-center rounded-full bg-gray-100 ring-1'>
                              {`+${project.members.length - 3}`}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Employment History */}
          <div className='relative flex items-start'>
            <div className='absolute bottom-0 left-0 top-9 w-9 translate-x-1/2 border-l border-l-gray-300'></div>
            <div className='flex size-9 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-gray-100 text-gray-600'>
              <i className='ki-filled ki-entrance-left text-base'></i>
            </div>
            <div className='text-md mb-7 grow pl-2.5'>
              <div className='flex flex-col'>
                <div className='text-sm font-medium text-gray-800'>
                  Joined in {employment_history.company}
                </div>
                <span className='text-xs font-medium text-gray-500'>
                  {employment_history.joined_date}
                </span>
              </div>
            </div>
          </div>
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
