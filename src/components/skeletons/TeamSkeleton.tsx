const TeamSkeleton = () => (
    <div className='lg:gap-7.5 grid animate-pulse container-fixed '>

        <div>
        <div className='h-10 w-[200px] rounded-lg bg-gray-200'></div>
        </div>

      <div className='  grid gap-5 grid-cols-3 w-full border border-red-100'>
        <div className='h-64 rounded-lg bg-gray-200'></div>
        <div className='h-64 rounded-lg bg-gray-200'></div>
        <div className='h-64 rounded-lg bg-gray-200'></div>
        <div className='h-64 rounded-lg bg-gray-200'></div>
        
      </div>
  
     
    </div>
  );
  
  export default TeamSkeleton;
  