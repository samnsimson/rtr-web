"use client";
import { Heading, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import { LuFileText } from "react-icons/lu";
import { DataTable, EmptyStateProps } from "@/components/ui/data-table";
import { ListRtrTemplatesDocument, ListRtrTemplatesQuery } from "@/graphql/generated/graphql";
import { useQuery } from "@apollo/client/react";
import { createColumnHelper } from "@tanstack/react-table";

interface RtrTemplateTable {
	id: string;
	name: string;
	description: string;
	createdAt: Date;
	updatedAt: Date;
}

export const RtrTemplateDataTable = () => {
	const { data, loading } = useQuery<ListRtrTemplatesQuery>(ListRtrTemplatesDocument);
	const columnHelper = createColumnHelper<RtrTemplateTable>();
	const { rtrTemplates = [] } = data || {};

	const tableData: RtrTemplateTable[] = rtrTemplates.map((rtrTemplate) => ({
		id: rtrTemplate.id,
		name: rtrTemplate.name,
		description: rtrTemplate.description || "",
		createdAt: rtrTemplate.createdAt,
		updatedAt: rtrTemplate.updatedAt,
	}));

	const tableColumns = [
		columnHelper.accessor("name", { header: "Template Name", cell: ({ row }) => <Heading size={"sm"}>{row.original.name}</Heading> }),
		columnHelper.accessor("description", { header: "Description", cell: ({ row }) => <Text fontSize={"sm"}>{row.original.description}</Text> }),
		columnHelper.accessor("createdAt", { header: "Created", cell: ({ row }) => format(new Date(row.original.createdAt), "PPP") }),
		columnHelper.accessor("updatedAt", { header: "Last Updated", cell: ({ row }) => format(new Date(row.original.updatedAt), "PPP") }),
	];

	const emptyState: EmptyStateProps = {
		icon: LuFileText,
		title: "No RTR templates found",
		description: "Create your first RTR template to get started with recruiting.",
	};

	return <DataTable columns={tableColumns} data={tableData} fallbackRows={5} fallbackColumns={tableColumns.length} loading={loading} emptyState={emptyState} />;
};
