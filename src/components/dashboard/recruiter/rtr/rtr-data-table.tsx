"use client";
import { Badge, HStack, Heading, VStack, Text, Icon } from "@chakra-ui/react";
import { format } from "date-fns";
import { LuCheck, LuClock, LuEye, LuPencil, LuSend, LuX } from "react-icons/lu";
import { CgMoreAlt } from "react-icons/cg";
import { DataTable, DataTableColumn, DataTableAction } from "@/components/ui/data-table";
import { calculateExpiry, toEnum } from "@/lib/utils";
import { CompensationType, ListRtrsDocument, ListRtrsQuery, ListRtrsQueryVariables, RtrFiltersInput, RtrStatus } from "@/graphql/generated/graphql";
import { useQuery } from "@apollo/client/react";
import { IconType } from "react-icons/lib";
import { FC, useEffect } from "react";

interface RtrDataTableProps {
	params: Record<string, string>;
}

const color: Record<string, string> = {
	[RtrStatus.Pending]: "yellow",
	[RtrStatus.Signed]: "green",
	[RtrStatus.Rejected]: "red",
	[RtrStatus.Expired]: "gray",
	[RtrStatus.Viewed]: "blue",
	[RtrStatus.Sent]: "purple",
	[RtrStatus.Draft]: "orange",
};

const statusIcon: Record<string, IconType> = {
	[RtrStatus.Pending]: LuClock,
	[RtrStatus.Signed]: LuCheck,
	[RtrStatus.Rejected]: LuX,
	[RtrStatus.Expired]: LuClock,
	[RtrStatus.Viewed]: LuEye,
	[RtrStatus.Sent]: LuSend,
	[RtrStatus.Draft]: LuPencil,
};

const getFilters = (searchParams: Record<string, string>): RtrFiltersInput => {
	return {
		candidateName: searchParams.query,
		company: searchParams.company,
		jobTitle: searchParams.jobTitle,
		status: toEnum(searchParams.status, RtrStatus),
	};
};

const columns: Array<DataTableColumn<ListRtrsQuery["rtrs"][number]>> = [
	{
		key: "candidate",
		label: "Candidate",
		render: (item) => (
			<VStack align={"flex-start"} gap={0}>
				<Heading size={"sm"}>
					{item.candidateFirstName} {item.candidateLastName}
				</Heading>
				<Text>{item.candidateEmail}</Text>
			</VStack>
		),
	},
	{
		key: "job",
		label: "Position",
		render: (item) => (
			<VStack align={"flex-start"} gap={0}>
				<Heading size={"sm"}>{item.job?.title}</Heading>
				<Text>{item.job?.company}</Text>
			</VStack>
		),
	},
	{
		key: "compensation",
		label: "Compensation",
		render: (item) => (
			<HStack justify={"flex-start"} align={"center"} gap={2}>
				<Heading fontSize={"md"} color={"primary"}>
					${item.compensation}
				</Heading>
				<Text fontSize={"sm"}>{item.compensationType === CompensationType.Hourly ? "Per Hour" : "Yearly"}</Text>
			</HStack>
		),
	},
	{
		key: "status",
		label: "Acceptance Status",
		render: (item) => (
			<Badge variant={"solid"} colorPalette={color[item.status]}>
				<Icon as={statusIcon[item.status]} />
				{item.status.charAt(0).toUpperCase() + item.status.slice(1)}
			</Badge>
		),
	},
	{
		key: "expiresAt",
		label: "Sent Date",
		render: (item) => format(item.expiresAt, "PPP"),
	},
	{
		key: "expiresAt",
		label: "Expires In",
		render: (item) => calculateExpiry(item.expiresAt),
	},
];

const actions: Array<DataTableAction<ListRtrsQuery["rtrs"][number]>> = [
	{
		key: "view",
		icon: LuEye,
		href: (item) => `/recruiter/rtr/${item.id}`,
	},
	{
		key: "more",
		icon: CgMoreAlt,
		onClick: (item) => {
			console.log("More actions for", item.id);
		},
	},
];

export const RtrDataTable: FC<RtrDataTableProps> = ({ params }) => {
	const { data, loading, refetch } = useQuery<ListRtrsQuery, ListRtrsQueryVariables>(ListRtrsDocument);

	useEffect(() => {
		refetch({ filters: getFilters(params) });
	}, [params, refetch]);

	return (
		<DataTable
			columns={columns}
			data={data?.rtrs || []}
			loading={loading}
			actions={actions}
			pagination={{ count: data?.rtrs.length || 0, limit: 10 }}
			fallbackRows={6}
			fallbackColumns={7}
		/>
	);
};
