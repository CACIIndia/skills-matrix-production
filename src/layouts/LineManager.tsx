"use client";
import { useAppContext } from "@/app/context/AppContext";
import Menu from "@/components/common/Menu";
import { LINE_MANAGER_MENU_ITEMS } from "@/lib/constants/header";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";


export default function LineManagerLayout({ children }: { children: React.ReactNode }) {
  const {profile} = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (profile && profile.isLineManager === false) {
      router.replace("/profile/overview");
    }
  
    return () => {
      if (profile && profile.isLineManager === false) {
        toast(
          (t) => (
            <div className="flex items-center gap-2">
             
             <span className="text-yellow-900">⚠️ Warning: You don&apos;t have access!</span>
              
            </div>
          ),
          {
            duration: 1000,
            style: {
              border: "1px solid #facc15",
              backgroundColor: "#fef3c7",
              color: "#92400e",
            },
          }
        );
      }
      
    };
  }, [profile, router]);
  
  return (
    <>
      <div style={{marginTop:"55px"}} className="flex flex-nowrap items-center lg:items-end justify-between border-b border-b-gray-200 dark:border-b-coal-100 gap-6 mb-5 lg:mb-10">
          <div className="grid container-fixed">
            <div className="scrollable-x-auto">
              <Menu items={LINE_MANAGER_MENU_ITEMS} />
            </div>
          </div>
        </div>
      {children}
    </>
  );
}
