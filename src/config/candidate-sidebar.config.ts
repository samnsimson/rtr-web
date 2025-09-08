import { SidebarConfig } from "@/lib/types";
import { LuFileText, LuHouse } from "react-icons/lu";

export const candidateSidebarConfig: SidebarConfig = {
	title: "Candidate Portal",
	navItems: [
		{
			href: "/candidate",
			icon: LuHouse,
			label: "Dashboard",
		},
		{
			href: "/candidate/applications",
			icon: LuFileText,
			label: "My Applications",
		},
		{
			href: "/candidate/profile",
			icon: LuFileText,
			label: "Profile",
		},
	],
	showUserProfile: true,
	userProfileConfig: {
		avatarBgColor: "blue",
		showRole: false,
	},
	showLogout: true,
};
