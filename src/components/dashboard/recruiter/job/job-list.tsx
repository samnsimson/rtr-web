"use client";
import { JobDataTable } from "@/components/dashboard/recruiter/job/job-data-table";
import { useQuery } from "@apollo/client/react";
import { ListJobsDocument, ListJobsQuery, ListJobsQueryVariables, WorkType, JobType, CompensationType } from "@/graphql/generated/graphql";
import { FC, use, useEffect } from "react";
import { toEnum } from "@/lib/utils";

interface JobListProps {
	searchParams: Promise<Record<string, string>>;
}

const getFilters = (searchParams: Record<string, string>) => {
	return {
		query: searchParams.query,
		page: parseInt(searchParams.page || "1"),
		limit: parseInt(searchParams.limit || "10"),
		workType: toEnum(searchParams.workType, WorkType),
		jobType: toEnum(searchParams.jobType, JobType),
		compensation: toEnum(searchParams.compensation, CompensationType),
	};
};

export const JobList: FC<JobListProps> = ({ searchParams }) => {
	const params = use(searchParams);
	const { data, loading, refetch } = useQuery<ListJobsQuery, ListJobsQueryVariables>(ListJobsDocument, { variables: { filters: getFilters(params) } });

	useEffect(() => {
		refetch({ filters: getFilters(params) });
	}, [params, refetch]);

	return <JobDataTable jobs={data?.jobs.data} loading={loading} />;
};
