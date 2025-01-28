"use client";
import { useAppContext } from "@/app/context/AppContext";
import SkillList from "@/components/search-skills/SkillList";
import React, { FC } from "react";
import defaultImage from "../../../../public/assets/media/avatars/default-image.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DisplayName from "@/components/reusable-components/DisplayName";
import Table from "@/components/common/Table/Table";

interface Profile {
  id: string;
  name: string;
  role: string;
  location: string;
  image: string;
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
  const { selectedItems } = useAppContext();
  const router = useRouter();
  console.log(selectedItems, "selectedItemsssssss");

  const filteredProfiles = profiles?.filter((profile) => {
    return (
      (searchQuery === "" ||
        profile.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
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

  return (
    <div className='w-full p-6'>
      <div className='pb-7.5 flex flex-wrap items-center justify-between gap-5 lg:items-end'>
        <div className='flex flex-col justify-center gap-2'>
          <h1 className='text-xl font-semibold leading-none text-gray-900'>
            <i className='ki-filled ki-users text-primary'></i> Profiles
          </h1>
        </div>
        <div className='flex items-center gap-2.5'>
          <button className='dropdown-toggle btn btn-sm btn-primary' onClick={()=> router.push(`/advance-search`)} >
            <i className='ki-filled ki-magnifier text-2xs'></i>
            Advance Search
          </button>
        </div>
      </div>

      <div className='flex w-[100%] items-center gap-4 rounded-md bg-white'>
        <input
          type='text'
          placeholder='Search profiles...'
          className='flex-grow rounded-md border border-gray-300 p-2 text-sm focus:ring focus:ring-blue-300'
          value={searchQuery}
          onChange={(e) => onFilterChange("searchQuery", e.target.value)}
        />

        <select
          value={jobFilter}
          onChange={(e) => onFilterChange("jobFilter", e.target.value)}
          className='basis-[15%] rounded-md border border-gray-300 p-2 text-sm text-gray-700 focus:ring focus:ring-blue-300'
        >
          <option value=''>Job Title</option>
          {jobData.map((job) => (
            <option key={job} value={job}>
              {job}
            </option>
          ))}
        </select>

        <select
          value={locationFilter}
          onChange={(e) => onFilterChange("locationFilter", e.target.value)}
          className='basis-[15%] rounded-md border border-gray-300 p-2 text-sm text-gray-700 focus:ring focus:ring-blue-300'
        >
          <option value=''>Location</option>
          {locationData.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>

        <button
          onClick={() => resetSearchFilters()}
          className='btn btn-sm btn-danger rounded-md bg-red-500 px-6 py-2 text-white hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300'
        >
          <i className='ki-filled ki-trash'></i> Clear Search
        </button>
      </div>

      {selectedItems?.length > 0 && (
        <div className='mt-4'>
          <div className='lg:gap-7.5 flex flex-col gap-5'>
            <div className='card'>
              <div className='card-header flex items-center justify-between'>
                <h3 className='card-title'>Selected Skills</h3>
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
            <i className='ki-filled ki-users text-primary'></i> Search Results
            ({filteredProfiles.length})
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
        isFromSearchProfile={true}
      />
    </div>
  );
};

export default SearchResultProfiles;
