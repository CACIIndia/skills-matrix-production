import { SKILL_LEVELS } from "@/lib/constants/profile";
import classNames from "classnames";
import React, { ReactNode } from "react";

interface LegendProps {
  layout?: "horizontal" | "vertical";
  hideCardHeader?: boolean;
  optionalComponent?: ReactNode;
}

const Legend: React.FC<LegendProps> = ({
  layout = "horizontal",
  hideCardHeader = false,
  optionalComponent,
}) => {
  return (
    <div className='col-span-1 text-start'>
      <div className='card'>
        {!hideCardHeader && (
          <div className='card-header'>
            <h3 className='text-lg font-semibold text-gray-800'>Legend</h3>
          </div>
        )}
        <div className={`p-6 ${hideCardHeader ? "pt-6" : ""}`}>
          <div
            className={`${
              layout === "vertical"
                ? "flex flex-col gap-6"
                : "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {SKILL_LEVELS.map((skill) => (
              <div key={skill.level} className='flex items-start space-x-3'>
                <div className='flex-shrink-0'>
                  <span
                    className={classNames(
                      "inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium",
                      {
                        "!bg-gray-200 !text-gray-600": skill.level === 0,
                        "!bg-red-100 !text-red-600": skill.level === 1,
                        "!bg-yellow-100 !text-yellow-600": skill.level === 2,
                        "!bg-blue-100 !text-blue-600": skill.level === 3,
                        "!bg-green-100 !text-green-600": skill.level === 4,
                      },
                    )}
                  >
                    {skill.level}
                  </span>
                </div>
                <div className='flex flex-col'>
                  <span className='text-sm font-medium text-gray-800'>
                    {skill.name}
                  </span>
                  <p className='text-xs text-gray-500'>{skill.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {optionalComponent && (
          <div className='border-t border-gray-200 bg-gray-50 px-6 py-4'>
            {optionalComponent}
            <p className='mt-2 text-sm text-gray-600'>Choose your skills</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Legend;
