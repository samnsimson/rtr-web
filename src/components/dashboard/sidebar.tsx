"use client";
import { useSidebar } from "@/store";
import { useAuth } from "@/hooks/use-auth";
import { AvatarFallback, AvatarRoot, Box, Drawer, Flex, Heading, Icon, IconButton, Portal, Stack, Text, useBreakpoint, Collapsible } from "@chakra-ui/react";
import { FC, Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItemProps, SidebarConfig } from "@/lib/types";
import { LuChevronDown, LuChevronRight, LuLogOut, LuMenu } from "react-icons/lu";

export const SidebarToggle = () => {
	const { toggle } = useSidebar((state) => state);
	return (
		<IconButton rounded={"full"} variant={"ghost"} colorPalette={"white"} display={{ base: "flex", lg: "none" }} onClick={toggle}>
			<LuMenu />
		</IconButton>
	);
};

const NavItem: FC<NavItemProps> = ({ href, icon, label, children, subItems, isActive = false, hasActiveChild = false, ...props }) => {
	const [isOpen, setIsOpen] = useState(hasActiveChild);
	const hasSubItems = subItems && subItems.length > 0;
	if (hasSubItems) {
		return (
			<Box {...props}>
				<Flex
					alignItems={"center"}
					px={4}
					py={3}
					gap={3}
					cursor={"pointer"}
					_hover={{ bgColor: isActive || hasActiveChild ? "info" : "bg.subtle" }}
					bgColor={isActive || hasActiveChild ? "info" : "transparent"}
					transition={"all 0.2s"}
					borderRadius={"md"}
					onClick={() => setIsOpen(!isOpen)}
				>
					<Icon as={icon} size={"md"} color={"white"} />
					<Text fontSize={"sm"} fontWeight={isActive || hasActiveChild ? "semibold" : "normal"} color={"white"} flex={1}>
						{children || label}
					</Text>
					<Icon as={isOpen ? LuChevronDown : LuChevronRight} size={"sm"} color={"white"} />
				</Flex>
				<Collapsible.Root open={isOpen}>
					<Collapsible.Content bgColor={"bg.card"} rounded={"md"} marginTop={2}>
						<Stack gap={1} padding={2}>
							{subItems.map((subItem) => (
								<NavItem key={subItem.href} {...subItem} borderRadius={0} />
							))}
						</Stack>
					</Collapsible.Content>
				</Collapsible.Root>
			</Box>
		);
	}

	return (
		<Link href={href as any} style={{ textDecoration: "none" }}>
			<Flex
				alignItems={"center"}
				px={4}
				py={3}
				gap={3}
				cursor={"pointer"}
				_hover={{ bgColor: isActive ? "info" : "bg.subtle" }}
				bgColor={isActive ? "info" : "transparent"}
				transition={"all 0.2s"}
				borderRadius={"md"}
			>
				<Icon as={icon} size={"md"} color={"white"} />
				<Text fontWeight={isActive ? "semibold" : "normal"} color={"white"}>
					{children || label}
				</Text>
			</Flex>
		</Link>
	);
};

export const SidebarContent = ({ config }: { config: SidebarConfig }) => {
	const { user, logout } = useAuth();
	const pathname = usePathname();

	const isLinkActive = (href: string) => {
		if (pathname === href) return true;
		if (href !== "/" && pathname.startsWith(href)) {
			const hrefParts = href.split("/").filter(Boolean);
			const pathParts = pathname.split("/").filter(Boolean);
			if (hrefParts.length < pathParts.length) {
				const nextPart = pathParts[hrefParts.length];
				if (nextPart && !isNaN(Number(nextPart))) {
					return true;
				}
			}
		}
		return false;
	};

	const hasActiveChild = (item: NavItemProps): boolean => {
		if (isLinkActive(item.href)) return true;
		if (item.subItems) {
			return item.subItems.some((subItem) => hasActiveChild(subItem));
		}
		return false;
	};

	const handleLogout = () => {
		if (config.onLogout) config.onLogout();
		else logout();
	};

	return (
		<Flex width={"full"} height={"full"} direction={"column"} divideY={"1px"} divideColor={"border"}>
			<Flex bgColor={"bg"} h={"full"} maxH={"80px"} alignItems={"center"} px={3}>
				<Heading>{config.title}</Heading>
			</Flex>
			<Stack flex={1} overflow={"auto"} gap={2} padding={3}>
				{config.navItems.map((item) => (
					<NavItem key={item.href} {...item} isActive={isLinkActive(item.href)} hasActiveChild={hasActiveChild(item)} />
				))}
			</Stack>
			{(config.showUserProfile || config.showLogout) && (
				<Flex h={"80px"} alignItems={"center"} p={3} gap={4} bgColor={"bg.card"}>
					{config.showUserProfile && (
						<>
							<AvatarRoot variant={"solid"} bgColor={config.userProfileConfig?.avatarBgColor || "success"}>
								<AvatarFallback name={user?.name || "User"} />
							</AvatarRoot>
							<Stack gap={0} flex={1}>
								<Heading size={"sm"}>{user?.name || "User"}</Heading>
								{config.userProfileConfig?.showRole && <Text fontSize={"sm"}>{user?.role || "User"}</Text>}
							</Stack>
						</>
					)}
					{config.showLogout && (
						<IconButton rounded={"full"} variant={"ghost"} colorPalette={"white"} onClick={handleLogout}>
							<LuLogOut />
						</IconButton>
					)}
				</Flex>
			)}
		</Flex>
	);
};

export const Sidebar = ({ config }: { config: SidebarConfig }) => {
	const { open, toggle, setOpen } = useSidebar((state) => state);
	const breakpoint = useBreakpoint();
	const isDesktop = ["md", "lg", "xl", "2xl"].includes(breakpoint);

	useEffect(() => setOpen(isDesktop), [isDesktop, setOpen]);

	return (
		<Fragment>
			<Box width={"2/12"} h={"full"} bgColor={"bg"} display={{ base: "none", lg: "flex" }}>
				<SidebarContent config={config} />
			</Box>
			<Drawer.Root open={open && !isDesktop} onOpenChange={toggle} placement={"start"}>
				<Portal>
					<Drawer.Backdrop />
					<Drawer.Positioner>
						<Drawer.Content bgColor={"bg"}>
							<SidebarContent config={config} />
						</Drawer.Content>
					</Drawer.Positioner>
				</Portal>
			</Drawer.Root>
		</Fragment>
	);
};
