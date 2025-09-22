"use client";
import { Badge, Heading, VStack, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import { LuEye, LuPencil, LuTrash2 } from "react-icons/lu";
import { DataTable, DataTableColumn, DataTableAction } from "@/components/ui/data-table";
import { ListRtrTemplatesDocument, ListRtrTemplatesQuery } from "@/graphql/generated/graphql";
import { useQuery } from "@apollo/client/react";

export const RtrTemplateDataTable = () => {
	const { data, loading } = useQuery(ListRtrTemplatesDocument);

	const columns: DataTableColumn<ListRtrTemplatesQuery["rtrTemplates"][number]>[] = [
		{
			key: "name",
			label: "Template Name",
			render: (item) => (
				<VStack align={"flex-start"} gap={0}>
					<Heading size={"sm"}>{item.name}</Heading>
					<Text fontSize={"sm"} color={"gray.500"}>
						{item.description}
					</Text>
				</VStack>
			),
		},
		{
			key: "isActive",
			label: "Status",
			render: () => (
				<Badge variant={"solid"} colorPalette={"green"}>
					Active
				</Badge>
			),
		},
		{
			key: "createdAt",
			label: "Created",
			render: (item) => format(new Date(item.createdAt), "PPP"),
		},
		{
			key: "updatedAt",
			label: "Last Updated",
			render: (item) => format(new Date(item.updatedAt), "PPP"),
		},
	];

	const actions: DataTableAction<ListRtrTemplatesQuery["rtrTemplates"][number]>[] = [
		{
			key: "view",
			icon: LuEye,
			href: (item) => `/recruiter/rtr/template/${item.id}`,
		},
		{
			key: "edit",
			icon: LuPencil,
			href: (item) => `/recruiter/rtr/template/${item.id}`,
		},
		{
			key: "delete",
			icon: LuTrash2,
			onClick: (item) => console.log(item),
			colorPalette: "red",
			_hover: { color: "red.500" },
		},
	];

	return (
		<DataTable
			columns={columns}
			data={data?.rtrTemplates || []}
			loading={loading}
			actions={actions}
			pagination={{ count: data?.rtrTemplates.length || 0, limit: 10 }}
			fallbackRows={5}
			fallbackColumns={5}
		/>
	);
};
