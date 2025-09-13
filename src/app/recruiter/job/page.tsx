import { JobList } from "@/components/dashboard/recruiter/job/job-list";
import { JobHeader } from "@/components/dashboard/recruiter/job/job-header";
import { Stack } from "@chakra-ui/react";
import { JobSearchFilter } from "@/components/dashboard/recruiter/job/job-search-filter";
import { Suspense } from "react";

const JobsPage = async ({ searchParams }: PageProps<"/recruiter/job">) => {
	return (
		<Stack padding={4} gap={4}>
			<JobHeader />
			<Suspense>
				<JobSearchFilter />
			</Suspense>
			<JobList searchParams={searchParams as Promise<Record<string, string>>} />
		</Stack>
	);
};

export default JobsPage;
