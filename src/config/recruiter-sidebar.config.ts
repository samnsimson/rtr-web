import { SidebarConfig } from "@/lib/types";
import { LuBriefcase, LuFileText, LuHouse } from "react-icons/lu";

export const recruiterSidebarConfig: SidebarConfig = {
	title: "Right to Represent",
	navItems: [
		{
			href: "/recruiter",
			icon: LuHouse,
			label: "Dashboard",
		},
		{
			href: "/recruiter/rtr",
			icon: LuFileText,
			label: "RTR Management",
		},
		{
			href: "/recruiter/job",
			icon: LuBriefcase,
			label: "Jobs",
		},
	],
	showUserProfile: true,
	userProfileConfig: {
		avatarBgColor: "success",
		showRole: true,
	},
	showLogout: true,
};
