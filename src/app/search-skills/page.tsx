"use client";
import React, { useEffect, useRef, useState } from 'react';
import SearchResultProfiles from '@/components/views/search-skills/SearchResultProfiles';
import useGetUsers from '@/lib/hooks/useGetUsers';
import { useAppContext } from '../context/AppContext';

function SearchSkills() {
  const {setSelectedItems } = useAppContext();
  const [jobTitleData,setJobTitleData] = useState([]);
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
      const jobTitles = users
        .map((user: any) => user.role)
        .filter((role: any) => !!role);
      const locations = users
        .map((user: any) => user.location)
        .filter((location: any) => !!location);
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
  const [profiles, setProfiles] = useState([
    { id: 1, name: "Magendran VA", jobTitle: "Engineer I", location: "Bristol", image: "/assets/media/avatars/default-image.png" },
    { id: 2, name: "Chandana Siddula", jobTitle: "Technical Consultant", location: "London", image: "/assets/media/avatars/default-image.png" },
    { id: 3, name: "Narmada nakedi", jobTitle: "Principal Technical Consultant", location: "Manchester", image: "/assets/media/avatars/default-image.png" },
    { id: 4, name: "Raghavendra", jobTitle: "Engineer I", location: "Liverpool", image: "/assets/media/avatars/default-image.png" },
    { id: 5, name: "Anusha", jobTitle: "Engineer I", location: "Edinburgh", image: "/assets/media/avatars/default-image.png" },
    { id: 6, name: "Manoj thakur", jobTitle: "Engineer I", location: "Glasgow", image: "/assets/media/avatars/default-image.png" },
    { id: 7, name: "Karthik", jobTitle: "Technical Consultant", location: "Cardiff", image: "/assets/media/avatars/default-image.png" },
    { id: 8, name: "Sathvik Karnam", jobTitle: "Principal Technical Consultant", location: "Newcastle", image: "/assets/media/avatars/default-image.png" },
    { id: 9, name: "Revanti", jobTitle: "Engineer I", location: "Birmingham", image: "/assets/media/avatars/default-image.png" },
    { id: 10, name: "Magendran Sridhar", jobTitle: "Engineer I", location: "Leeds", image: "/assets/media/avatars/default-image.png" },
  ]);
 

  const handleFilterChange = (filterName: string, value: string | number) => {
    setSearchFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  return (
    <div className=" ">
      <div className="container-fixed flex gap-4">
        <SearchResultProfiles profiles={users || []} searchFilters={searchFilters} onFilterChange={handleFilterChange} resetSearchFilters={resetSearchFilters}
         jobData={jobTitleData || []} locationData={locationData || []} />
      </div>
    </div>
  );
}

export default SearchSkills;
