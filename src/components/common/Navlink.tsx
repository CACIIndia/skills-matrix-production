'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href);

  return (
    <Link className={clsx("link text-md")} href={href} style={{ color: isActive ? 'var(--tw-primary)' : 'var(--tw-primary-text)' }}>
      <span className="text-md font-semibold">{children}</span>
      
      <div className={clsx("mt-1 text-primary-text", isActive ? "active menu-item-active:border-b-primary menu-item  menu-item-here:border-b-primary border-b-2 border-b-transparent" : "", "")}></div>
    </Link>
  );
};

export default NavLink;


