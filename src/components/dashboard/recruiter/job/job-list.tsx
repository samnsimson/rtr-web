import { JobDataTable } from "@/components/dashboard/recruiter/job/job-data-table";
import { Card } from "@chakra-ui/react";
import { api } from "@/lib/api";
import { NextPage } from "next";

const JobList: NextPage = async () => {
	const jobs = await api.listJobs(1, 10);
	return (
		<Card.Root>
			<Card.Body padding={0}>
				<JobDataTable jobs={jobs.data} totalCount={jobs.total} currentPage={1} limit={10} />
			</Card.Body>
		</Card.Root>
	);
};

export default JobList;
