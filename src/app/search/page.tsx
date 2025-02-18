
"use client";
import { useEffect, useState } from "react";


export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
    return () => {

        localStorage.removeItem("searchQuery");
    }

  },[])


  return (
    <div className="h-full w-full">
      <div className="flex h-full w-full flex-col">
        <input
          type="text"
          className="h-12 w-full rounded-lg border-2 p-4"
          placeholder="Search by name, email, or skills"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
}
