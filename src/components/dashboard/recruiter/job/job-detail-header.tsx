"use client";
import { Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { LuPencil, LuShare } from "react-icons/lu";
import { JobActionMenu } from "./job-action-menu";
import { JobDetailQuery } from "@/graphql/generated/graphql";
import { FC } from "react";

interface JobDetailHeaderProps {
	job: JobDetailQuery["job"];
}

export const JobDetailHeader: FC<JobDetailHeaderProps> = ({ job }) => {
	return (
		<Flex alignItems={"center"} justifyContent={"space-between"} gap={4}>
			<Stack gap={0}>
				<Heading fontSize={"2xl"}>Job Detail</Heading>
				<Text>View all the details of the job</Text>
			</Stack>
			<Stack direction={"row"} gap={2}>
				<Button asChild variant={"surface"} colorPalette={"blue"} display={{ base: "none", md: "flex" }}>
					<Link href={`/recruiter/job/${job.id}`}>
						<LuShare /> Share
					</Link>
				</Button>
				<Button asChild variant={"surface"} colorPalette={"blue"} display={{ base: "none", md: "flex" }}>
					<Link href={`/recruiter/job/${job.id}/edit`}>
						<LuPencil /> Edit
					</Link>
				</Button>
				<JobActionMenu />
			</Stack>
		</Flex>
	);
};
