import { JobList } from "@/components/dashboard/recruiter/job/job-list";
import { JobHeader } from "@/components/dashboard/recruiter/job/job-header";
import { Stack } from "@chakra-ui/react";
import { api } from "@/lib/api";
import { Suspense } from "react";

const JobsPage = async () => {
	const jobs = await api.listJobs(1, 10);
	return (
		<Stack padding={4} gap={4}>
			<JobHeader />
			<Suspense fallback={<div>Loading...</div>}>
				<JobList jobs={jobs} />
			</Suspense>
		</Stack>
	);
};

export default JobsPage;
