"use client";
import { JobDataTable } from "@/components/dashboard/recruiter/job/job-data-table";
import { JobSearchFilter } from "@/components/dashboard/recruiter/job/job-search-filter";
import { Card } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Job } from "@/graphql/generated/graphql";

export const JobList = () => {
	const [jobs, setJobs] = useState<Job[]>([]);
	const [totalCount, setTotalCount] = useState(0);
	const [loading, setLoading] = useState(true);
	const searchParams = useSearchParams();

	const currentPage = parseInt(searchParams.get("page") || "1");
	const limit = 10;
	const query = searchParams.get("query") || "";
	const workType = searchParams.get("workType") || "";
	const jobType = searchParams.get("jobType") || "";
	const compensation = searchParams.get("compensation") || "";

	useEffect(() => {
		const fetchJobs = async () => {
			setLoading(true);
			try {
				const params = new URLSearchParams({
					page: currentPage.toString(),
					limit: limit.toString(),
				});

				if (query) params.append("query", query);
				if (workType) params.append("workType", workType);
				if (jobType) params.append("jobType", jobType);
				if (compensation) params.append("compensation", compensation);

				const response = await fetch(`/api/recruiter/jobs?${params.toString()}`);

				if (!response.ok) {
					throw new Error("Failed to fetch jobs");
				}

				const data = await response.json();
				setJobs(data.jobs);
				setTotalCount(data.total);
			} catch (error) {
				console.error("Error fetching jobs:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchJobs();
	}, [currentPage, query, workType, jobType, compensation]);

	return (
		<Fragment>
			<JobSearchFilter />
			<Card.Root>
				<Card.Body padding={0}>
					<JobDataTable jobs={jobs} totalCount={totalCount} currentPage={currentPage} limit={limit} loading={loading} />
				</Card.Body>
			</Card.Root>
		</Fragment>
	);
};
