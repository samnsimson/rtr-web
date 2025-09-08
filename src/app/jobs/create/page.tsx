import { Box, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import { CreateJobForm } from "@/components/forms/create-job.form";
import { JobPreview } from "@/components/dashboard/job/job-preview";

const CreateJobPage = () => {
	return (
		<Box maxW="6xl" mx="auto" py={8}>
			<Heading as="h1" fontSize="3xl" fontWeight="bold" mb={8}>
				Create New Job
			</Heading>
			<SimpleGrid columns={{ base: 1, lg: 2 }} gap={8}>
				<VStack align="stretch" gap={4}>
					<Heading as="h2" fontSize="xl" fontWeight="semibold" mb={4}>
						Job Details
					</Heading>
					<CreateJobForm />
				</VStack>
				<VStack align="stretch" gap={4}>
					<Heading as="h2" fontSize="xl" fontWeight="semibold" mb={4}>
						Preview
					</Heading>
					<JobPreview />
				</VStack>
			</SimpleGrid>
		</Box>
	);
};

export default CreateJobPage;
