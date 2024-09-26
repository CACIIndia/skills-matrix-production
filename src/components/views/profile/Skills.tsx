interface SkillsCardProps {
  skills: string[];
}

const SkillsCard: React.FC<SkillsCardProps> = ({ skills }) => {
  return (
    <div className='card'>
      <div className='card-header'>
        <h3 className='card-title'>Skills</h3>
      </div>
      <div className='card-body'>
        <div className='mb-2 flex flex-wrap gap-2.5'>
          {skills.map((skill, index) => (
            <span key={index} className='badge badge-sm badge-gray-200'>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsCard;
