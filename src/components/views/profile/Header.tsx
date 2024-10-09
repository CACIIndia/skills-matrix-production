import { UserDetails } from "@/lib/types/profile";
import Image from "next/image";

type ProfileHeaderProps = {
  data: UserDetails;
};

const ProfileHeader = ({
  data: { name, image, email, role ,location},
}: ProfileHeaderProps) => {
  return (
    <div className='hero-bg bg-cover bg-center bg-no-repeat'>
      <div className='container-fixed'>
        <div className='flex flex-col items-center gap-2 py-4 lg:gap-3.5 lg:pb-10 lg:pt-5'>
          {image && (
            <Image
              className='border-3 border-success size-[100px] shrink-0 rounded-full'
              src={image}
              alt={name}
              width={100}
              height={100}
            />
          )}
          <div className='flex items-center gap-1.5'>
            <div className='text-lg font-semibold leading-5 text-gray-900'>
              {name}
            </div>
            <svg
              className='text-primary'
              fill='none'
              height='16'
              width='15'
              xmlns='http://www.w3.org/2000/svg'
            >
              {/* SVG Path */}
            </svg>
          </div>
          <div className='lg:gap-4.5 flex flex-wrap justify-center gap-1 text-sm'>
            <div className='gap-1.25 flex items-center'>
              <i
                style={{ zIndex: -10 }}
                className='ki-filled ki-geolocation text-sm text-gray-500'
              ></i>
              <span className='text-gray-600'>{role}</span>
            </div>
            <div className='gap-1.25 flex items-center'>
              <i
                style={{ zIndex: -10 }}
                className='ki-filled ki-geolocation text-sm text-gray-500'
              ></i>
              <span className='text-gray-600'>{location}</span>
            </div>
            <div className='gap-1.25 flex items-center'>
              <i
                style={{ zIndex: -10 }}
                className='ki-filled ki-sms text-sm text-gray-500'
              ></i>
              <a
                className='text-gray-600 hover:text-primary'
                href={`mailto:${email}`}
              >
                {email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
