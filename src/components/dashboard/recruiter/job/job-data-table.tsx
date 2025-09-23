"use client";
import { FC } from "react";
import { format } from "date-fns";
import { LuEye, LuPencil, LuTrash2, LuBriefcase } from "react-icons/lu";
import { Badge, Box, Clipboard, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { CompensationType, JobStatus, JobType, ListJobsQuery, WorkType } from "@/graphql/generated/graphql";
import { DataTable, DataTableColumn, DataTableAction, EmptyStateProps } from "@/components/ui/data-table";

type JobDataTableProps = {
	jobs?: ListJobsQuery["jobs"]["data"];
	totalCount?: number;
	limit: number;
	loading?: boolean;

	onPageChange?: (page: number) => void;
};

export const JobDataTable: FC<JobDataTableProps> = ({ jobs, totalCount, limit, loading = false, onPageChange }) => {
	const formatDate = (dateString: Date) => format(dateString, "MMM dd");

	const getStatusColor = (status: string) => {
		switch (status) {
			case JobStatus.Active:
				return "green";
			case JobStatus.Inactive:
				return "yellow";
			case JobStatus.Closed:
				return "red";
			case JobStatus.Draft:
				return "gray";
			default:
				return "blue";
		}
	};

	const getWorkTypeLabel = (workType: string) => {
		switch (workType) {
			case WorkType.Remote:
				return "Remote";
			case WorkType.Hybrid:
				return "Hybrid";
			case WorkType.OnSite:
				return "On Site";
			default:
				return workType;
		}
	};

	const getJobTypeLabel = (jobType: string) => {
		switch (jobType) {
			case JobType.FullTime:
				return "Full Time";
			case JobType.PartTime:
				return "Part Time";
			case JobType.Contract:
				return "Contract";
			case JobType.Internship:
				return "Internship";
			case JobType.Freelance:
				return "Freelance";
			default:
				return jobType;
		}
	};

	const getCompensationLabel = (compensation: string) => {
		switch (compensation) {
			case CompensationType.Salary:
				return "Salary";
			case CompensationType.Hourly:
				return "Hourly";
			case CompensationType.ProjectBased:
				return "Project Based";
			case CompensationType.Commission:
				return "Commission";
			default:
				return compensation;
		}
	};

	const emptyState: EmptyStateProps = {
		icon: LuBriefcase,
		title: "No jobs found",
		description: "Create your first job posting to get started with recruiting.",
	};

	const columns: DataTableColumn<ListJobsQuery["jobs"]["data"][number]>[] = [
		{
			key: "jobId",
			label: "Job ID",
			render: (job) => (
				<Flex as={Text} gap={2} alignItems={"center"}>
					<Box asChild cursor={"pointer"} _hover={{ color: "primary" }}>
						<Link href={`/recruiter/job/${job.id}`}>{job.jobId}</Link>
					</Box>
					<Clipboard.Root value={job.jobId ?? ""} cursor={"pointer"}>
						<Clipboard.Trigger asChild>
							<Clipboard.Indicator />
						</Clipboard.Trigger>
					</Clipboard.Root>
				</Flex>
			),
		},

		{
			key: "title",
			label: "Title",
			render: (job) => (
				<Stack gap={0}>
					<Heading size={"sm"}>{job.title}</Heading>
					<Text fontSize="sm" color="fg.muted">
						{job.compensation === CompensationType.Salary ? "Annual Salary" : "Rate"}
					</Text>
				</Stack>
			),
		},
		{
			key: "company",
			label: "Company",
			render: (job) => (
				<Stack gap={0}>
					<Heading size={"sm"}>{job.company}</Heading>
					<Text fontSize="sm" color="fg.muted">
						{job.location}
					</Text>
				</Stack>
			),
		},

		{
			key: "workType",
			label: "Work Type",
			render: (job) => (
				<Badge variant={"outline"} colorPalette={"blue"}>
					{getWorkTypeLabel(job.workType)}
				</Badge>
			),
		},
		{
			key: "jobType",
			label: "Job Type",
			render: (job) => (
				<Badge variant={"outline"} colorPalette={"purple"}>
					{getJobTypeLabel(job.jobType)}
				</Badge>
			),
		},
		{
			key: "compensation",
			label: "Compensation",
			render: (job) => (
				<Badge variant={"outline"} colorPalette={"green"}>
					{getCompensationLabel(job.compensation)}
				</Badge>
			),
		},
		{
			key: "status",
			label: "Status",
			render: (job) => (
				<Badge variant={"solid"} colorPalette={getStatusColor(job.status)}>
					{job.status.charAt(0).toUpperCase() + job.status.slice(1)}
				</Badge>
			),
		},
		{
			key: "applications",
			label: "Applications",
			render: () => <Text fontWeight="medium">0</Text>,
		},
		{
			key: "createdAt",
			label: "Created",
			render: (job) => (
				<Stack gap={0}>
					<Text>{formatDate(job.createdAt)}</Text>
					<Text fontSize="sm" color="fg.muted">
						{job.expiresAt ? `Expires ${formatDate(job.expiresAt)}` : "No expiry"}
					</Text>
				</Stack>
			),
		},
	];

	const actions: DataTableAction<ListJobsQuery["jobs"]["data"][number]>[] = [
		{
			key: "view",
			icon: LuEye,
			href: (job) => `/recruiter/job/${job.id}`,
		},
		{
			key: "edit",
			icon: LuPencil,
			href: (job) => `/recruiter/job/${job.id}`,
		},
		{
			key: "delete",
			icon: LuTrash2,
			onClick: (job) => console.log("Delete job:", job.id),
			colorPalette: "red",
			_hover: { color: "red.500" },
		},
	];

	return (
		<DataTable
			columns={columns}
			data={jobs || []}
			loading={loading}
			actions={actions}
			emptyState={emptyState}
			pagination={{
				limit,
				count: totalCount || 0,
				onPageChange: onPageChange || ((page) => console.log("Page changed to:", page)),
			}}
			fallbackRows={5}
			fallbackColumns={columns.length + 1}
		/>
	);
};
