"use client";
import { useEffect, useState, useRef } from "react";
import { useAppContext } from "../context/AppContext";
import FilterIcon from "@/components/custom-icons/FilterIcon";
import MenuAccordion from "@/components/common/sidebar/Menuaccordion";
import useGetUsers from "@/lib/hooks/useGetUsers";
import SearchResultProfiles from "@/components/views/search-skills/SearchResultProfiles";

export default function SearchPage() {
  const {
    searchQuery,
    setSearchQuery,
    toggleSelectedItem,
    categorySkills,
    setSelectedItems,
  } = useAppContext();
  const [jobTitleData, setJobTitleData] = useState<any[]>([]);
  const [locationData, setLocationData] = useState([]);
  const { data: users } = useGetUsers();
  const [searchFilters, setSearchFilters] = useState({
    searchQuery: "",
    jobFilter: "",
    locationFilter: "",
    resultsPerPage: 5,
    currentPage: 1,
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleItemClick = (skill: any) => {
    toggleSelectedItem(skill);
  };

  useEffect(() => {
    if (users) {
      const jobTitles = Array.from(
        new Set(
          users.map((user: any) => user.role).filter((role: any) => !!role),
        ),
      );
      const locations: any = Array.from(
        new Set(
          users
            .map((user: any) => user.location)
            .filter((location: any) => !!location),
        ),
      );
      setJobTitleData(jobTitles);
      setLocationData(locations);
    }
  }, [users]);

  useEffect(() => {
    return () => {
      setSelectedItems([]);
    };
  }, []);

  const resetSearchFilters = () =>
    setSearchFilters({
      searchQuery: "",
      jobFilter: "",
      locationFilter: "",
      resultsPerPage: 5,
      currentPage: 1,
    });

  const handleFilterChange = (filterName: string, value: string | number) => {
    setSearchFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <div className='h-[calc(100vh-56px)] w-full overflow-y-auto pt-[16px]'>
      <div className='flex h-[100%] w-[100%] flex-col lg:flex-row'>
        {/* Sidebar for Filters */}
        <div
          ref={menuRef}
          className={`fixed left-0 top-0 z-30 w-[50%] h-[100%] transform overflow-y-auto bg-white shadow-lg transition-transform
            duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} flex flex-col gap-y-4 lg:relative 
            lg:w-[15%] lg:translate-x-0 lg:shadow-none`}
        >
          <span className='ml-[10px] mt-[10px] lg:mt-0 flex items-center gap-x-2 font-inter font-semibold text-[#6D6E82]'>
            <FilterIcon />
            Filter by skills
          </span>
          <MenuAccordion
            handleItemClick={handleItemClick}
            data={categorySkills || []}
          />
        </div>

        {/* Dimming background when mobile menu is open */}
        {isMenuOpen && (
          <div
            className='fixed inset-0 z-20 bg-black opacity-50 lg:hidden'
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Mobile filter button */}
        <div className='pl-[30px] md:pl-14 lg:hidden'>
          <button
            onClick={() => setIsMenuOpen(true)}
            className='flex items-center text-[14px] lg:text-[16px] gap-x-2 rounded-[8px] border border-gray-600 px-2 py-2 font-inter font-semibold text-[#6D6E82]'
          >
            <FilterIcon />
            Filter by skills
          </button>
        </div>

        {/* Main Content */}
        <div className='w-[100%] h-[100%] overflow-y-auto px-[30px] md:px-[40px] lg:w-[85%] mt-[16px] md:mt-0'>
          <SearchResultProfiles
            profiles={users || []}
            searchFilters={searchFilters}
            onFilterChange={handleFilterChange}
            resetSearchFilters={resetSearchFilters}
            jobData={jobTitleData || []}
            locationData={locationData || []}
          />
        </div>
      </div>
    </div>
  );
}
