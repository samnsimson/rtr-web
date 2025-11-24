import { JobPreview } from "@/components/dashboard/job/job-preview";
import { CreateJobForm } from "@/components/forms/job/create-job.form";
import { GridItem, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { FC } from "react";

const CreateJobPage: FC<PageProps<"/recruiter/job/create">> = () => {
	return (
		<Stack padding={4} gap={4}>
			<Stack gap={0}>
				<Heading fontSize={"2xl"}>Create New Job</Heading>
				<Text>Fill out the form below to create a new job posting</Text>
			</Stack>
			<SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
				<GridItem>
					<CreateJobForm />
				</GridItem>
				<GridItem>
					<JobPreview display={{ base: "none", md: "flex" }} />
				</GridItem>
			</SimpleGrid>
		</Stack>
	);
};

export default CreateJobPage;
