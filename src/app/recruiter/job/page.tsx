import JobList from "@/components/dashboard/recruiter/job/job-list";
import { JobHeader } from "@/components/dashboard/recruiter/job/job-header";
import { Stack } from "@chakra-ui/react";
import { JobListSuspense } from "@/components/suspence";
import { Suspense } from "react";
import { JobSearchFilter } from "@/components/dashboard/recruiter/job/job-search-filter";
import { FC } from "react";

const JobsPage: FC = async () => {
	return (
		<Stack padding={4} gap={4}>
			<JobHeader />
			<JobSearchFilter />
			<Suspense fallback={<JobListSuspense />}>
				<JobList />
			</Suspense>
		</Stack>
	);
};

export default JobsPage;
