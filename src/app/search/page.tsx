
"use client";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";


export default function SearchPage() {
  const { searchQuery, setSearchQuery } = useAppContext();




  useEffect(() => {
    return () => {
        localStorage.removeItem("searchQuery");
    }
  },[])


  return (
    <div className="h-full w-full">
      <div className="flex justify-center items-center h-full w-full">
        <h1 className="text-2xl font-bold">{searchQuery}</h1>
      </div>
    </div>
  );
}
