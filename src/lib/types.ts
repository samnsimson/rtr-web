export interface NavItemProps {
	href: string;
	icon: any;
	label: string;
	children?: React.ReactNode;
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
