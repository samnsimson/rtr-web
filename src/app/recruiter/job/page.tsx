import { JobList } from "@/components/dashboard/recruiter/job/job-list";
import { JobHeader } from "@/components/dashboard/recruiter/job/job-header";
import { Stack } from "@chakra-ui/react";

const JobsPage = () => {
	return (
		<Stack padding={4} gap={4}>
			<JobHeader />
			<JobList />
		</Stack>
	);
};

export default JobsPage;
