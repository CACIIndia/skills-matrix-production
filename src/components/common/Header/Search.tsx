"use client";
import Button from "@/components/common/Button";



interface ProfileSearchProps {
  onClick: () => void; 
}

const ProfileSearch: React.FC<ProfileSearchProps> = ({ onClick }) => {
  return (
   
    <div className='relative inline-block' >
      <Button  onClick={onClick} className='btn-2' size='sm'>
        <i className='ki-filled ki-magnifier'></i>
      </Button>
    </div>
  );
};

export default ProfileSearch;

