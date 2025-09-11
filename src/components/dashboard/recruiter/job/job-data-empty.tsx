import { Button, Heading, Icon, Table, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { LuFolderOpen, LuPlus } from "react-icons/lu";

export const JobDataEmpty = () => {
	return (
		<Table.Row>
			<Table.Cell colSpan={10} textAlign={"center"} py={10} height={"250px"} spaceY={4}>
				<VStack gap={0}>
					<Icon as={LuFolderOpen} size={"2xl"} color={"fg.muted"} mb={4} />
					<Heading>No jobs found</Heading>
					<Text>Create a new job to get started</Text>
				</VStack>
				<Button asChild variant={"solid"} colorPalette={"blue"}>
					<Link href={"/recruiter/job/create"}>
						<LuPlus /> Create Job
					</Link>
				</Button>
			</Table.Cell>
		</Table.Row>
	);
};
