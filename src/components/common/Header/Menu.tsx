import Image from "next/image";
import {useEffect, useRef, useState} from "react";

import Dropdown from "@/components/common/Header/Dropdown";

const HeaderMenu = () => {
	const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const toggleDropdown = () => setDropdownOpen((prev) => !prev);
	const closeDropdown = () => setDropdownOpen(false);

	// Handle clicks outside of the dropdown to close it
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				closeDropdown();
			}
		};

		if (isDropdownOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isDropdownOpen]);

	return (
		<div className="relative inline-block" ref={dropdownRef}>
			<button
				onClick={toggleDropdown}
				className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-300"
			>
				<Image
					alt="Profile"
					className="size-9 rounded-full border-2 border-success"
					src="/assets/media/avatars/profilepic.jpg"
					width={36}
					height={36}
				/>
				<span className="sr-only">Profile Menu</span>
			</button>

			<Dropdown isOpen={isDropdownOpen} onClose={closeDropdown} />
		</div>
	);
};

export default HeaderMenu;
