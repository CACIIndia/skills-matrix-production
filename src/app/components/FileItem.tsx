// components/FileItem.tsx
import Image from 'next/image';
import { MdDownload } from "react-icons/md";

interface FileItemProps {
  iconSrc: string;
  iconAlt: string;
  fileName: string;
  fileDetails: string;

}

const FileItem: React.FC<FileItemProps> = ({ iconSrc, iconAlt, fileName, fileDetails }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center grow gap-2.5">
        <Image
          src={iconSrc}
          alt={iconAlt}
          width={24} // Adjust as needed
          height={24} // Adjust as needed
        />
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-900 cursor-pointer hover:text-primary mb-px">
            {fileName}
          </span>
          <span className="text-xs font-normal text-gray-600">
            {fileDetails}
          </span>
        </div>
      </div>
      {/* Download Icon */}
      <div className="cursor-pointer text-2xl text-blue-500">
          <MdDownload />
      </div>
    </div>
  );
};

export default FileItem;
