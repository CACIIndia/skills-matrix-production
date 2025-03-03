const ProfileHeaderSkeleton = () => (
  <div className='flex animate-pulse flex-col items-center gap-2 py-4 lg:gap-3.5 lg:pb-10 lg:pt-5 mt-8'>
    <div className='size-[100px] rounded-full bg-gray-200'></div>
    <div className='h-6 w-48 rounded bg-gray-200'></div>
    <div className='flex gap-2'>
      <div className='h-4 w-24 rounded bg-gray-200'></div>
      <div className='h-4 w-24 rounded bg-gray-200'></div>
      <div className='h-4 w-24 rounded bg-gray-200'></div>
    </div>
  </div>
);

export default ProfileHeaderSkeleton;
