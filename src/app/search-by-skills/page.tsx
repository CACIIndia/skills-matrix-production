"use client";
import { useEffect, useState, useRef } from "react";
import { useAppContext } from "../context/AppContext";
import FilterIcon from "@/components/custom-icons/FilterIcon";
import MenuAccordion from "@/components/common/sidebar/Menuaccordion";
import useGetUsers from "@/lib/hooks/useGetUsers";
import SearchResultProfiles from "@/components/views/search-skills/SearchResultProfiles";
import HeaderSearch from "@/components/common/Header/HeaderSearch";
import { RxCross1 } from "react-icons/rx";

export default function SearchPage() {
  const {
    toggleSelectedItem,
    categorySkills,
    setSelectedItems,
    selectedItems,
    removeAllSelectedSkills,
  } = useAppContext();
  const [jobTitleData, setJobTitleData] = useState<any[]>([]);
  const [locationData, setLocationData] = useState([]);
  const { data: users, isLoading } = useGetUsers();
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

  const applyFiltersClickHandler = () => {
    if (selectedItems?.length > 0) {
      setIsMenuOpen(false);
    }
  };

  return (
    <div className='h-[calc(100vh-56px)] w-full overflow-y-auto'>
      <div className='flex h-[100%] w-[100%] flex-col lg:flex-row'>
        {/* Sidebar for Filters */}
        <div
          ref={menuRef}
          className={`fixed left-0 top-14 z-30 h-[calc(100%-56px)] w-[100%] bg-white shadow-lg duration-300 ease-in-out lg:top-0 lg:h-[100%] ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} flex flex-col gap-y-4 lg:relative lg:w-[15%] lg:translate-x-0 lg:shadow-none`}
        >
          <div className='flex h-[100%] flex-col space-y-2 overflow-y-auto pb-[10px]'>
            <div className='sticky top-0 z-30 flex flex-col gap-y-2 bg-white py-[16px] lg:py-0 lg:pb-[10px] lg:pt-[16px]'>
              <div className='flex items-center justify-between px-[10px]'>
                <span className='flex items-center gap-x-2 pl-[10px] font-inter font-semibold text-[#6D6E82] lg:mt-0'>
                  <FilterIcon />
                  Filter by skills
                </span>
                <div
                  onClick={() => setIsMenuOpen(false)}
                  className='pr-[16px] lg:hidden'
                >
                  <RxCross1 />
                </div>
              </div>
              <div className='flex flex-col gap-y-2 lg:hidden'>
                <div className='flex items-center justify-between px-[10px]'>
                  <button
                    onClick={removeAllSelectedSkills}
                    className='text-mob-nav-link-active-text underline'
                  >
                    clear all filters
                  </button>
                  <button
                    onClick={applyFiltersClickHandler}
                    className='rounded bg-mob-nav-link-active-text px-4 py-2 text-white'
                  >
                    Apply filters
                  </button>
                </div>
                <div className='flex flex-wrap gap-x-2 gap-y-2 px-[10px]'>
                  {selectedItems?.map((item) => (
                    <div
                      key={item.id}
                      className='rounded border bg-gray-100 p-2 text-xs text-primary-text'
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <MenuAccordion
              handleItemClick={handleItemClick}
              isLoading={isLoading}
              data={categorySkills || []}
            />
          </div>
        </div>

        {/* Dimming background when mobile menu is open */}
        {isMenuOpen && (
          <div
            className='fixed inset-0 z-20 bg-black opacity-50 lg:hidden'
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Mobile filter button */}
        <div className='relative p-2 md:hidden'>
          <HeaderSearch />
        </div>
        <div className='mt-[10px] pl-[30px] md:pl-14 lg:hidden'>
          <button
            onClick={() => setIsMenuOpen(true)}
            className='flex items-center gap-x-2 text-[20px] font-semibold text-primary-text'
          >
            <FilterIcon />
            Filter by skills
          </button>
        </div>

        {/* Main Content */}
        <div className='mt-[16px] h-[100%] w-[100%] lg:overflow-y-auto px-[30px] md:mt-0 md:px-[40px] lg:w-[85%]'>
          <SearchResultProfiles
            profiles={users || []}
            isLoading={isLoading}
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
