import { useEffect, useState } from "react";
import Button from "@/components/common/Button";
import HeaderMenu from "@/components/common/Header/Menu";
import HeaderSearch from "@/components/common/Header/Search";
import MegaMenu from "@/components/common/Header/MegaMenu";
import HeaderSkeleton from "@/components/skeletons/HeaderSkeleton";
import { useAppContext } from "@/app/context/AppContext";

type HeaderProps = {
  onClick: () => void;
  mobileSideBarClick: () => void;
};

const Header = ({ onClick, mobileSideBarClick }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isLoading ,profile} = useAppContext();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (isLoading || !profile) {
    return <HeaderSkeleton />;
  }

  return (
    <header
      className={`h-full flex items-center justify-between bg-[#fefefe] transition-all duration-300 ${
        isScrolled ? "shadow-sm border-b border-b-coal-100" : ""
      }`}
    >
      <div className="container-fixed flex justify-between items-stretch lg:gap-4" id="megamenu_container">
        <div className="hidden lg:flex items-stretch">
          <div className="flex items-stretch" id="megamenu_container">
            <div className="flex items-stretch">
              <div className="hidden lg:flex lg:items-stretch">
                <MegaMenu />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-1 lg:hidden items-center -ml-1">
          <div className="flex items-center">
            <button
              className="btn btn-icon btn-light btn-clear btn-sm"
              onClick={mobileSideBarClick}
            >
              <i className="ki-filled ki-menu"></i>
            </button>
          </div>
        </div>

        <div className="flex items-start gap-2 lg:gap-3.5">
          <HeaderSearch onClick={onClick} />

          <button className="btn btn-icon btn-icon-lg size-9 rounded-full text-gray-500 hover:bg-primary-light hover:text-primary">
            <i className="ki-filled ki-element-11"></i>
          </button>

          <button className="btn btn-icon btn-icon-lg size-9 rounded-full text-gray-500 hover:bg-primary-light hover:text-primary">
            <i className="ki-filled ki-notification-on"></i>
          </button>

          <HeaderMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
