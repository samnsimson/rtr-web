import { JobList } from "@/components/dashboard/recruiter/job/job-list";
import { JobHeader } from "@/components/dashboard/recruiter/job/job-header";
import { GridItem, SimpleGrid, Stack } from "@chakra-ui/react";
import { JobSearchFilter } from "@/components/dashboard/recruiter/job/job-search-filter";
import { Suspense } from "react";
import { AppCard } from "@/components/ui/app-card";

const JobsPage = async ({ searchParams }: PageProps<"/recruiter/job">) => {
	return (
		<Stack padding={4} gap={4}>
			<JobHeader />
			<SimpleGrid columns={{ base: 1, md: 4 }} gap={4}>
				<GridItem colSpan={{ base: 1, md: 1 }} spaceY={4}>
					<Suspense>
						<JobSearchFilter />
					</Suspense>
				</GridItem>
				<GridItem colSpan={{ base: 1, md: 3 }} spaceY={4}>
					<AppCard title="Jobs" description="Manage all your jobs" noPadding>
						<JobList searchParams={searchParams as Promise<Record<string, string>>} />
					</AppCard>
				</GridItem>
			</SimpleGrid>
		</Stack>
	);
};

export default JobsPage;
