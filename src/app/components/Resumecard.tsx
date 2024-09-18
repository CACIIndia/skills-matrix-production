// components/Card.tsx
import Image from 'next/image';

interface CardProps {
  iconSrc: string;
  iconAlt: string;
  title: string;
  timestamp: string;
}

const ResumeCard: React.FC<CardProps> = ({ iconSrc, iconAlt, title, timestamp }) => {
  return (
    <div className="border border-gray-100 grow">
      <div className="card h-50 w-[250px]">
        <div className="flex flex-col items-center text-center p-8">
          <a href="#" className="text-gray-800 hover:text-primary flex flex-col">
            <div className="w-20 h-20 mb-6">
              <Image
                src={iconSrc}
                alt={iconAlt}
                width={80} // Adjust as needed
                height={80} // Adjust as needed
                className="object-cover"
              />
            </div>
            <div className="text-xl font-bold mb-2">{title}</div>
          </a>
          <div className="text-sm font-semibold text-gray-500 mt-auto">{timestamp}</div>
        </div>
      </div>
    </div>
  );
};

export default ResumeCard;
