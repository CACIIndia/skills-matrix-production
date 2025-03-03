"use client";
import { FC, useState } from "react";

interface Skill {
  testId: string;
  name: string;
}

interface AccordionItemProps {
  title: string;
  items: Skill[];
  onFilterChange: (filterName: string, value: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AccordionItem: FC<AccordionItemProps> = ({ title, items, onFilterChange, }) => {
  const handleSelect = (value: string) => {
    onFilterChange(title === 'Job Title' ? 'jobFilter' : 'locationFilter', value);
  };
  const [isOpen, setIsOpen] = useState(false);
   
  return (
    <div className="border rounded-lg mb-2 overflow-hidden shadow-sm">
      <button
        className={`w-full text-left py-3 px-4 font-semibold flex justify-between items-center transition-all ${
          isOpen ? "bg-gray-300 text-gray-900" : "bg-gray-100 text-gray-700"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <span className={`transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}>
          ▼
        </span>
      </button>
      <div
        className={`transition-all duration-300 ${isOpen ? "max-h-screen" : "max-h-0 overflow-hidden"}`}
      >
        <ul className="bg-gray-50">
          {items.map((item) => (
            <li key={item.testId}>
              <button
                data-testid={item.testId}
                className="w-full text-left py-2 px-6 hover:bg-gray-200 text-gray-800"
                onClick={() => handleSelect(item.name)}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const SideBarSearchProfile: FC<{isOpen: boolean, setIsOpen: (isOpen: boolean) => void ,onFilterChange: (filterName: string, value: string) => void }> = ({ onFilterChange,isOpen,setIsOpen }) => {
  const frontendSkills: Skill[] = [
    { testId: "2", name: "Angular" },
    { testId: "3", name: "CSS" },
    { testId: "988", name: "Data Visualisation" },
    { testId: "4", name: "Deno" },
    { testId: "1998", name: "Gatsby" },
    { testId: "5", name: "HTML" },
    { testId: "6", name: "React" },
    { testId: "8", name: "Vue.js" },
  ];

  const backendSkills: Skill[] = [
    { testId: "11", name: "Amazon DynamoDB" },
    { testId: "14", name: "Amazon RDS" },
    { testId: "26", name: "Django" },
    { testId: "34", name: "MySQL" },
    { testId: "40", name: "Redis" },
    { testId: "42", name: "Spring Boot" },
    { testId: "44", name: "SQL" },
  ];

  return (
    <div className="p-4 bg-white-100  border-r border-gray-300 ">
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Skills</h2>
        <AccordionItem setIsOpen={setIsOpen} title="Frontend" items={frontendSkills} onFilterChange={onFilterChange}  isOpen={isOpen}/>
        <AccordionItem setIsOpen={setIsOpen} title="Backend" items={backendSkills} onFilterChange={onFilterChange} isOpen={isOpen} />
      </div>
    </div>
  );
};

export default SideBarSearchProfile;
