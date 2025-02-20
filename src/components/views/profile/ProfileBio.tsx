const Bio = () => {
  return (
    <>
      <div className='lg:gap-7.5 flex flex-col gap-5'>
        <div className='card'>
          <div className='card-header flex items-center justify-between'>
            <h3 className='card-title'>Edit Bio</h3>
          </div>

          <div className='card-body'>
            <div className='mb-2 flex flex-wrap gap-2.5'>
              <div className='flex items-center justify-center m-auto h-[100px]'>
                <img
                  src='/assets/media/avatars/commingsoon.png'
                  alt='Upcoming Soon'
                  className='w-full h-full '
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bio;
