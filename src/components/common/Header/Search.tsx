"use client";

type ProfileSearchProps = {
  onClick: () => void;
};

const ProfileSearch = ({ onClick }: ProfileSearchProps) => {
  return (
    <div className='relative inline-block'>
      <button
        className='btn btn-icon btn-icon-lg size-9 rounded-full text-gray-500 hover:bg-primary-light hover:text-primary-hover'
        onClick={onClick}
      >
        <i className='ki-filled ki-magnifier'></i>
      </button>
    </div>
  );
};

export default ProfileSearch;
