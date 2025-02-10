"use client";

import Modal from "@/components/common/Modal";
import Image from "next/image";
import { useState } from "react";
import AddProject from "./AddProject";
import useGetProjects from "@/lib/hooks/profile/projects/useGetProjects";
interface ActivityItemProps {
  icon: string;
  title: string;
  linkText?: string;
  linkHref?: string;
  time: string;
  description?: string;
}

interface ActivityItemWithImageProps {
  icon: string;
  title: string;
  time: string;
  imgSrc: string;
  imgAlt: string;
  imgLinkText: string;
  imgTitle: string;
  imgDescription: string;
}

interface ActivityItemWithContentProps {
  icon: string;
  title: string;
  time: string;
  contentTitle: string;
  contentDescription: string;
  code: string;
  progress: string;
  guests: string[];
  guestCount: number;
}
export default function ProjectPage() {
  const { data: projects } = useGetProjects();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='flex h-[40vh] items-center justify-center'>
      <button
        onClick={() => setIsOpen(true)}
        className='relative mb-[4px] mr-[10px] rounded-[4px] bg-[#0d6efd] p-[6px] text-white transition duration-300 hover:bg-blue-700'
      >
        <div className='flex items-center justify-center space-x-1'>
          <div>Add Project</div>
        </div>
      </button>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title='Add New Project'
        buttonText='Update'
        // handler={handleEdit}
        customWidth='w-[100%] lg:w-[40%] h-[100%] lg:h-[50%]'
        isFromAddProject={true}
      >
        <AddProject handleClose={() => setIsOpen(false)} projects={projects} />
      </Modal>
    </div>
  );
}
{
  /* <div className="container-fixed text-start">
<div className="grid gap-5 lg:gap-7.5">
  <div className="card">
    <div className="flex gap-5 lg:gap-7.5">
      <div className="card grow" id="activity_2024">
        <div className="card-header">
          <h3 className="card-title">Activity</h3>
          <div className="flex items-center gap-2">
            <label className="switch">
              <span className="switch-label">
                Auto refresh:
                <span className="switch-on:hidden">Off</span>
                <span className="hidden switch-on:inline">On</span>
              </span>
              <input name="check" type="checkbox" value="1" />
            </label>
          </div>
        </div>
        <div className="card-body">
          <div className="flex flex-col">
            <ActivityItem
              icon="ki-people"
              title="Posted a new article"
              linkText="Top 10 Tech Trends"
              linkHref="/public-profile/profiles/blogger.html"
              time="Today, 9:00 AM"
            />
            <ActivityItem
              icon="ki-entrance-left"
              title="I had the privilege of interviewing an industry expert for an"
              linkText="upcoming blog post"
              linkHref="/public-profile/profiles/blogger.html"
              time="2 days ago, 4:07 PM"
            />
            <ActivityItemWithImage
              icon="ki-code"
              title="Jenny attended a Nature Photography Immersion workshop"
              time="3 days ago, 11:45 AM"
              imgSrc="/assets/media/images/600x400/8.jpg"
              imgAlt="Nature Photography"
              imgLinkText="Photo Workshop"
              imgTitle="Nature Photography Immersion"
              imgDescription="Enhance your nature photography skills in a hands-on workshop guided by experienced photographers."
            />
            <ActivityItem
              icon="ki-share"
              title="I couldn't resist sharing a sneak peek of our"
              linkText="upcoming content"
              linkHref="/public-profile/profiles/blogger.html"
              time="5 days ago, 4:07 PM"
            />
            <ActivityItemWithContent
              icon="ki-calendar-tick"
              title="Jenny attended a webinar on new product features."
              time="3 days ago, 11:45 AM"
              contentTitle="Leadership Development Series: Part 1"
              contentDescription="The first installment of a leadership development series."
              code="#leaderdev-1"
              progress="80%"
              guests={[
                "/assets/media/avatars/300-4.png",
                "/assets/media/avatars/300-1.png",
                "/assets/media/avatars/300-2.png",
              ]}
              guestCount={24}
            />
            <ActivityItem
              icon="ki-coffee"
              title="Reaching the milestone of"
              linkText="10,000 followers"
              linkHref="/public-profile/profiles/feeds.html"
              time="5 days ago, 4:07 PM"
              description="on the blog was a dream come true"
            />
            <ActivityItem
              icon="ki-rocket"
              title="Completed phase one of client project ahead of schedule."
              time="6 days ago, 10:45 AM"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div> */
}

function ActivityItem({
  icon,
  title,
  linkText,
  linkHref,
  time,
  description,
}: ActivityItemProps) {
  return (
    <div className='relative flex items-start'>
      <div className='absolute bottom-0 left-0 top-9 w-9 translate-x-1/2 border-l border-l-gray-300'></div>
      <div className='flex size-9 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-gray-100 text-gray-600'>
        <i className={`ki-filled ${icon} text-base`}></i>
      </div>
      <div className='text-md mb-7 grow pl-2.5'>
        <div className='flex flex-col'>
          <div className='text-sm font-medium text-gray-800'>
            {title}{" "}
            <a className='link text-sm font-medium' href={linkHref}>
              {linkText}
            </a>
            {description && (
              <span className='text-sm font-medium text-gray-700'>
                {" "}
                {description}
              </span>
            )}
          </div>
          <span className='text-xs font-medium text-gray-500'>{time}</span>
        </div>
      </div>
    </div>
  );
}

