import { on } from "events";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavLinkMobileProps {
  href: string;
  onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  children: React.ReactNode;
}

const NavLinkMobile: React.FC<NavLinkMobileProps> = ({
  href,
  onClick,
  children,
}) => {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${
        isActive
          ? "text-mob-nav-link-active-text bg-mob-nav-link-active-bg font-semibold"
          : "text-primary-text"
      } p-2`}
    >
      {children}
    </Link>
  );
};

export default NavLinkMobile;
