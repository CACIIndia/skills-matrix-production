import Button from "@/components/common/Button";
import HeaderMenu from "@/components/common/Header/Menu";
import HeaderSearch from "@/components/common/Header/Search";
import MegaMenu from "@/components/common/Header/MegaMenu";
import { useEffect, useRef, useState } from "react";

type HeaderProps = {
  onClick: () => void;
};

const Header = ({ onClick }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
     style={{paddingLeft:"3%",paddingRight:"3%"}}
      className={`flex h-fit w-full items-center justify-between  bg-[#fefefe] transition-all duration-300 ${
        isScrolled ? 'shadow-sm border-b border-b-coal-100' : ''
      }`}
    >
      <div className='h-full w-full' id='header_container'> 
        <div
          className='hidden h-full items-stretch p-5 justify-between lg:flex  '
          id='megamenu_container'
        >
          <div className='flex items-stretch pl-10'>
            <div className='flex items-stretch' id='megamenu_container'>
              <div className='flex items-stretch'>
                <div className='hidden lg:flex lg:items-stretch'>
                  <MegaMenu />
                </div>
              </div>
            </div>
          </div>

          <div className='flex items-start gap-2 lg:gap-3.5'>
            <HeaderSearch onClick={onClick} />

            <button className='btn btn-icon btn-icon-lg size-9 rounded-full text-gray-500 hover:bg-primary-light hover:text-primary'>
              <i className='ki-filled ki-element-11'></i>
            </button>

            <button className='btn btn-icon btn-icon-lg size-9 rounded-full text-gray-500 hover:bg-primary-light hover:text-primary'>
              <i className='ki-filled ki-notification-on'></i>
            </button>

            <HeaderMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
