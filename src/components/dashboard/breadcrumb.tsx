"use client";
import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { LuChevronRight } from "react-icons/lu";

interface BreadcrumbItem {
	label: string;
	href: string;
	isLast?: boolean;
}

const getBreadcrumbItems = (pathname: string): BreadcrumbItem[] => {
	const segments = pathname.split("/").filter(Boolean);
	const items: BreadcrumbItem[] = [{ label: "Dashboard", href: "/recruiter" }];
	if (pathname === "/recruiter") return items;

	let currentPath = "/recruiter";
	segments.forEach((segment, index) => {
		if (segment === "recruiter") return;
		currentPath += `/${segment}`;
		let label = segment;
		if (segment === "rtr") label = "RTR";
		else if (segment === "create") label = "Create";
		else if (segment === "candidate") label = "Candidates";
		else if (segment === "auth") label = "Authentication";
		else label = segment.charAt(0).toUpperCase() + segment.slice(1);
		items.push({ label, href: currentPath, isLast: index === segments.length - 1 });
	});
	return items;
};

export const Breadcrumb = () => {
	const pathname = usePathname();
	const breadcrumbItems = getBreadcrumbItems(pathname);
	if (breadcrumbItems.length <= 1) return null;

	return (
		<Flex alignItems="center" gap={2} px={4} py={2} bgColor="transparent">
			{breadcrumbItems.map((item) => (
				<Flex key={item.href} alignItems="center" gap={2}>
					{item.isLast ? (
						<Text fontSize="sm" fontWeight="semibold" color="warning">
							{item.label}
						</Text>
					) : (
						<Fragment>
							<Link href={item.href as any} style={{ textDecoration: "none" }}>
								<Flex alignItems="center" gap={1} _hover={{ color: "primary" }} transition="color 0.2s">
									<Text fontSize="sm" color="fg.muted" _hover={{ color: "primary" }}>
										{item.label}
									</Text>
								</Flex>
							</Link>
							<LuChevronRight size={16} color="fg" />
						</Fragment>
					)}
				</Flex>
			))}
		</Flex>
	);
};
