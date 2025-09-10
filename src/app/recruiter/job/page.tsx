import { JobList } from "@/components/dashboard/recruiter/job/job-list";
import { JobHeader } from "@/components/dashboard/recruiter/job/job-header";
import { Stack } from "@chakra-ui/react";
import { JobSearchFilter } from "@/components/dashboard/recruiter/job/job-search-filter";
import { WorkType, JobType, CompensationType } from "@/graphql/generated/graphql";
import { toEnum } from "@/lib/utils";

const JobsPage = async ({ searchParams }: PageProps<"/recruiter/job">) => {
	const sp = (await searchParams) as Record<string, string>;
	const params = new URLSearchParams(sp);
	const query = params.get("query");
	const workType = toEnum(params.get("workType"), WorkType);
	const jobType = toEnum(params.get("jobType"), JobType);
	const compensationType = toEnum(params.get("compensation"), CompensationType);
	const page = parseInt(params.get("page") ?? "1");
	const limit = parseInt(params.get("limit") ?? "10");

	return (
		<Stack padding={4} gap={4}>
			<JobHeader />
			<JobSearchFilter />
			<JobList query={query} workType={workType} jobType={jobType} compensationType={compensationType} page={page} limit={limit} />
		</Stack>
	);
};

export default JobsPage;
