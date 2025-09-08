"use client";
import { CardBody, CardRoot, Heading, HStack, Icon, SimpleGrid, Text } from "@chakra-ui/react";
import { HiDocument, HiPlus, HiUserGroup } from "react-icons/hi";

export const ActionCards = () => {
	return (
		<SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
			<CardRoot bgColor={"bg"}>
				<CardBody>
					<HStack spaceX={2}>
						<Icon as={HiPlus} color={"success"} size={"md"} />
						<Heading size={"md"}>Create New RTR</Heading>
					</HStack>
					<Text>Start a new Right to Represent form for a candidate</Text>
				</CardBody>
			</CardRoot>
			<CardRoot bgColor={"bg"}>
				<CardBody>
					<HStack spaceX={2}>
						<Icon as={HiUserGroup} color={"success"} size={"md"} />
						<Heading size={"md"}>Manage Candidates</Heading>
					</HStack>
					<Text>View and organize your candidate database</Text>
				</CardBody>
			</CardRoot>
			<CardRoot bgColor={"bg"}>
				<CardBody>
					<HStack spaceX={2}>
						<Icon as={HiDocument} color={"success"} size={"md"} />
						<Heading size={"md"}>RTR Templates</Heading>
					</HStack>
					<Text>Create and manage your RTR form templates</Text>
				</CardBody>
			</CardRoot>
		</SimpleGrid>
	);
};
