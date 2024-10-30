const SkeletonLoader = () => (
  <div className='animate-pulse space-y-6'>
    {[1, 2, 3].map((index) => (
      <div key={index} className='space-y-3'>
        <div className='h-6 w-1/4 rounded bg-gray-200'></div>
        <div className='flex flex-wrap gap-3'>
          {[...Array(8)].map((_, i) => (
            <div key={i} className='h-8 w-20 rounded-full bg-gray-200'></div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default SkeletonLoader;
