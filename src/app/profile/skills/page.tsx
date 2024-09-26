import Legend from "@/app/components/Legendcard";
import SkillCard from "@/app/components/SkillsCard";
const skills = [
   { name: 'Web Design', level: 3 },   // Expert
   { name: 'Code Review', level: 3 },  // Expert
   { name: 'Figma', level: 1 },        // Novice
   { name: 'Product Development', level: 1 }, // Novice
   { name: 'Webflow', level: 2 },      // Proficient
   { name: 'AI', level: 2 },           // Proficient
   { name: 'noCode', level: 2 },       // Proficient
 ]

export default function SkillsPage() {
  return (
    <div className='container-fixed'>
      <div className='lg:gap-7.5 grid grid-cols-1 gap-5 lg:grid-cols-3'>
        <div className='col-span-2'>
          

          <SkillCard skills={skills} showEditButton={true} />
        </div>
          <Legend layout="grid"/>
      </div>
    </div>
  );
}
