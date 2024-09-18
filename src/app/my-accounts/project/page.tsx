import Image from 'next/image';
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
  return (
    <div className="container-fixed text-start">
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
      </div>
    </div>
  );
}

function ActivityItem({ icon, title, linkText, linkHref, time, description }: ActivityItemProps)  {
  return (
    <div className="flex items-start relative">
      <div className="w-9 left-0 top-9 absolute bottom-0 translate-x-1/2 border-l border-l-gray-300"></div>
      <div className="flex items-center justify-center shrink-0 rounded-full bg-gray-100 border border-gray-300 size-9 text-gray-600">
        <i className={`ki-filled ${icon} text-base`}></i>
      </div>
      <div className="pl-2.5 mb-7 text-md grow">
        <div className="flex flex-col">
          <div className="text-sm font-medium text-gray-800">
            {title}{' '}
            <a className="text-sm font-medium link" href={linkHref}>
              {linkText}
            </a>
            {description && <span className="text-sm font-medium text-gray-700"> {description}</span>}
          </div>
          <span className="text-xs font-medium text-gray-500">{time}</span>
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
    <div className="flex items-start relative">
      <div className="w-9 left-0 top-9 absolute bottom-0 translate-x-1/2 border-l border-l-gray-300"></div>
      <div className="flex items-center justify-center shrink-0 rounded-full bg-gray-100 border border-gray-300 size-9 text-gray-600">
        <i className={`ki-filled ${icon} text-base`}></i>
      </div>
      <div className="pl-2.5 mb-7 text-md grow">
        <div className="flex flex-col pb-2.5">
          <span className="text-sm font-medium text-gray-700">{title}</span>
          <span className="text-xs font-medium text-gray-500">{time}</span>
        </div>
        <div className="card shadow-none">
          <div className="card-body">
            <div className="grid gap-4">
              <div className="flex flex-col md:flex-row md:items-center gap-5">
                <div className="flex items-center gap-5 shrink-0">
                  <div className="border border-brand-clarity rounded-lg max-h-20">
                    <div className="flex items-center justify-center border-b border-b-brand-clarity bg-brand-light rounded-t-lg">
                      <span className="text-2sm text-brand fw-medium p-2">Apr</span>
                    </div>
                    <div className="flex items-center justify-center size-12">
                      <span className="fw-semibold text-gray-800 text-1.5xl tracking-tight">02</span>
                    </div>
                  </div>
                  <Image alt={imgAlt} className="rounded-lg max-h-20 max-w-full" src={imgSrc} width={150} height={100} />
                </div>
                <div className="flex flex-col gap-2">
                  <a className="text-xs font-medium text-brand leading-[14px] hover:text-primary-active mb-px" href="#">
                    {imgLinkText}
                  </a>
                  <a className="text-md font-semibold hover:text-primary text-gray-900 leading-4" href="#">
                    {imgTitle}
                  </a>
                  <p className="text-xs font-medium text-gray-700 leading-[22px]">{imgDescription}</p>
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
    <div className="flex items-start relative">
      <div className="w-9 left-0 top-9 absolute bottom-0 translate-x-1/2 border-l border-l-gray-300"></div>
      <div className="flex items-center justify-center shrink-0 rounded-full bg-gray-100 border border-gray-300 size-9 text-gray-600">
        <i className={`ki-filled ${icon} text-base`}></i>
      </div>
      <div className="pl-2.5 mb-7 text-md grow">
        <div className="flex flex-col pb-2.5">
          <span className="text-sm font-medium text-gray-700">{title}</span>
          <span className="text-xs font-medium text-gray-500">{time}</span>
        </div>
        <div className="card shadow-none p-4">
          <div className="flex flex-wrap gap-2.5">
            <i className="ki-filled ki-code text-lg text-info"></i>
            <div className="flex flex-col gap-5 grow">
              <div className="flex flex-wrap items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <span className="text-md font-semibold text-gray-900 cursor-pointer hover:text-primary mb-px">
                    {contentTitle}
                  </span>
                  <span className="text-xs font-medium text-gray-500">{contentDescription}</span>
                </div>
                <a className="btn btn-link" href="/account/members/teams.html">
                  View
                </a>
              </div>
              <div className="flex flex-wrap gap-7.5">
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm font-medium text-gray-700">{code}</span>
                  <div className="relative w-full max-w-[120px]">
                    <div className="overflow-hidden h-2 bg-gray-200 rounded-full">
                      <div className="bg-brand-main h-full rounded-full" style={{ width: progress }}></div>
                    </div>
                    <span className="absolute right-0 top-0 -translate-y-1/2 -translate-x-1/2 text-xs font-medium">
                      {progress}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-500">Guests:</span>
                  <div className="flex items-center gap-1">
                    {guests.map((guest, index) => (
                      <Image
                        key={index}
                        alt="Guest Avatar"
                        className="h-5 w-5 rounded-full"
                        src={guest}
                        width={20}
                        height={20}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-gray-500">+{guestCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
