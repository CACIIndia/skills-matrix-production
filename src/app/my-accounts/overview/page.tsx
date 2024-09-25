// pages/dashboard.tsx

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SkillCard from "@/app/components/SkillsCard";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface Contributor {
  name: string;
  contributors: number;
  image: string;
}

interface AdditionalInfo {
  discipline: string;
  specialism: string;
  employee_type: string;
  location: string;
  cost_centre: string;
}

interface DashboardData {
  id: number;
  name: string;
  email: string;
  image: string;
  phone: string;
  status: string;
  startdate: string;
  current_project: string;
  sfia_level: string;
  reported_to: string;
  roles: string[];
  created_at: string;
  skills: string[];
  additional_info: AdditionalInfo;
  contributors: Contributor[];
}

const OverviewPage = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [additional_info, setAdditional] = useState<AdditionalInfo | null>(
    null
  );
  const [skills, setSkills] = useState([]);
  const [contributors, setContributor] = useState([]);
  const [current_project, setCurrentProjects] = useState({});
  const [previous_projects, setPreviousProjects] = useState([]);
  const [employment_history ,setEmploymentHistory] = useState([]);

  console.log(additional_info, "additional_info");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/public-profile"); // Your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        let projects = result?.data?.projects;
        let employment_history = result?.data?.projects?.employment_history;
        setData(result.data);
        setAdditional(result.data.additional_info);
        setSkills(result.data.skills);
        setContributor(result.data.contributors);
        setCurrentProjects(projects.current_project);
        setPreviousProjects(projects.previous_projects);
        setEmploymentHistory(employment_history);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-[100%]">
        <div className="container-fixed">
        {/* begin: grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-7.5">
          <div className="col-span-1">
            <div className="grid gap-5 lg:gap-7.5">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">General Info</h3>
                </div>
                <div className="card-body pt-3.5 pb-3.5">
                  <table className="table-auto text-start">
                    <tbody>
                      <tr>
                        <td className="text-sm font-medium text-gray-500 pb-3 pr-4 lg:pr-8">
                          Email:
                        </td>
                        <td className="text-sm font-medium text-gray-800 pb-3">
                          {data?.email}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-sm font-medium text-gray-500 pb-3 pr-4 lg:pr-8">
                          Phone:
                        </td>
                        <td className="text-sm font-medium text-gray-800 pb-3">
                          {data?.phone}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-sm font-medium text-gray-500 pb-3 pr-4 lg:pr-8">
                          Status:
                        </td>
                        <td className="text-sm font-medium text-gray-800 pb-3">
                          <span className="badge badge-sm badge-success badge-outline">
                            Active
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-sm font-medium text-gray-500 pb-3 pr-4 lg:pr-8">
                          Startdate:
                        </td>
                        <td className="text-sm font-medium text-gray-800 pb-3">
                          {data?.startdate}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-sm font-medium text-gray-500 pb-3 pr-4 lg:pr-8">
                          Current Project:
                        </td>
                        <td className="text-sm font-medium text-gray-800 pb-3">
                          {data?.current_project}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-sm font-medium text-gray-500 pb-3 pr-4 lg:pr-8">
                          SFIA Level:
                        </td>
                        <td className="text-sm font-medium text-gray-800 pb-3">
                          {data?.sfia_level}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-sm font-medium text-gray-500 pb-3 pr-4 lg:pr-8">
                          Reported To:
                        </td>
                        <td className="text-sm font-medium text-gray-800 pb-3">
                          {data?.reported_to}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Additional Info</h3>
                </div>
                <div className="card-body pt-3.5 pb-1">
                  <table className="table-auto text-start">
                    <tbody>
                      <tr>
                        <td className="text-sm font-medium text-gray-500 pb-3.5 pr-4 lg:pr-6">
                          Discipline:
                        </td>
                        <td className="text-sm font-medium text-gray-800 pb-3">
                          {additional_info?.discipline}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-sm font-medium text-gray-500 pb-3.5 pr-4 lg:pr-6">
                          Specialism:
                        </td>
                        <td className="text-sm font-medium text-gray-800 pb-3">
                          {additional_info?.specialism}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-sm font-medium text-gray-500 pb-3.5 pr-4 lg:pr-6">
                          Employee Type:
                        </td>
                        <td className="text-sm font-medium text-gray-800 pb-3">
                          {additional_info?.employee_type}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-sm font-medium text-gray-500 pb-3.5 pr-4 lg:pr-6">
                          Location:
                        </td>
                        <td className="text-sm font-medium text-gray-800 pb-3">
                          {additional_info?.location}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-sm font-medium text-gray-500 pb-3.5 pr-4 lg:pr-6">
                          Cost Centre:
                        </td>
                        <td className="text-sm font-medium text-gray-800 pb-3">
                          {additional_info?.cost_centre}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="card-footer flex justify-center">
                  <a
                    className="btn btn-link"
                    href="html/demo1/network/user-table/store-clients.html"
                  >
                    All Attributes
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="flex flex-col gap-5 lg:gap-7.5">
              <div className="flex flex-col gap-5 lg:gap-7.5">
              <SkillCard skills={skills} />
                <div className="card" style={{zIndex:"-100"}}>
                  <div className="card-header ">
                    <h3 className="card-title">Projects History</h3>
                  </div>
                  <div className="card-body text-start">
                    <div className="flex flex-col">
                      <div className="flex items-start relative">
                        <div className="w-9 left-0 top-9 absolute bottom-0 translate-x-1/2 border-l border-l-gray-300"></div>
                        <div className="flex items-center justify-center shrink-0 rounded-full bg-gray-100 border border-gray-300 size-9 text-gray-600">
                          <i className="ki-filled ki-calendar-tick text-base"></i>
                        </div>
                        <div className="pl-2.5 mb-7 text-md grow">
                          <div className="flex flex-col pb-2.5">
                            <span className="text-sm font-medium text-gray-700">
                              Working in {current_project?.project_name}
                            </span>
                            <span className="text-xs font-medium text-gray-500">
                              {current_project?.start_date}
                            </span>
                          </div>
                          <div className="card shadow-none p-4">
                            <div className="flex flex-wrap gap-2.5">
                              <i className="ki-filled ki-code text-lg text-info"></i>
                              <div className="flex flex-col gap-5 grow">
                                <div className="flex flex-wrap items-center justify-between">
                                  <div className="flex flex-col gap-0.5">
                                    <span className="text-md font-semibold text-gray-900 cursor-pointer hover:text-primary mb-px">
                                      {current_project?.role}
                                    </span>
                                    <span className="text-xs font-medium text-gray-500">
                                      {current_project?.description}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex flex-wrap gap-7.5">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-2sm font-medium text-gray-500">
                                      Code:
                                    </span>
                                    <a
                                      className="text-2sm font-semibold text-primary"
                                      href="#"
                                    >
                                      {current_project?.code}
                                    </a>
                                  </div>
                                  <div className="flex items-center gap-1.5 lg:min-w-24 shrink-0 max-w-auto">
                                    <span className="text-2sm font-medium text-gray-500">
                                      Members:
                                    </span>
                                    <div className="flex -space-x-2">
                                      {/* Loop through each member and render their image */}
                                      {current_project.members
                                        .slice(0, 3)
                                        .map((member, index) => (
                                          <div key={index} className="flex">
                                            <img
                                              className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-7"
                                              src={member.image_url}
                                              alt={`Member ${index + 1}`}
                                            />
                                          </div>
                                        ))}

                                      {/* Display the additional members count */}
                                      <div className="flex">
                                        <span className="hover:z-5 relative inline-flex items-center justify-center shrink-0 rounded-full ring-1 font-semibold leading-none text-3xs size-7 text-primary-inverse ring-primary-light bg-primary">
                                          {
                                            current_project.members.find(
                                              (member) => member.placeholder
                                            ).placeholder
                                          }
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start relative">
                        <div className="w-9 left-0 top-9 absolute bottom-0 translate-x-1/2 border-l border-l-gray-300"></div>
                        <div className="flex items-center justify-center shrink-0 rounded-full bg-gray-100 border border-gray-300 size-9 text-gray-600">
                          <i className="ki-filled ki-calendar-tick text-base"></i>
                        </div>
                        <div className="pl-2.5 mb-7 text-md grow">
                          <div className="flex flex-col pb-2.5">
                            <span className="text-sm font-medium text-gray-700">
                              Worked in {previous_projects[0].project_name}
                            </span>
                            <span className="text-xs font-medium text-gray-500">
                              {previous_projects[0].start_date} <b>to</b>{" "}
                              {previous_projects[0].end_date}
                            </span>
                          </div>
                          <div className="card shadow-none p-4">
                            <div className="flex flex-wrap gap-2.5">
                              <i className="ki-filled ki-code text-lg text-info"></i>
                              <div className="flex flex-col gap-5 grow">
                                <div className="flex flex-wrap items-center justify-between">
                                  <div className="flex flex-col gap-0.5">
                                    <span className="text-md font-semibold text-gray-900 cursor-pointer hover:text-primary mb-px">
                                      {previous_projects[0].role}
                                    </span>
                                    <span className="text-xs font-medium text-gray-500">
                                      {previous_projects[0].description}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex flex-wrap gap-7.5">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-2sm font-medium text-gray-500">
                                      Code:
                                    </span>
                                    <a
                                      className="text-2sm font-semibold text-primary"
                                      href="#"
                                    >
                                      {previous_projects[0].code}
                                    </a>
                                  </div>
                                  <div className="flex items-center gap-1.5 lg:min-w-24 shrink-0 max-w-auto">
                                    <span className="text-2sm font-medium text-gray-500">
                                      Members:
                                    </span>
                                    <div className="flex -space-x-2">
                                      {/* Loop through each member and render their image */}
                                      {previous_projects[0].members
                                        .slice(0, 3)
                                        .map((member, index) => (
                                          <div key={index} className="flex">
                                            <img
                                              className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-7"
                                              src={member.image_url}
                                              alt={`Member ${index + 1}`}
                                            />
                                          </div>
                                        ))}

                                      {/* Display the additional members count */}
                                      <div className="flex">
                                        <span className="hover:z-5 relative inline-flex items-center justify-center shrink-0 rounded-full ring-1 font-semibold leading-none text-3xs size-7 text-primary-inverse ring-primary-light bg-primary">
                                          {
                                            previous_projects[0].members.find(
                                              (member) => member.placeholder
                                            ).placeholder
                                          }
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start relative">
                        <div className="w-9 left-0 top-9 absolute bottom-0 translate-x-1/2 border-l border-l-gray-300"></div>
                        <div className="flex items-center justify-center shrink-0 rounded-full bg-gray-100 border border-gray-300 size-9 text-gray-600">
                          <i className="ki-filled ki-entrance-left text-base"></i>
                        </div>
                        <div className="pl-2.5 mb-7 text-md grow">
                          <div className="flex flex-col">
                            <div className="text-sm font-medium text-gray-800">
                              Joined in {employment_history.company}
                            </div>
                            <span className="text-xs font-medium text-gray-500">
                              {employment_history.joined_date}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer justify-center">
                    <a
                      className="btn btn-link"
                      href="html/demo1/public-profile/activity.html"
                    >
                      All-time Activities
                    </a>
                  </div>
                </div>
               
              </div>
            </div>
          </div>
        </div>

        {/* end: grid */}
      </div>
    </div>
  );
};

export default OverviewPage;
