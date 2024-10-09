import React, { ReactNode } from "react";

const skillLevels = [
  {
    level: 0,
    name: "None",
    description: "No knowledge of the skill",
    color: "badge-outline",
  },
  {
    level: 1,
    name: "Basic",
    description: "General understanding, can perform tasks with supervision",
    color: "badge-danger",
  },
  {
    level: 2,
    name: "Proficient",
    description:
      "Independent task completion with quality that exceeds the basics",
    color: "badge-warning",
  },
  {
    level: 3,
    name: "Expert",
    description:
      "Independent, high-quality task completion and ability to share knowledge with peers",
    color: "badge-primary",
  },
  {
    level: 4,
    name: "Specialist",
    description:
      "Independent, high-quality task completion, ability to optimise processes, and design solutions",
    color: "badge-success",
  },
];

interface LegendProps {
  layout: "grid" | "flex"; // Accept 'grid' or 'flex' as props
  hideCardHeader?: boolean;
  optionalComponent?: ReactNode;
}

// @TODO Refactor this component

const Legend: React.FC<LegendProps> = ({
  layout,
  hideCardHeader = false,
  optionalComponent,
}) => {
  const containerClasses =
    layout === "grid" ? "grid gap-5" : "flex flex-row gap-3.5";

  return (
    <div className={`col-span-1 text-start`}>
      <div className={`lg:gap-7.5 grid gap-5`}>
        <div className={`${hideCardHeader ? "" : "card"}`}>
          {!hideCardHeader && (
            <div className='card-header'>
              <h3 className='card-title'>Legend</h3>
            </div>
          )}
          <div className={`card-body ${hideCardHeader ? "pb-0" : ""}`}>
            <div className={containerClasses}>
              {skillLevels.map((skill) => (
                <div
                  key={skill.level}
                  className={`${layout === "grid" ? "flex" : "grid"} align-start w-[100%] gap-3.5`}
                >
                  <div
                    className={`flex ${layout === "grid" ? "items-center justify-center" : ""} `}
                  >
                    <span
                      className={`badge badge-sm ${skill.color} h-7 w-14`}
                    ></span>
                  </div>
                  <div
                    className={`flex flex-col ${layout === "grid" ? "" : "h-auto"} `}
                  >
                    <span className='text-sm font-medium text-gray-800'>
                      {skill.level} | {skill.name}
                    </span>
                    <span className='text-xs font-medium text-gray-500'>
                      {skill.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* render here  when i pass component optional*/}
          {optionalComponent && (
            <div className='optional-component'>
              {optionalComponent}
              choose your skills
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Legend;
