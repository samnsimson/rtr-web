import { JobDataTable } from "@/components/dashboard/recruiter/job/job-data-table";
import { AppCard } from "@/components/ui/app-card";
import { api } from "@/lib/api";
import { Stack } from "@chakra-ui/react";

const StarredJobsPage = async () => {
	const jobs = await api.getStarredJobs();
	return (
		<Stack padding={4} gap={4}>
			<AppCard title="Starred Jobs" description="Manage all your starred jobs" noPadding>
				<JobDataTable jobs={jobs.data} />
			</AppCard>
		</Stack>
	);
};
export default StarredJobsPage;
