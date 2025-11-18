import { SidebarConfig } from "@/lib/types";
import { LuBriefcase, LuFileText, LuHouse, LuPlus, LuList, LuUsers, LuStar, LuSettings, LuCreditCard, LuUser } from "react-icons/lu";

export const recruiterSidebarConfig: SidebarConfig = {
	title: "Right to Represent",
	navItems: [
		{
			href: "/recruiter",
			icon: LuHouse,
			label: "Dashboard",
		},
		{
			href: "/recruiter/job",
			icon: LuBriefcase,
			label: "Jobs",
			subItems: [
				{
					href: "/recruiter/job",
					icon: LuList,
					label: "All Jobs",
				},
				{
					href: "/recruiter/job/create",
					icon: LuPlus,
					label: "New Job",
				},
				{
					href: "/recruiter/job/starred",
					icon: LuStar,
					label: "Starred Job",
				},
			],
		},
		{
			href: "/recruiter/rtr",
			icon: LuFileText,
			label: "RTR Management",
			subItems: [
				{
					href: "/recruiter/rtr",
					icon: LuList,
					label: "All RTR's",
				},
				{
					href: "/recruiter/rtr/create",
					icon: LuPlus,
					label: "New RTR",
				},
				{
					href: "/recruiter/rtr/template",
					icon: LuList,
					label: "All Templates",
				},
			],
		},
		{
			href: "/recruiter/candidate",
			icon: LuUsers,
			label: "Candidates",
		},
		{
			href: "/recruiter/employer",
			icon: LuUsers,
			label: "Employers",
		},
		{
			href: "/recruiter/settings",
			icon: LuSettings,
			label: "Settings",
			subItems: [
				{
					href: "/recruiter/plans",
					icon: LuUser,
					label: "Account Settings",
				},
				{
					href: "/recruiter/plans",
					icon: LuCreditCard,
					label: "Subscription",
				},
			],
		},
	],
	showUserProfile: true,
	userProfileConfig: {
		avatarBgColor: "success",
		showRole: false,
	},
	showLogout: true,
};
