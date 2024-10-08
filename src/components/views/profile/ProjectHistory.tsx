import Image from "next/image";
import { Project } from "@/lib/types/profile";

type ProjectHistoryCardProps = {
  projects: Project[];
};

const ProjectHistoryCard = ({ projects }: ProjectHistoryCardProps) => {
  const currentProject = projects.find((project) => project.isCurrentProject);
  const previousProjects = projects.filter(
    (project) => !project.isCurrentProject,
  );

  return (
    <div className='card' style={{ zIndex: -1 }}>
      <div className='card-header'>
        <h3 className='card-title'>Projects History</h3>
      </div>
      <div className='card-body text-start'>
        <div className='flex flex-col'>
          {currentProject && (
            <div className='relative flex items-start'>
              <div className='absolute bottom-0 left-0 top-9 w-9 translate-x-1/2 border-l border-l-gray-300'></div>
              <div className='flex size-9 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-gray-100 text-gray-600'>
                <i className='ki-filled ki-calendar-tick text-base'></i>
              </div>
              <div className='text-md mb-7 grow pl-2.5'>
                <div className='flex flex-col pb-2.5'>
                  <span className='text-sm font-medium text-gray-700'>
                    Working in {currentProject.projectName}
                  </span>
                  <span className='text-xs font-medium text-gray-500'>
                    {new Date(currentProject.startDate).toLocaleDateString()}
                  </span>
                </div>
                <div className='card p-4 shadow-none'>
                  <div className='flex flex-wrap gap-2.5'>
                    <i className='ki-filled ki-code text-info text-lg'></i>
                    <div className='flex grow flex-col gap-5'>
                      <div className='flex flex-wrap items-center justify-between'>
                        <div className='flex flex-col gap-0.5'>
                          <span className='text-md mb-px cursor-pointer font-semibold text-gray-900 hover:text-primary'>
                            {currentProject.role}
                          </span>
                          <span className='text-xs font-medium text-gray-500'>
                            {currentProject.description}
                          </span>
                        </div>
                      </div>
                      {/* Members section can be added here if needed */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Previous Projects */}
          {previousProjects.map((project, index) => (
            <div key={index} className='relative flex items-start'>
              <div className='absolute bottom-0 left-0 top-9 w-9 translate-x-1/2 border-l border-l-gray-300'></div>
              <div className='flex size-9 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-gray-100 text-gray-600'>
                <i className='ki-filled ki-calendar text-base'></i>
              </div>
              <div className='text-md mb-7 grow pl-2.5'>
                <div className='flex flex-col pb-2.5'>
                  <span className='text-sm font-medium text-gray-700'>
                    Worked in {project.projectName}
                  </span>
                  <span className='text-xs font-medium text-gray-500'>
                    {new Date(project.startDate).toLocaleDateString()} -{" "}
                    {project.endDate
                      ? new Date(project.endDate).toLocaleDateString()
                      : "Ongoing"}
                  </span>
                </div>
                <div className='card p-4 shadow-none'>
                  <div className='flex flex-wrap gap-2.5'>
                    <i className='ki-filled ki-code text-info text-lg'></i>
                    <div className='flex grow flex-col gap-5'>
                      <div className='flex flex-wrap items-center justify-between'>
                        <div className='flex flex-col gap-0.5'>
                          <span className='text-md mb-px cursor-pointer font-semibold text-gray-900 hover:text-primary'>
                            {project.role}
                          </span>
                          <span className='text-xs font-medium text-gray-500'>
                            {project.description}
                          </span>
                        </div>
                      </div>
                      {/* Members section can be added here if needed */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
