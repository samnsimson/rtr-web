"use client";
import { Flex, Heading, Stack, VStack } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { Sidebar, SidebarToggle } from "./sidebar";
import { Breadcrumb } from "./breadcrumb";
import { recruiterSidebarConfig } from "@/config/recruiter-sidebar.config";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Stack direction={"row"} gap={0} h={"100vh"} divideX={"1px"} divideColor={"border"} bgColor={"bg.panel"}>
			<Sidebar config={recruiterSidebarConfig} />
			<Flex flex={1} h={"full"} direction={"column"} divideY={"1px"} divideColor={"border"}>
				<Flex bgColor={"bg"} h={"full"} maxH={"80px"} alignItems={"center"} px={3} gap={4}>
					<SidebarToggle />
					<Heading fontSize={"2xl"}>Overview</Heading>
				</Flex>
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
