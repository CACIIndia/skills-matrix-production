const ProfileSkeleton = () => (
  <div className='lg:gap-7.5 grid animate-pulse grid-cols-1 gap-5 px-2 lg:grid-cols-3'>
    <div className='col-span-1 grid gap-5'>
      <div className='h-64 rounded-lg bg-gray-200'></div>
      <div className='h-40 rounded-lg bg-gray-200'></div>
    </div>

    <div className='col-span-2 grid gap-5'>
      <div className='h-48 rounded-lg bg-gray-200'></div>
      <div className='h-64 rounded-lg bg-gray-200'></div>
    </div>
  </div>
);

export default ProfileSkeleton;
