"use client";
import React, { useEffect, useRef, useState, Suspense } from 'react';
import SearchResultProfiles from '@/components/views/search-skills/SearchResultProfiles';
import useGetUsers from '@/lib/hooks/useGetUsers';
import { useAppContext } from '../context/AppContext';

function SearchSkills() {
  const {setSelectedItems } = useAppContext();
  const [jobTitleData, setJobTitleData] = useState<any[]>([]);
  const [locationData,setLocationData] = useState([]);
  const { data: users }  = useGetUsers();

  const [searchFilters, setSearchFilters] = useState({
    searchQuery: '',
    jobFilter: '',
    locationFilter: '',
    resultsPerPage: 5,
    currentPage: 1,
  });

  useEffect(() => {
    
    if (users) {
      const jobTitles = Array.from(new Set(users
        .map((user: any) => user.role)
        .filter((role: any) => !!role)));
      const locations: any = Array.from(new Set(users
        .map((user: any) => user.location)
        .filter((location: any) => !!location)));
      setJobTitleData(jobTitles);
      setLocationData(locations);
    }
  
  }, [users]); 


  useEffect(()=>{

    return () => {
      console.log("Component is unmounting...");
      setSelectedItems([]);
    };
  },[])

  

  

  const resetSearchFilters = () => setSearchFilters({ searchQuery: '', jobFilter: '', locationFilter: '', resultsPerPage: 5, currentPage: 1 });
 
 

  const handleFilterChange = (filterName: string, value: string | number) => {
    setSearchFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  return (
    <div className=" ">
      <div className="container-fixed flex gap-4">
        <Suspense fallback={<div>Loading...</div>}>
          <SearchResultProfiles profiles={users || []} searchFilters={searchFilters} onFilterChange={handleFilterChange} resetSearchFilters={resetSearchFilters}
           jobData={jobTitleData || []} locationData={locationData || []} />
        </Suspense>
      </div>
    </div>
  );
}

export default SearchSkills;

