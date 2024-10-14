"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";

import Sidebar from "../../components/common/Sidebar";
import Header from "@/components/common/Header/index";

// @TODO This component should be refactored and simplified
export default function MasterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoverClass, setHoverClass] = useState("");

  const handleButtonClick = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (isExpanded) {
      const timer = setTimeout(() => {
        setHoverClass("hover:w-[20%]");
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setHoverClass("");
    }
  }, [isExpanded]);

  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={client}>
      {/* Sidebar */}
      <div
        style={{ zIndex: 1 ,isolation:"inherit"}}
        id='SideBar'
        className={`fixed hidden  h-[100%] bg-white text-white transition-all duration-300 lg:flex ${
          isExpanded ? `w-[10%] ${hoverClass}` : "w-[20%]"
        } `}
      >
        <Sidebar isExpanded={isExpanded} />
        {/* Adjust Button (inside sidebar but positioned absolutely) */}
        <button
          id='adjustButton'
          onClick={handleButtonClick}
          className='btn btn-icon btn-icon-md bg-light absolute -right-2 top-3 z-20 size-[30px] rounded-lg border border-gray-200 text-gray-500 hover:text-gray-700'
          style={{ backgroundColor: "#ffffff" }}
        >
          {isExpanded ? (
            <i className='ki-filled ki-black-right-line rotate-180 text-gray-500 transition-all duration-1000'></i>
          ) : (
            <i className='ki-filled ki-black-left-line rotate-180 text-gray-500 transition-all duration-1000'></i>
          )}
        </button>
      </div>

      {/* Content Div */}
      <div
        id='contentDiv'
        className={`fixed flex h-[100px] w-[100%] grow bg-white text-center transition-all duration-300 ${
          isExpanded ? "lg:ml-[10%] lg:w-[90%]" : "lg:ml-[20%] lg:w-[80%]"
        }`}
        style={{zIndex:0}}
      > 
      
        <Header />
      </div>

      {/* Body Div */}
      <div
        id='bodyDiv'
        // style={{ zIndex: -100 }}
        className={`flex h-auto min-h-[100vh] grow border-b-2 pt-[100px] text-center transition-all duration-300 ${
          isExpanded ? "lg:ml-[10%] lg:w-[90%]" : "lg:ml-[20%] lg:w-[80%]"
        }`}
      >
        {children}
      </div>
    </QueryClientProvider>
  );
}
