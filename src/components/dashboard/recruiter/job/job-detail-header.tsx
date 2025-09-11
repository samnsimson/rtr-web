"use client";
import { Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { LuPencil } from "react-icons/lu";

export const JobDetailHeader = () => {
	return (
		<Flex alignItems={"center"} justifyContent={"space-between"}>
			<Stack gap={0}>
				<Heading fontSize={"2xl"}>Job Detail</Heading>
				<Text>View all the details of the job</Text>
			</Stack>
			<Button asChild variant={"solid"} colorPalette={"blue"}>
				<Link href={"/recruiter/job/edit"}>
					<LuPencil /> Edit Job
				</Link>
			</Button>
		</Flex>
	);
};
