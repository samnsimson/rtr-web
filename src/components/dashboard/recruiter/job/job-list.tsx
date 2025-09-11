"use client";
import { JobDataTable } from "@/components/dashboard/recruiter/job/job-data-table";
import { Card } from "@chakra-ui/react";
import { useQuery } from "@apollo/client/react";
import { ListJobsDocument, ListJobsQuery, ListJobsQueryVariables, WorkType, JobType, CompensationType } from "@/graphql/generated/graphql";
import { FC, useEffect } from "react";

interface JobListProps {
	query?: string | null;
	workType?: WorkType | null;
	jobType?: JobType | null;
	compensationType?: CompensationType | null;
	page?: number | null;
	limit?: number | null;
}

export const JobList: FC<JobListProps> = ({ query, workType, jobType, compensationType: compensation, page, limit }) => {
	const { data, loading, refetch } = useQuery<ListJobsQuery, ListJobsQueryVariables>(ListJobsDocument, {
		variables: { filters: { query, workType, jobType, compensation, page, limit } },
	});

	useEffect(() => {
		refetch({ filters: { query, workType, jobType, compensation, page, limit } });
	}, [query, workType, jobType, compensation, page, limit, refetch]);

	return (
		<Card.Root>
			<Card.Body padding={0}>
				<JobDataTable jobs={data?.jobs.data} totalCount={data?.jobs.total} currentPage={page ?? 1} limit={limit ?? 10} loading={loading} />
			</Card.Body>
		</Card.Root>
	);
};
