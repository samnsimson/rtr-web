"use client";
import { Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { LuPlus } from "react-icons/lu";

export const JobHeader = () => {
	return (
		<Flex alignItems={"center"} justifyContent={"space-between"}>
			<Stack gap={0}>
				<Heading fontSize={"2xl"}>Jobs</Heading>
				<Text>Manage all your job postings</Text>
			</Stack>
			<Button asChild variant={"solid"} colorPalette={"blue"}>
				<Link href={"/recruiter/job/create"}>
					<LuPlus /> Create New Job
				</Link>
			</Button>
		</Flex>
	);
};
