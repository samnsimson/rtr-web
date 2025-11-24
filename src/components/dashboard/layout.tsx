"use client";
import { Flex, Heading, HStack, IconButton, Stack, VStack } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { Sidebar, SidebarToggle } from "./sidebar";
import { Breadcrumb } from "./breadcrumb";
import { recruiterSidebarConfig } from "@/config/recruiter-sidebar.config";
import { LuBell, LuCircleHelp, LuSettings } from "react-icons/lu";
import Link from "next/link";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Stack direction={"row"} gap={0} h={"100vh"} divideX={"1px"} divideColor={"border"} bgColor={"bg.panel"}>
			<Sidebar config={recruiterSidebarConfig} />
			<Flex flex={1} h={"full"} direction={"column"} divideY={"1px"} divideColor={"border"}>
				<HStack bgColor={"bg"} h={"full"} maxH={"80px"} alignItems={"center"} px={3} gap={4} justifyContent={"space-between"}>
					<HStack>
						<SidebarToggle />
						<Heading fontSize={"2xl"}>Overview</Heading>
					</HStack>
					<HStack gap={2} alignItems={"center"}>
						<IconButton variant={"ghost"} colorPalette={"white"} rounded={"full"}>
							<LuCircleHelp />
						</IconButton>
						<IconButton variant={"ghost"} colorPalette={"white"} rounded={"full"}>
							<LuBell />
						</IconButton>
						<IconButton asChild variant={"ghost"} colorPalette={"white"} rounded={"full"}>
							<Link href={"/recruiter/settings"}>
								<LuSettings />
							</Link>
						</IconButton>
					</HStack>
				</HStack>
				<Flex flex={1} direction={"column"} overflow={"auto"} justify={"space-between"}>
					<Stack>
						<Breadcrumb />
						{children}
					</Stack>
					<Flex justify="center" align="center" mt={4} borderTop="1px solid" borderColor="border">
						<VStack h={"80px"} justify="center" align="center" py={4}>
							<Heading as="span" fontSize="sm" color="muted">
								© {new Date().getFullYear()} Your Company. All rights reserved.
							</Heading>
						</VStack>
					</Flex>
				</Flex>
			</Flex>
		</Stack>
	);
};
export default DashboardLayout;
