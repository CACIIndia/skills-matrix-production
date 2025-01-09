"use client";
import { useAppContext } from "@/app/context/AppContext";
import SkillList from "@/components/search-skills/SkillList";
import React, { FC } from "react";
import defaultImage from "../../../../public/assets/media/avatars/default-image.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DisplayName from "@/components/reusable-components/DisplayName";

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
      <div className='mb-4 flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Profiles</h1>
        <button onClick={()=> router.push(`/advance-search`)} className='rounded bg-blue-500 px-4 py-2 text-white'>
          Advanced Search
        </button>
      </div>

      <div className='mb-6 flex gap-1'>
        <input
          type='text'
          placeholder='Search profiles...'
          className='flex-grow rounded border p-2'
          value={searchQuery}
          onChange={(e) => onFilterChange("searchQuery", e.target.value)}
        />

        <select
          className='rounded border p-2'
          value={jobFilter}
          onChange={(e) => onFilterChange("jobFilter", e.target.value)}
        >
          <option value=''>Job Title</option>
          {jobData.map((job) => (
            <option key={job} value={job}>
              {job}
            </option>
          ))}
        </select>
        <select
          className='rounded border p-2'
          value={locationFilter}
          onChange={(e) => onFilterChange("locationFilter", e.target.value)}
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
          className='rounded border bg-red-500 px-4 py-2 text-white'
        >
          Clear
        </button>
      </div>
      {selectedItems?.length > 0 && (
        <div>
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

      <div>
        <div className='mb-2 mt-4'>
          {" "}
          <h1 className='text-4xl font-bold'>
            Search Results({filteredProfiles.length})
          </h1>
        </div>
        <div className='mb-4'>
          <label className='mr-2'>Results per page:</label>
          <select
            className='rounded border p-2'
            value={resultsPerPage}
            onChange={(e) => {
              onFilterChange("resultsPerPage", parseInt(e.target.value));
              onFilterChange("currentPage", 1); // Reset to the first page
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
        </div>
      </div>

      <table className='min-w-full'>
        <thead>
          <tr className='bg-gray-100'>
            <th className='px-4 py-2 text-left'>Profile</th>
            <th className='px-4 py-2 text-left'>Job Title</th>
            <th className='px-4 py-2 text-left'>Location</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProfiles.length > 0 ? (
            paginatedProfiles.map((profile, index) => (
              <tr key={index} className='hover:bg-gray-50'>
                <td
                  className='flex items-center border-b border-gray-300 px-4 py-2'
                  onClick={() => {
                    router.push(`/profile/overview/${profile.id}`);
                  }}
                >
                  <Image
                    src={profile.image || defaultImage}
                    alt={profile.name}
                    className='mr-4 h-10 w-10 rounded-full'
                    width={40}
                    height={40}
                  />
                  <DisplayName name={profile.name} isClickable={true} />
                </td>
                <td className='border-b border-gray-300 px-4 py-2'>
                  {profile.role}
                </td>
                <td className='border-b border-gray-300 px-4 py-2'>
                  {profile.location}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={3}
                className='border border-gray-300 py-4 text-center'
              >
                No profiles found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className='mt-4 flex justify-center'>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`mx-1 rounded px-3 py-1 ${
                searchFilters.currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => onFilterChange("currentPage", index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResultProfiles;
