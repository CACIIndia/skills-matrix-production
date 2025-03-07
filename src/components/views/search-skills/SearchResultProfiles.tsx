"use client";
import { useAppContext } from "@/app/context/AppContext";
import SkillList from "@/components/search-skills/SkillList";
import React, { FC } from "react";
import defaultImage from "../../../../public/assets/media/avatars/default-image.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Table from "@/components/common/Table/Table";
import { BsMicrosoftTeams } from "react-icons/bs";
import { IoMailUnread } from "react-icons/io5";
import { SKILL_LEVELS } from "@/lib/constants/profile";
import classNames from "classnames";
import Link from "next/link";

interface Profile {
  id: string;
  name: string;
  role: string;
  location: string;
  image: string;
  email: string;
  userSkills: any[];
}

interface SearchFilters {
  searchQuery: string;
  jobFilter: string;
  locationFilter: string;
  resultsPerPage: number;
  currentPage: number;
}

interface SearchResultProfilesProps {
  profiles: Profile[];
  searchFilters: SearchFilters;
  onFilterChange: (filterName: string, value: string | number) => void;
  jobData: string[];
  resetSearchFilters: () => void;
  locationData: string[];
}

const SearchResultProfiles: FC<SearchResultProfilesProps> = ({
  profiles,
  searchFilters,
  onFilterChange,
  jobData,
  resetSearchFilters,
  locationData,
}) => {
  const {
    searchQuery,
    jobFilter,
    locationFilter,
    resultsPerPage,
    currentPage,
  } = searchFilters;
  const { selectedItems, removeAllSelectedSkills } = useAppContext();
  const router = useRouter();

  const filteredProfiles = profiles?.filter((profile) => {
    return (
      (searchQuery === "" ||
        profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile?.role?.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (jobFilter === "" || profile.role === jobFilter) &&
      (locationFilter === "" || profile.location === locationFilter) &&
      selectedItems.every((item) =>
        profile.userSkills.some((skill) => skill.skill.id === item.id),
      )
    );
  });

  const totalPages = Math.ceil(filteredProfiles.length / resultsPerPage);
  const paginatedProfiles = filteredProfiles.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage,
  );
  const renderCell = (key: string, value: string, rowData: Profile) => {
    switch (key) {
      case "name":
        return (
          <div className='flex items-center px-2'>
            <div
              onClick={() =>
                window.open(`/profile/overview/${rowData.id}`, "_blank")
              }
            >
              <Image
                src={rowData.image || defaultImage}
                alt={rowData.name}
                className='mr-4 cursor-pointer rounded-full'
                width={40}
                height={40}
              />
            </div>
            <div className='w-[150px]'>
              <h1
                className='cursor-pointer'
                onClick={() =>
                  window.open(`/profile/overview/${rowData.id}`, "_blank")
                }
              >
                {rowData.name}
              </h1>
              <div className='text-[10px] text-gray-600'>{rowData.email}</div>
            </div>

            <button
              onClick={() => {
                window.open(
                  `https://teams.microsoft.com/l/chat/0/0?users=${rowData.email}`,
                  "_blank",
                );
              }}
              className='ml-[8px] rounded-[4px] bg-purple-800 p-[4px] text-white transition duration-300 hover:bg-purple-700'
            >
              <div className='flex items-center justify-center space-x-1'>
                <div>
                  <BsMicrosoftTeams />
                </div>
              </div>
            </button>
            <button
              onClick={() => {
                window.location.href = `mailto:${rowData.email}`;
              }}
              className='ml-[8px] rounded-[4px] bg-blue-600 p-[4px] text-white transition duration-300 hover:bg-blue-700'
            >
              <div className='flex items-center justify-center space-x-1'>
                <div>
                  <IoMailUnread />
                </div>
              </div>
            </button>
          </div>
        );
      case "skill":
        return rowData?.userSkills.length > 0 ? (
          <div className='flex items-center'>
            <div className='flex h-full items-center text-nowrap'>
              {rowData.userSkills.slice(0, 2).map((skill: any, ind: number) => {
                const level = skill.level;
                const { name } = SKILL_LEVELS[level];
                return (
                  <div key={ind} className='mr-2'>
                    <span
                      className={classNames("badge badge-sm", {
                        "badge-outline": level === 0,
                        "badge-blue-basic": level === 1,
                        "badge-orange": level === 2,
                        "badge-green": level === 3,
                        "badge-blue": level === 4,
                      })}
                    >
                      {name} | {skill.skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
            <div>
              {rowData.userSkills.length > 2 && (
                <button
                  onClick={() =>
                    window.open(`/profile/overview/${rowData.id}?section=skills`, "_blank")
                  }
                  className='text-nowrap rounded-[4px] bg-rose-500 px-2 text-white transition duration-300 hover:bg-blue-600'
                >
                  +{rowData.userSkills.length - 2}
                </button>
              )}
            </div>
          </div>
        ) : (
          "No skills found!"
        );
      default:
        return value;
    }
  };

  return (
    <div className='w-full md:p-6 font-inter text-[#6D6E82]'>
      <div className='flex flex-wrap items-center justify-between gap-5 pb-2 lg:items-end'>
        <div className='flex flex-col justify-center gap-2'>
          <h1 className='text-xl font-bold leading-none text-gray-900'>
            Search
          </h1>
          <p className='text-[14px] lg:text-[16px] font-light'>
            Use the entry field below to search by name or job title. You can
            also use the skills side panel to apply further filtering{" "}
          </p>
        </div>
        {/*  <div className='flex items-center gap-2.5'>
          <button
            className='dropdown-toggle btn btn-sm btn-primary'
            onClick={() => router.push(`/advance-search`)}
          >
            <i className='ki-filled ki-magnifier text-2xs'></i>
            Advance Search
          </button>
        </div> */}
      </div>

      <div className='flex flex-col items-start md:flex-row  w-[100%] md:items-center gap-4 rounded-md bg-white'>
        <div className='flex h-10 w-full items-center gap-2 rounded-lg border border-gray-200 px-2'>
          <i className='ki-filled ki-magnifier'></i>
          <input
            type='text'
            placeholder='Search name or job title'
            className='h-full w-full border-none outline-none'
            value={searchQuery}
            onChange={(e) => onFilterChange("searchQuery", e.target.value)}
          />
        </div>

        {/* <select
          value={jobFilter}
          onChange={(e) => onFilterChange("jobFilter", e.target.value)}
          className='basis-[15%] rounded-md border border-gray-300 p-2 text-sm text-gray-700 focus:ring focus:ring-blue-300'
        >
          <option value='' className='hidden'>
            Job Title
          </option>
          <option value=''>-- Clear Selection --</option>
          {jobData.map((job) => (
            <option key={job} value={job}>
              {job}
            </option>
          ))}
        </select> */}

        <select
          value={locationFilter}
          onChange={(e) => onFilterChange("locationFilter", e.target.value)}
          className='basis-[15%] w-[100%] rounded-md border border-gray-300 p-2 text-sm text-gray-700 focus:ring focus:ring-blue-300'
        >
          <option value='' className='hidden'>
            Location
          </option>
          <option value=''>-- Clear Selection --</option>
          {locationData.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>

        <button
          onClick={() => resetSearchFilters()}
          className='btn btn-sm btn-danger text-nowrap rounded-md bg-red-500 px-6 py-2 text-white hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300'
        >
          <i className='ki-filled ki-trash'></i> Clear Search
        </button>
      </div>
      <div className='mt-3'>
        <p>
          {"Couldn't find what you were looking for? Try our"}{" "}
          <Link className='text-[#1B84FF] underline' href={"/advance-search"}>
            advanced search
          </Link>
        </p>
      </div>

      {selectedItems?.length > 0 && (
        <div className='mt-4'>
          <div className='lg:gap-7.5 flex flex-col gap-5'>
            <div className='card'>
              <div className='card-header flex items-center justify-between'>
                <h3 className='card-title'>Selected Skills</h3>
                <button
                  onClick={() => removeAllSelectedSkills()}
                  className='btn btn-sm btn-danger rounded-md bg-red-500 px-2 py-2 text-white hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300'
                >
                  <i className='ki-filled ki-trash'></i>
                </button>
              </div>

              <div className='card-body'>
                <div className='mb-2 flex flex-wrap gap-2.5'>
                  {selectedItems && selectedItems?.length > 0 ? (
                    <SkillList />
                  ) : (
                    <div className='text-center text-gray-600'>
                      <p>No skills found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className='pb-7.5 mt-4 flex flex-wrap items-center justify-between gap-5 lg:items-end'>
        <div className='flex flex-col justify-center gap-2'>
          <h1 className='text-xl font-semibold leading-none text-gray-900'>
            {/* <i className='ki-filled ki-users text-primary'></i> */} Search Results {/* (
            {filteredProfiles.length}) */}
          </h1>
        </div>
      </div>

      <Table
        headers={[
          {
            key: "name",
            label: "Name",
          },
          {
            key: "skill",
            label: "Skills",
          },
          {
            key: "role",
            label: "Role",
          },
          {
            key: "location",
            label: "Location",
          },
        ]}
        isSearchable={true}
        addNewData={false}
        data={filteredProfiles}
        isPaginated={true}
        noDataMessage='No Profiles found'
        renderCell={renderCell}
      />
    </div>
  );
};

export default SearchResultProfiles;
