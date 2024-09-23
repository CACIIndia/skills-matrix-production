// pages/dashboard.tsx

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";

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

interface UserDetails {
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

const PublicProfile = () => {
  const [data, setData] = useState<UserDetails | null>(null);
  const [additional_info, setAdditional] = useState<AdditionalInfo | null>(
    null
  );
  const params = useParams();
 
  const [skills, setSkills] = useState([]);
  const [contributors, setContributor] = useState([]);
  const [current_project, setCurrentProjects] = useState({});
  const [previous_projects, setPreviousProjects] = useState([]);
  const [employment_history ,setEmploymentHistory] = useState([]);

  console.log(additional_info, "additional_info");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

  useEffect(() => {
 
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/userdetails/${1}`); // Your API endpoint
   
  
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        console.log(result,"resultdata");
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
      <div className="bg-center bg-cover bg-no-repeat hero-bg ">
        {/* Container */}
        <div className="container-fixed">
          <div className="flex flex-col items-center gap-2 lg:gap-3.5 py-4 lg:pt-5 lg:pb-10">
            {/* Profile Image */}
            <Image
              className="rounded-full border-3 border-success size-[100px] shrink-0"
              src={data?.image}
              alt="Jenny Klabber"
              width={100}
              height={100}
            />
            {/* Name and Icon */}
            <div className="flex items-center gap-1.5">
              <div className="text-lg leading-5 font-semibold text-gray-900">
                {data?.name}
              </div>
              <svg
                className="text-primary"
                fill="none"
                height="16"
                width="15"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.5425 6.89749L13.5 5.83999C13.4273 5.76877 13.3699 5.6835 13.3312 5.58937C13.2925 5.49525 13.2734 5.39424 13.275 5.29249V3.79249C13.274 3.58699 13.2324 3.38371 13.1527 3.19432C13.0729 3.00494 12.9565 2.83318 12.8101 2.68892C12.6638 2.54466 12.4904 2.43073 12.2998 2.35369C12.1093 2.27665 11.9055 2.23801 11.7 2.23999H10.2C10.0982 2.24159 9.99722 2.22247 9.9031 2.18378C9.80898 2.1451 9.72371 2.08767 9.65249 2.01499L8.60249 0.957487C8.30998 0.665289 7.91344 0.50116 7.49999 0.50116C7.08654 0.50116 6.68999 0.665289 6.39749 0.957487L5.33999 1.99999C5.26876 2.07267 5.1835 2.1301 5.08937 2.16879C4.99525 2.20747 4.89424 2.22659 4.79249 2.22499H3.29249C3.08699 2.22597 2.88371 2.26754 2.69432 2.34731C2.50494 2.42709 2.33318 2.54349 2.18892 2.68985C2.04466 2.8362 1.93073 3.00961 1.85369 3.20013C1.77665 3.39064 1.73801 3.5945 1.73999 3.79999V5.29999C1.74159 5.40174 1.72247 5.50275 1.68378 5.59687C1.6451 5.691 1.58767 5.77627 1.51499 5.84749L0.457487 6.89749C0.165289 7.19 0.00115967 7.58654 0.00115967 7.99999C0.00115967 8.41344 0.165289 8.80998 0.457487 9.10249L1.49999 10.16C1.57267 10.2312 1.6301 10.3165 1.66878 10.4106C1.70747 10.5047 1.72659 10.6057 1.72499 10.7075V12.2075C1.72597 12.413 1.76754 12.6163 1.84731 12.8056C1.92709 12.995 2.04349 13.1668 2.18985 13.3111C2.3362 13.4553 2.50961 13.5692 2.70013 13.6463C2.89064 13.7233 3.0945 13.762 3.29999 13.76H4.79999C4.90174 13.7584 5.00275 13.7775 5.09687 13.8162C5.191 13.8549 5.27627 13.9123 5.34749 13.985L6.40499 15.0425C6.69749 15.3347 7.09404 15.4988 7.50749 15.4988C7.92094 15.4988 8.31748 15.3347 8.60999 15.0425L9.65999 14C9.73121 13.9273 9.81647 13.8699 9.9106 13.8312C10.0047 13.7925 10.1057 13.7734 10.2075 13.775H11.7075C12.1212 13.775 12.518 13.6106 12.8106 13.3181C13.1031 13.0255 13.2675 12.6287 13.2675 12.215V10.715C13.2659 10.6132 13.285 10.5122 13.3237 10.4181C13.3624 10.324 13.4198 10.2387 13.4925 10.1675L14.55 9.10999C14.6953 8.96452 14.8104 8.79176 14.8887 8.60164C14.9671 8.41152 15.007 8.20779 15.0063 8.00218C15.0056 7.79656 14.9643 7.59311 14.8847 7.40353C14.8051 7.21394 14.6888 7.04197 14.5425 6.89749ZM10.635 6.64999L6.95249 10.25C6.90055 10.3026 6.83864 10.3443 6.77038 10.3726C6.70212 10.4009 6.62889 10.4153 6.55499 10.415C6.48062 10.4139 6.40719 10.3982 6.33896 10.3685C6.27073 10.3389 6.20905 10.2961 6.15749 10.2425L4.37999 8.44249C4.32532 8.39044 4.28169 8.32793 4.25169 8.25867C4.22169 8.18941 4.20593 8.11482 4.20536 8.03934C4.20479 7.96387 4.21941 7.88905 4.24836 7.81934C4.27731 7.74964 4.31999 7.68647 4.37387 7.63361C4.42774 7.58074 4.4917 7.53926 4.56194 7.51163C4.63218 7.484 4.70726 7.47079 4.78271 7.47278C4.85816 7.47478 4.93244 7.49194 5.00112 7.52324C5.0698 7.55454 5.13148 7.59935 5.18249 7.65499L6.56249 9.05749L9.84749 5.84749C9.95296 5.74215 10.0959 5.68298 10.245 5.68298C10.394 5.68298 10.537 5.74215 10.6425 5.84749C10.6953 5.90034 10.737 5.96318 10.7653 6.03234C10.7935 6.1015 10.8077 6.1756 10.807 6.25031C10.8063 6.32502 10.7908 6.39884 10.7612 6.46746C10.7317 6.53608 10.6888 6.59813 10.635 6.64999Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <div className="flex flex-wrap justify-center gap-1 lg:gap-4.5 text-sm">
              <div className="flex gap-1.25 items-center">
              <i className="ki-filled ki-geolocation text-gray-500 text-sm" style={{ zIndex: -10 }}></i>

                <span className="text-gray-600">{data?.role}</span>
              </div>
              <div className="flex gap-1.25 items-center">
                <i style={{ zIndex: -10}} className="ki-filled ki-geolocation text-gray-500 text-sm "></i>
                <span className="text-gray-600">{data?.location}</span>
              </div>
              <div className="flex gap-1.25 items-center">
                <i style={{ zIndex: -10}} className="ki-filled ki-sms text-gray-500 text-sm"></i>
                <a
                  className="text-gray-600 hover:text-primary"
                  href="mailto:jenny@kteam.com"
                >
                  {data?.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fixed ">
        <div className="flex flex-nowrap items-center lg:items-end justify-between border-b border-b-gray-200 dark:border-b-coal-100 gap-6 mb-5 lg:mb-10" >
          <div className="grid" style={{ zIndex: -10 }}>
            <div className="scrollable-x-auto">
              <div className="menu gap-3" data-menu="true">
                <div
                  className="menu-item border-b-2 border-b-transparent menu-item-active:border-b-primary menu-item-here:border-b-primary here"
                  data-menu-item-placement="bottom-start"
                  data-menu-item-toggle="dropdown"
                  data-menu-item-trigger="click"
                >
                  <div
                    className="menu-link gap-1.5 pb-2 lg:pb-4 px-2"
                    tabIndex={0}
                  >
                    <span className="menu-title text-nowrap font-medium text-sm text-gray-700 menu-item-active:text-primary menu-item-active:font-semibold menu-item-here:text-primary menu-item-here:font-semibold menu-item-show:text-primary menu-link-hover:text-primary" >
                      Overview
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center lg:pb-4 gap-2.5">
            <button className="dropdown-toggle btn btn-sm btn-primary">
              <i  className="ki-filled ki-users"></i>
              Connect
            </button>
            <button className="btn btn-sm btn-icon btn-light" style={{ zIndex: -10 }}>
              <i  className="ki-filled ki-messages" ></i>
            </button>
            <div
              className="dropdown"
              data-dropdown="true"
              data-dropdown-placement="bottom-end"
              data-dropdown-trigger="click"
            >
              <button className="dropdown-toggle btn btn-sm btn-icon btn-light" style={{ zIndex: -10 }}>
                <i className="ki-filled ki-dots-vertical"></i>
              </button>
              <div className="dropdown-content menu-default w-full max-w-[220px]">
                <div className="menu-item" data-dropdown-dismiss="true">
                  <button
                    className="menu-link"
                    data-modal-toggle="#share_profile_modal"
                  >
                    <span className="menu-icon">
                      <i className="ki-filled ki-coffee"></i>
                    </span>
                    <span className="menu-title">Share Profile</span>
                  </button>
                </div>
                <div className="menu-item" data-dropdown-dismiss="true">
                  <a
                    className="menu-link"
                    data-modal-toggle="#give_award_modal"
                    href="#"
                  >
                    <span className="menu-icon">
                      <i className="ki-filled ki-award"></i>
                    </span>
                    <span className="menu-title">Give Award</span>
                  </a>
                </div>
                <div className="menu-item" data-dropdown-dismiss="true">
                  <button className="menu-link">
                    <span className="menu-icon">
                      <i className="ki-filled ki-chart-line"></i>
                    </span>
                    <span className="menu-title">Stay Updated</span>
                    <label className="switch switch-sm">
                      <input name="check" type="checkbox" value="1" />
                    </label>
                  </button>
                </div>
                <div className="menu-item" data-dropdown-dismiss="true">
                  <button
                    className="menu-link"
                    data-modal-toggle="#report_user_modal"
                  >
                    <span className="menu-icon">
                      <i className="ki-filled ki-information-2"></i>
                    </span>
                    <span className="menu-title">Report User</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Skills</h3>
                  </div>
                  <div className="card-body">
                    <div className="flex flex-wrap gap-2.5 mb-2">
                      <div className="flex gap-3">
                        {skills.map((skill, index) => (
                          <span
                            key={index}
                            className="badge badge-sm badge-gray-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
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

export default PublicProfile;
