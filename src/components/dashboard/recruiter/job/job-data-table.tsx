"use client";
import { PaginationComponent } from "@/components/ui/pagination-component";
import { Badge, For, Heading, HStack, IconButton, Stack, Table, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import { LuEye, LuPencil, LuTrash2 } from "react-icons/lu";
import Link from "next/link";
import { FC, useState, useEffect } from "react";
import { CompensationType, JobStatus, JobType, WorkType } from "@prisma/client";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { Job } from "@prisma/client";

type JobDataTableProps = {
	jobs: Job[];
	totalCount: number;
	currentPage: number;
	limit: number;
	loading?: boolean;
};

export const JobDataTable: FC<JobDataTableProps> = ({ jobs, totalCount, currentPage, limit, loading = false }) => {
	const [mounted, setMounted] = useState(false);

	// Prevent hydration mismatch
	useEffect(() => {
		setMounted(true);
	}, []);

	const formatDate = (dateString: Date) => format(dateString, "MMM dd");

	const getStatusColor = (status: string) => {
		switch (status) {
			case JobStatus.ACTIVE:
				return "green";
			case JobStatus.INACTIVE:
				return "yellow";
			case JobStatus.CLOSED:
				return "red";
			case JobStatus.DRAFT:
				return "gray";
			default:
				return "blue";
		}
	};

	const getWorkTypeLabel = (workType: string) => {
		switch (workType) {
			case WorkType.REMOTE:
				return "Remote";
			case WorkType.HYBRID:
				return "Hybrid";
			case WorkType.ON_SITE:
				return "On Site";
			default:
				return workType;
		}
	};

	const getJobTypeLabel = (jobType: string) => {
		switch (jobType) {
			case JobType.FULL_TIME:
				return "Full Time";
			case JobType.PART_TIME:
				return "Part Time";
			case JobType.CONTRACT:
				return "Contract";
			case JobType.INTERNSHIP:
				return "Internship";
			case JobType.FREELANCE:
				return "Freelance";
			default:
				return jobType;
		}
	};

	const getCompensationLabel = (compensation: string) => {
		switch (compensation) {
			case CompensationType.SALARY:
				return "Salary";
			case CompensationType.HOURLY:
				return "Hourly";
			case CompensationType.PROJECT_BASED:
				return "Project Based";
			case CompensationType.COMMISSION:
				return "Commission";
			default:
				return compensation;
		}
	};

	// Don't render until mounted
	if (!mounted) {
		return <div>Loading...</div>;
	}

	return (
		<Stack gap={0}>
			<Table.ScrollArea maxW={{ base: "sm", md: "full" }}>
				<Table.Root size={"lg"} stickyHeader interactive>
					<Table.Header>
						<Table.Row bgColor={"bg.card"}>
							<Heading as={Table.ColumnHeader} size={"sm"}>
								Title
							</Heading>
							<Heading as={Table.ColumnHeader} size={"sm"}>
								Company
							</Heading>
							<Heading as={Table.ColumnHeader} size={"sm"}>
								Location
							</Heading>
							<Heading as={Table.ColumnHeader} size={"sm"}>
								Work Type
							</Heading>
							<Heading as={Table.ColumnHeader} size={"sm"}>
								Job Type
							</Heading>
							<Heading as={Table.ColumnHeader} size={"sm"}>
								Compensation
							</Heading>
							<Heading as={Table.ColumnHeader} size={"sm"}>
								Status
							</Heading>
							<Heading as={Table.ColumnHeader} size={"sm"}>
								Applications
							</Heading>
							<Heading as={Table.ColumnHeader} size={"sm"}>
								Created
							</Heading>
							<Heading as={Table.ColumnHeader} size={"sm"}>
								Actions
							</Heading>
						</Table.Row>
					</Table.Header>
					{loading ? (
						<TableSkeleton rows={5} columns={10} />
					) : (
						<Table.Body>
							<For each={jobs}>
								{(job) => (
									<Table.Row key={job.id}>
										<Table.Cell>
											<Stack gap={0}>
												<Heading size={"sm"}>{job.title}</Heading>
												<Text fontSize="sm" color="fg.muted">
													{job.compensation === CompensationType.SALARY ? "Annual Salary" : "Rate"}
												</Text>
											</Stack>
										</Table.Cell>
										<Table.Cell>{job.company}</Table.Cell>
										<Table.Cell>{job.location}</Table.Cell>
										<Table.Cell>
											<Badge variant={"outline"} colorPalette={"blue"}>
												{getWorkTypeLabel(job.workType)}
											</Badge>
										</Table.Cell>
										<Table.Cell>
											<Badge variant={"outline"} colorPalette={"purple"}>
												{getJobTypeLabel(job.jobType)}
											</Badge>
										</Table.Cell>
										<Table.Cell>
											<Badge variant={"outline"} colorPalette={"green"}>
												{getCompensationLabel(job.compensation)}
											</Badge>
										</Table.Cell>
										<Table.Cell>
											<Badge variant={"solid"} colorPalette={getStatusColor(job.status)}>
												{job.status.charAt(0).toUpperCase() + job.status.slice(1)}
											</Badge>
										</Table.Cell>
										<Table.Cell>
											<Text fontWeight="medium">job.applications</Text>
										</Table.Cell>
										<Table.Cell>
											<Stack gap={0}>
												<Text>{formatDate(job.createdAt)}</Text>
												<Text fontSize="sm" color="fg.muted">
													{job.expiresAt ? `Expires ${formatDate(job.expiresAt)}` : "No expiry"}
												</Text>
											</Stack>
										</Table.Cell>
										<Table.Cell>
											<HStack>
												<IconButton variant={"ghost"} rounded={"full"} _hover={{ color: "primary" }} asChild>
													<Link href={`/recruiter/job/${job.id}`}>
														<LuEye />
													</Link>
												</IconButton>
												<IconButton variant={"ghost"} rounded={"full"} _hover={{ color: "primary" }} asChild>
													<Link href={`/recruiter/job/${job.id}/edit`}>
														<LuPencil />
													</Link>
												</IconButton>
												<IconButton variant={"ghost"} rounded={"full"} _hover={{ color: "primary" }}>
													<LuTrash2 />
												</IconButton>
											</HStack>
										</Table.Cell>
									</Table.Row>
								)}
							</For>
						</Table.Body>
					)}
				</Table.Root>
			</Table.ScrollArea>
			<PaginationComponent count={totalCount} page={currentPage} limit={limit} padding={2} bgColor={"bg.card"} display={"flex"} justifyContent={"center"} />
		</Stack>
	);
};
