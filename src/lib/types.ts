import { BoxProps } from "@chakra-ui/react";

export interface NavItemProps extends BoxProps {
	href: string;
	icon: any;
	label: string;
	children?: React.ReactNode;
	isActive?: boolean;
	isEnabled?: boolean;
	hasActiveChild?: boolean;
	subItems?: NavItemProps[];
}

export interface SidebarConfig {
	title: string;
	navItems: NavItemProps[];
	showUserProfile?: boolean;
	showLogout?: boolean;
	onLogout?: () => void;
	userProfileConfig?: {
		avatarBgColor?: string;
		showRole?: boolean;
	};
}
