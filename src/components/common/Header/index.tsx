"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import HeaderMenu from "@/components/common/Header/Menu";
import { useAppContext } from "@/app/context/AppContext";
import HeaderSearch from "./HeaderSearch";
import NavLink from "../Navlink";
import CaciLogo from "../CaciLogo";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import NavLinkMobile from "./NavLinkMobile";

type HeaderProps = {
  onClick: () => void;
  mobileSideBarClick: () => void;
};

const Header = ({ onClick, mobileSideBarClick }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { profile } = useAppContext();
  const clickOutsideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        clickOutsideRef.current &&
        !clickOutsideRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header
      className='border-b-coal-100 sticky top-0 flex h-14 w-full items-center justify-between border-b-[1px] px-1 md:border-b-0 md:px-2 lg:gap-4 lg:px-4'
      style={{ backgroundColor: "white", zIndex: 100 }}
    >
      <div className='h-[24px] w-[10%] md:hidden'>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='h-[100%] w-[100%] duration-700'
        >
          {isOpen ? (
            <RxCross1 className='h-[100%] w-[100%] text-gray-800' />
          ) : (
            <RxHamburgerMenu className='h-[100%] w-[100%] text-gray-800' />
          )}
        </button>
      </div>
      <div
        ref={clickOutsideRef}
        className={`fixed left-0 right-0 top-[57px] flex w-[100%] flex-col bg-white shadow-lg transition-all duration-300 ease-in-out ${isOpen ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"}`}
      >
        <NavLinkMobile
          href='/profile/overview'
          onClick={() => setIsOpen(false)}
        >
          {" "}
          Profile{" "}
        </NavLinkMobile>
        <NavLinkMobile
          href='/search-by-skills'
          onClick={() => setIsOpen(false)}
        >
          {" "}
          Search by skills{" "}
        </NavLinkMobile>
        {profile?.isLineManager && (
          <NavLinkMobile href='/line-manager' onClick={() => setIsOpen(false)}>
            {" "}
            Manager{" "}
          </NavLinkMobile>
        )}
      </div>
      <div className='flex w-[75%] justify-center md:w-[10%] md:justify-start'>
        <Link href='/'>
          <CaciLogo
            width='56'
            height='24'
            viewBox='0 0 140 60'
            className='md:hidden'
          />
          <CaciLogo
            width='100'
            height='40'
            viewBox='0 0 140 60'
            className='hidden md:flex'
          />
        </Link>
      </div>

      <div className='hidden h-[100%] w-[70%] items-center gap-4 text-nowrap md:flex'>
        <NavLink href='/profile/overview'>Profile</NavLink>
        <NavLink href='/search-by-skills'>Search by skills</NavLink>
        {profile?.isLineManager && (
          <NavLink href='/line-manager'>Manager</NavLink>
        )}
        <HeaderSearch />
      </div>

      <div className=''>
        {/*   <button className='btn btn-icon btn-icon-lg size-9 rounded-full text-gray-500 hover:bg-primary-light hover:text-primary-hover'>
          <i className='ki-filled ki-notification-on'></i>
        </button> */}
        {profile?  <HeaderMenu /> : <div className='h-9 w-9 animate-pulse rounded-full bg-gray-300'></div> }
       
      </div>
    </header>
  );
};

export default Header;
