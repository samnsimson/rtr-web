"use client";
import { Badge, HStack, Heading, VStack, Text, Icon, IconButton, FormatNumber, Link } from "@chakra-ui/react";
import { format } from "date-fns";
import { LuBriefcase, LuExternalLink, LuPencil, LuTrash2 } from "react-icons/lu";
import { DataTable, EmptyStateProps } from "@/components/ui/data-table";
import { toEnum } from "@/lib/utils";
import { CompensationType, ListRtrsDocument, ListRtrsQuery, ListRtrsQueryVariables, RtrFiltersInput, RtrStatus } from "@/graphql/generated/graphql";
import { useQuery } from "@apollo/client/react";
import { FC, useEffect } from "react";
import { color, statusIcon } from "@/lib/constants";
import { createColumnHelper, Row } from "@tanstack/react-table";

interface RtrDataTableProps {
	params: Record<string, string>;
}

interface RtrTable {
	id: string;
	candidate: {
		firstName: string;
		lastName: string;
		email: string;
		phone: string;
	};
	jobId: string;
	jobTitle: string;
	jobCompany: string;
	compensation: number;
	compensationType: CompensationType;
	status: RtrStatus;
	expiresAt: Date;
}

const getFilters = (searchParams: Record<string, string>): RtrFiltersInput => {
	return {
		candidateName: searchParams.query,
		company: searchParams.company,
		jobTitle: searchParams.jobTitle,
		status: toEnum(searchParams.status, RtrStatus),
	};
};

const RtrCandidateCell: FC<{ row: Row<RtrTable> }> = ({ row }) => {
	return (
		<VStack align={"flex-start"} gap={0}>
			<Heading size={"sm"}>
				{row.original.candidate.firstName} {row.original.candidate.lastName}
			</Heading>
			<Text>{row.original.candidate.email}</Text>
		</VStack>
	);
};

const RtrJobCell: FC<{ row: Row<RtrTable> }> = ({ row }) => {
	return (
		<VStack align={"flex-start"} gap={0}>
			<Heading size={"sm"}>{row.original.jobTitle}</Heading>
			<Text>{row.original.jobCompany}</Text>
		</VStack>
	);
};

const RtrCompensationCell: FC<{ row: Row<RtrTable> }> = ({ row }) => {
	return (
		<HStack justify={"flex-start"} align={"center"} gap={2}>
			<Heading fontSize={"md"} color={"primary"}>
				<FormatNumber value={row.original.compensation} style="currency" currency="USD" />
			</Heading>
			<Text fontSize={"sm"}>{row.original.compensationType === CompensationType.Hourly ? "Per Hour" : "Yearly"}</Text>
		</HStack>
	);
};

const RtrStatusCell: FC<{ row: Row<RtrTable> }> = ({ row }) => {
	return (
		<Badge variant={"solid"} colorPalette={color[row.original.status]}>
			<Icon as={statusIcon[row.original.status]} />
			{row.original.status.charAt(0).toUpperCase() + row.original.status.slice(1)}
		</Badge>
	);
};

const RtrExpiresAtCell: FC<{ row: Row<RtrTable> }> = ({ row }) => {
	return <Text>{format(row.original.expiresAt, "PPP")}</Text>;
};

const RowActions: FC<{ row: Row<RtrTable> }> = ({ row }) => {
	return (
		<HStack justify={"flex-end"}>
			<IconButton asChild variant={"ghost"} size={"sm"}>
				<Link href={`/recruiter/rtr/${row.original.id}`}>
					<LuExternalLink />
				</Link>
			</IconButton>
			<IconButton variant={"ghost"} size={"sm"}>
				<LuPencil />
			</IconButton>
			<IconButton variant={"ghost"} size={"sm"} colorPalette={"red"}>
				<LuTrash2 />
			</IconButton>
		</HStack>
	);
};

export const RtrDataTable: FC<RtrDataTableProps> = ({ params }) => {
	const { data, loading, refetch } = useQuery<ListRtrsQuery, ListRtrsQueryVariables>(ListRtrsDocument);
	const { rtrs = [] } = data || {};

	const columnHelper = createColumnHelper<RtrTable>();

	const tableData: RtrTable[] = rtrs.map((rtr) => ({
		id: rtr.id,
		candidate: { firstName: rtr.candidateFirstName, lastName: rtr.candidateLastName, email: rtr.candidateEmail, phone: rtr.candidatePhone },
		jobId: rtr.jobId,
		jobTitle: rtr.job?.title ?? "",
		jobCompany: rtr.job?.company ?? "",
		compensation: rtr.compensation ?? 0,
		compensationType: rtr.compensationType,
		status: rtr.status,
		expiresAt: rtr.expiresAt,
	}));

	const tableColumns = [
		columnHelper.accessor("candidate", { header: "Candidate", cell: ({ row }) => <RtrCandidateCell row={row} /> }),
		columnHelper.accessor("jobTitle", { header: "Position", cell: ({ row }) => <RtrJobCell row={row} /> }),
		columnHelper.accessor("compensation", { header: "Compensation", cell: ({ row }) => <RtrCompensationCell row={row} /> }),
		columnHelper.accessor("status", { header: "Acceptance Status", cell: ({ row }) => <RtrStatusCell row={row} /> }),
		columnHelper.accessor("expiresAt", { header: "Sent Date", cell: ({ row }) => <RtrExpiresAtCell row={row} /> }),
		columnHelper.display({ header: "Actions", cell: ({ row }) => <RowActions row={row} /> }),
	];

	const emptyState: EmptyStateProps = {
		icon: LuBriefcase,
		title: "No RTRs found",
		description: "Create your first RTR to get started with recruiting.",
	};

	useEffect(() => {
		refetch({ filters: getFilters(params) });
	}, [params, refetch]);

	return <DataTable columns={tableColumns} data={tableData} fallbackRows={5} fallbackColumns={tableColumns.length} loading={loading} emptyState={emptyState} />;
};
