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
          {/* <div className='lg:gap-7.5 flex flex-col gap-5'>
            <div className='lg:gap-7.5 flex flex-col gap-5'>
              <div className='card'>
                <div className='card-header'>
                  <h3 className='card-title'>Skills</h3>
                </div>
                <div className='card-body'>
                  <div className='mb-2 flex flex-wrap gap-2.5'>
                    <span className='badge badge-sm badge-success'>
                      Web Design
                    </span>
                    <span className='badge badge-sm badge-success badge-outline'>
                      Code Review
                    </span>
                    <span className='badge badge-sm badge-danger'>Figma</span>
                    <span className='badge badge-sm badge-danger badge-outline'>
                      Product Development
                    </span>
                    <span className='badge badge-sm badge-info'>Webflow</span>
                    <span className='badge badge-sm badge-info badge-outline'>
                      Webflow
                    </span>
                    <span className='badge badge-sm badge-warning badge-outline'>
                      AI
                    </span>
                    <span className='badge badge-sm badge-warning'>AI</span>
                    <span className='badge badge-sm badge-primary badge-outline'>
                      noCode
                    </span>
                    <span className='badge badge-sm badge-primary'>noCode</span>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          <SkillCard skills={skills} showEditButton={true} />
        </div>
          <Legend layout="grid"/>
      </div>
    </div>
  );
}
