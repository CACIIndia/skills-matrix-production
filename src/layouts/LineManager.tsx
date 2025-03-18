"use client";
import { useAppContext } from "@/app/context/AppContext";
import HeaderSearch from "@/components/common/Header/HeaderSearch";
import Menu from "@/components/common/Menu";
import { LINE_MANAGER_MENU_ITEMS } from "@/lib/constants/header";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function LineManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (profile && profile.isLineManager === false) {
      router.replace("/profile/overview");
    }

    return () => {
      if (profile && profile.isLineManager === false) {
        toast(
          (t) => (
            <div className='flex items-center gap-2'>
              <span className='text-yellow-900'>
                ⚠️ Warning: You don&apos;t have access!
              </span>
            </div>
          ),
          {
            duration: 1000,
            style: {
              border: "1px solid #facc15",
              backgroundColor: "#fef3c7",
              color: "#92400e",
            },
          },
        );
      }
    };
  }, [profile, router]);

  return (
    <>
      <div className="sticky top-14 bg-white">
        <div className='p-2 md:hidden'>
          <HeaderSearch />
        </div>
        <div className='banner'></div>
        <div className='mb-5 mt-5'>
          <div className='container-fixed grid'>
            <div className='scrollable-x-auto'>
              <Menu items={LINE_MANAGER_MENU_ITEMS} />
            </div>
          </div>
        </div>
      </div>
      {children}
    </>
  );
}