function ActivityItemWithImage({
  icon,
  title,
  time,
  imgSrc,
  imgAlt,
  imgLinkText,
  imgTitle,
  imgDescription,
}: ActivityItemWithImageProps) {
  return (
    <div className='relative flex items-start'>
      <div className='absolute bottom-0 left-0 top-9 w-9 translate-x-1/2 border-l border-l-gray-300'></div>
      <div className='flex size-9 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-gray-100 text-gray-600'>
        <i className={`ki-filled ${icon} text-base`}></i>
      </div>
      <div className='text-md mb-7 grow pl-2.5'>
        <div className='flex flex-col pb-2.5'>
          <span className='text-sm font-medium text-gray-700'>{title}</span>
          <span className='text-xs font-medium text-gray-500'>{time}</span>
        </div>
        <div className='card shadow-none'>
          <div className='card-body'>
            <div className='grid gap-4'>
              <div className='flex flex-col gap-5 md:flex-row md:items-center'>
                <div className='flex shrink-0 items-center gap-5'>
                  <div className='border-brand-clarity max-h-20 rounded-lg border'>
                    <div className='border-b-brand-clarity bg-brand-light flex items-center justify-center rounded-t-lg border-b'>
                      <span className='text-2sm text-brand fw-medium p-2'>
                        Apr
                      </span>
                    </div>
                    <div className='flex size-12 items-center justify-center'>
                      <span className='fw-semibold text-1.5xl tracking-tight text-gray-800'>
                        02
                      </span>
                    </div>
                  </div>
                  <Image
                    alt={imgAlt}
                    className='max-h-20 max-w-full rounded-lg'
                    src={imgSrc}
                    width={150}
                    height={100}
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <a
                    className='text-brand hover:text-primary-active mb-px text-xs font-medium leading-[14px]'
                    href='#'
                  >
                    {imgLinkText}
                  </a>
                  <a
                    className='text-md font-semibold leading-4 text-gray-900 hover:text-primary'
                    href='#'
                  >
                    {imgTitle}
                  </a>
                  <p className='text-xs font-medium leading-[22px] text-gray-700'>
                    {imgDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityItemWithContent({
  icon,
  title,
  time,
  contentTitle,
  contentDescription,
  code,
  progress,
  guests,
  guestCount,
}: ActivityItemWithContentProps) {
  return (
    <div className='relative flex items-start'>
      <div className='absolute bottom-0 left-0 top-9 w-9 translate-x-1/2 border-l border-l-gray-300'></div>
      <div className='flex size-9 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-gray-100 text-gray-600'>
        <i className={`ki-filled ${icon} text-base`}></i>
      </div>
      <div className='text-md mb-7 grow pl-2.5'>
        <div className='flex flex-col pb-2.5'>
          <span className='text-sm font-medium text-gray-700'>{title}</span>
          <span className='text-xs font-medium text-gray-500'>{time}</span>
        </div>
        <div className='card p-4 shadow-none'>
          <div className='flex flex-wrap gap-2.5'>
            <i className='ki-filled ki-code text-info text-lg'></i>
            <div className='flex grow flex-col gap-5'>
              <div className='flex flex-wrap items-center justify-between'>
                <div className='flex flex-col gap-0.5'>
                  <span className='text-md mb-px cursor-pointer font-semibold text-gray-900 hover:text-primary'>
                    {contentTitle}
                  </span>
                  <span className='text-xs font-medium text-gray-500'>
                    {contentDescription}
                  </span>
                </div>
                <a className='btn btn-link' href='/account/members/teams.html'>
                  View
                </a>
              </div>
              <div className='gap-7.5 flex flex-wrap'>
                <div className='flex flex-wrap gap-2'>
                  <span className='text-sm font-medium text-gray-700'>
                    {code}
                  </span>
                  <div className='relative w-full max-w-[120px]'>
                    <div className='h-2 overflow-hidden rounded-full bg-gray-200'>
                      <div
                        className='bg-brand-main h-full rounded-full'
                        style={{ width: progress }}
                      ></div>
                    </div>
                    <span className='absolute right-0 top-0 -translate-x-1/2 -translate-y-1/2 text-xs font-medium'>
                      {progress}
                    </span>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='text-xs font-medium text-gray-500'>
                    Guests:
                  </span>
                  <div className='flex items-center gap-1'>
                    {guests.map((guest, index) => (
                      <Image
                        key={index}
                        alt='Guest Avatar'
                        className='h-5 w-5 rounded-full'
                        src={guest}
                        width={20}
                        height={20}
                      />
                    ))}
                  </div>
                  <span className='text-xs font-medium text-gray-500'>
                    +{guestCount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
