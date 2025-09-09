"use client";
import { JobDataTable } from "@/components/dashboard/recruiter/job/job-data-table";
import { JobSearchFilter } from "@/components/dashboard/recruiter/job/job-search-filter";
import { Card } from "@chakra-ui/react";
import { FC, Fragment } from "react";
import { useSearchParams } from "next/navigation";
import { ListJobsQuery } from "@/graphql/generated/graphql";

type JobListProps = Pick<ListJobsQuery, "jobs">;

export const JobList: FC<JobListProps> = ({ jobs }) => {
	const searchParams = useSearchParams();
	const currentPage = parseInt(searchParams.get("page") || "1");
	const limit = 10;

	return (
		<Fragment>
			<JobSearchFilter />
			<Card.Root>
				<Card.Body padding={0}>
					<JobDataTable jobs={jobs.data} totalCount={jobs.total} currentPage={currentPage} limit={limit} />
				</Card.Body>
			</Card.Root>
		</Fragment>
	);
};
