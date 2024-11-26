import Menu from "@/components/common/Menu";
import React from "react";

// Define the types for props and data
interface Certificate {
  id: number;
  employeeName: string;
  category: string;
  skill: string;
  fromDate: string;
  endDate: string;
}

const certificates: Certificate[] = [
  {
    id: 1,
    employeeName: "Karthik",
    category: "Soft Skills",
    skill: "Solution Design",
    fromDate: "23-Nov-24",
    endDate: "23-Nov-24",
  },
  // Add more certificate data here if needed
];

const TrainingSchedule: React.FC = () => {
  return (
    <div>
      {/* Top container */}
     
        <div className="flex flex-nowrap items-center lg:items-end justify-between border-b border-b-gray-200 dark:border-b-coal-100 gap-6 mb-5 lg:mb-10">
          <div className="grid container-fixed">
            <div className="scrollable-x-auto">
              <Menu items={[{name:"My Team",path:"/line-manager/my-team"},
                {name:"Certifications",path:"/line-manager/certifications"},
                {name:"Training",path:"/line-manager/training"}]} />
            </div>
          </div>
        </div>

      {/* Header container */}
      <div className="container-fixed">
        <div className="flex flex-wrap items-center lg:items-end justify-between gap-5 pb-7.5">
          <div className="flex flex-col justify-center gap-2">
            <h1 className="text-xl font-semibold leading-none text-gray-900">
              Training - Schedule
            </h1>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
              Some content goes here..
            </div>
          </div>
        </div>
      </div>

      {/* Table container */}
      <div className="container-fixed">
        <div className="grid gap-5 lg:gap-7.5">
          <div className="col-span-2 lg:col-span-2 flex">
            <div className="card grow">
              <div className="card-header flex items-center justify-between">
                <h3 className="card-title">Latest Payment</h3>
                <button className="btn btn-primary btn-sm flex items-center gap-1">
                  <i className="ki-filled ki-plus"></i>
                  New Training
                </button>
              </div>
              <div className="card-body pt-4 pb-3">
                <table className="table ">
                  <thead>
                    <tr className="">
                      <th className="">#</th>
                      <th className="">Employee Name</th>
                      <th className="">Category</th>
                      <th className="">Skill</th>
                      <th className="">From Date</th>
                      <th className="">Tentative End Date</th>
                      <th className="">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {certificates.map((cert, index) => (
                      <tr key={cert.id}>
                        <td className="">
                          {index + 1}
                        </td>
                        <td className="">{cert.employeeName}</td>
                        <td className="">{cert.category}</td>
                        <td className="">{cert.skill}</td>
                        <td className="">{cert.fromDate}</td>
                        <td className="">{cert.endDate}</td>
                        <td className=" flex gap-2">
                          <button className="btn btn-sm btn-icon btn-clear btn-light" title="Edit">
                            <i className="ki-filled ki-notepad-edit"></i>
                          </button>
                          <button className="btn btn-sm btn-icon btn-clear btn-light text-danger" title="Delete">
                            <i className="ki-filled ki-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingSchedule;
