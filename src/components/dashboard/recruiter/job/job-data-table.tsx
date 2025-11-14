"use client";
import { FC } from "react";
import { format } from "date-fns";
import { LuBriefcase } from "react-icons/lu";
import { Badge, Box, Button, Clipboard, Flex, Heading, Icon, Link, Stack, Text } from "@chakra-ui/react";
import {
	CompensationType,
	JobStatus,
	JobType,
	ListJobsDocument,
	ListJobsQuery,
	UpdateJobDocument,
	UpdateJobMutation,
	UpdateJobMutationVariables,
	WorkType,
} from "@/graphql/generated/graphql";
import { EmptyStateProps } from "@/components/ui/data-table";
import { createColumnHelper, Row } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { getWorkTypeLabel, getJobTypeLabel, getCompensationLabel, getStatusColor, isExpiredStatus } from "@/lib/utils";
import { BsStar, BsStarFill } from "react-icons/bs";
import { useMutation } from "@apollo/client/react";

interface JobTable {
	id: string;
	starred: boolean;
	jobId: string;
	title: string;
	company: string;
	location: string;
	workType: WorkType;
	jobType: JobType;
	compensation: CompensationType;
	status: JobStatus;
	applications: number;
	createdAt: Date;
	expiresAt: Date;
}

type JobDataTableProps = {
	jobs?: ListJobsQuery["jobs"]["data"];
	loading?: boolean;
};

const formatDate = (dateString: Date) => format(dateString, "MMM dd");

const JobIdCell: FC<{ row: Row<JobTable> }> = ({ row }) => {
	return (
		<Flex as={Text} gap={2} alignItems={"center"}>
			<Box asChild cursor={"pointer"} _hover={{ color: "primary" }}>
				<Link href={`/recruiter/job/${row.original.id}`}>{row.original.jobId}</Link>
			</Box>
			<Clipboard.Root value={row.original.jobId ?? ""} cursor={"pointer"}>
				<Clipboard.Trigger asChild>
					<Clipboard.Indicator />
				</Clipboard.Trigger>
			</Clipboard.Root>
		</Flex>
	);
};

const JobTitleCell: FC<{ row: Row<JobTable> }> = ({ row }) => {
	return (
		<Stack gap={0}>
			<Heading size={"sm"}>{row.original.title}</Heading>
			<Text fontSize="sm" color="fg.muted">
				{row.original.compensation === CompensationType.Salary ? "Annual Salary" : "Rate"}
			</Text>
		</Stack>
	);
};

const JobCompanyCell: FC<{ row: Row<JobTable> }> = ({ row }) => {
	return (
		<Stack gap={0}>
			<Heading size={"sm"}>{row.original.company}</Heading>
			<Text fontSize="sm" color="fg.muted">
				{row.original.location}
			</Text>
		</Stack>
	);
};

const JobWorkTypeCell: FC<{ row: Row<JobTable> }> = ({ row }) => {
	return (
		<Badge variant={"outline"} colorPalette={"blue"}>
			{getWorkTypeLabel(row.original.workType)}
		</Badge>
	);
};

const JobJobTypeCell: FC<{ row: Row<JobTable> }> = ({ row }) => {
	return (
		<Badge variant={"outline"} colorPalette={"purple"}>
			{getJobTypeLabel(row.original.jobType)}
		</Badge>
	);
};

const JobCompensationCell: FC<{ row: Row<JobTable> }> = ({ row }) => {
	return (
		<Badge variant={"outline"} colorPalette={"green"}>
			{getCompensationLabel(row.original.compensation)}
		</Badge>
	);
};

const JobStatusCell: FC<{ row: Row<JobTable> }> = ({ row }) => {
	return (
		<Badge variant={"solid"} colorPalette={getStatusColor(row.original.status)}>
			{row.original.status.charAt(0).toUpperCase() + row.original.status.slice(1)}
		</Badge>
	);
};

const JobCreatedAtCell: FC<{ row: Row<JobTable> }> = ({ row }) => {
	return (
		<Stack gap={0}>
			<Text>{formatDate(row.original.createdAt)}</Text>
			<Text fontSize="sm" color="fg.muted">
				{isExpiredStatus(row.original.status, row.original.expiresAt) ? `Expired` : `Expires ${formatDate(row.original.expiresAt)}`}
			</Text>
		</Stack>
	);
};

const StarredCell: FC<{ row: Row<JobTable> }> = ({ row }) => {
	const [updateJob, { loading }] = useMutation<UpdateJobMutation, UpdateJobMutationVariables>(UpdateJobDocument, { refetchQueries: [{ query: ListJobsDocument }] });
	const handleStarClick = async () => await updateJob({ variables: { updateJobInput: { id: row.original.id, starred: !row.original.starred } } });

	return (
		<Button size={"md"} variant={"ghost"} onClick={handleStarClick} loading={loading} disabled={loading}>
			{row.original.starred ? <Icon as={BsStarFill} color={"yellow"} /> : <BsStar />}
		</Button>
	);
};

export const JobDataTable: FC<JobDataTableProps> = ({ jobs = [], loading = false }) => {
	const emptyState: EmptyStateProps = {
		icon: LuBriefcase,
		title: "No jobs found",
		description: "Create your first job posting to get started with recruiting.",
	};

	const columnHelper = createColumnHelper<JobTable>();

	const tableData: JobTable[] = jobs.map((job) => ({
		id: job.id,
		starred: job.starred,
		jobId: job.jobId ?? "",
		title: job.title,
		company: job.company,
		location: job.location,
		workType: job.workType,
		jobType: job.jobType,
		compensation: job.compensation,
		status: isExpiredStatus(job.status, job.expiresAt) ? JobStatus.Active : job.status,
		applications: 0,
		createdAt: job.createdAt,
		expiresAt: job.expiresAt,
	}));

	const tableColumns = [
		columnHelper.accessor("starred", { header: "Starred", cell: ({ row }) => <StarredCell row={row} /> }),
		columnHelper.accessor("jobId", { header: "Job ID", cell: ({ row }) => <JobIdCell row={row} /> }),
		columnHelper.accessor("title", { header: "Title", cell: ({ row }) => <JobTitleCell row={row} /> }),
		columnHelper.accessor("company", { header: "Company", cell: ({ row }) => <JobCompanyCell row={row} /> }),
		columnHelper.accessor("workType", { header: "Work Type", cell: ({ row }) => <JobWorkTypeCell row={row} /> }),
		columnHelper.accessor("jobType", { header: "Job Type", cell: ({ row }) => <JobJobTypeCell row={row} /> }),
		columnHelper.accessor("compensation", { header: "Compensation", cell: ({ row }) => <JobCompensationCell row={row} /> }),
		columnHelper.accessor("status", { header: "Status", cell: ({ row }) => <JobStatusCell row={row} /> }),
		columnHelper.accessor("applications", { header: "Applications", cell: (info) => info.getValue() }),
		columnHelper.accessor("createdAt", { header: "Created", cell: ({ row }) => <JobCreatedAtCell row={row} /> }),
	];

	return <DataTable columns={tableColumns} data={tableData} fallbackRows={5} fallbackColumns={tableColumns.length} loading={loading} emptyState={emptyState} />;
};
