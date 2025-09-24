"use client";
import { EmptyState, For, Heading, Icon, Stack, Table, VStack } from "@chakra-ui/react";
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import { FC, useState } from "react";
import { IconType } from "react-icons/lib";
import { TableSkeleton } from "./table-skeleton";
import { LuFolderOpen } from "react-icons/lu";
import { PaginationComponent } from "./pagination-component";

export interface EmptyStateProps {
	title?: string;
	description?: string;
	icon?: IconType;
}

interface DataTableProps<Data extends object> {
	data: Data[];
	columns: ColumnDef<Data, any>[];
	fallbackRows: number;
	fallbackColumns: number;
	loading: boolean;
	emptyState?: EmptyStateProps;
}

interface DataTableFallbackProps {
	columns: any[];
	fallbackRows: number;
	fallbackColumns: number;
	loading: boolean;
	emptyState?: EmptyStateProps;
	data: any[];
}

const DataTableFallback: FC<DataTableFallbackProps> = ({ columns, fallbackRows, fallbackColumns, loading, data, emptyState }) => {
	return loading ? (
		<TableSkeleton columns={fallbackColumns} rows={fallbackRows} />
	) : data.length === 0 ? (
		<Table.Row>
			<Table.Cell colSpan={columns.length + 1} textAlign={"center"}>
				<EmptyState.Root size={"sm"}>
					<EmptyState.Content>
						<EmptyState.Indicator>
							<Icon as={emptyState?.icon || LuFolderOpen} />
						</EmptyState.Indicator>
						<VStack textAlign="center" gap={0}>
							<EmptyState.Title>{emptyState?.title || "No data found"}</EmptyState.Title>
							<EmptyState.Description>{emptyState?.description || "Create a new item to get started"}</EmptyState.Description>
						</VStack>
					</EmptyState.Content>
				</EmptyState.Root>
			</Table.Cell>
		</Table.Row>
	) : null;
};

export function DataTable<Data extends object>({ data, columns, fallbackRows, fallbackColumns, loading, emptyState }: DataTableProps<Data>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel(), getSortedRowModel: getSortedRowModel(), onSortingChange: setSorting, state: { sorting } });

	return (
		<Stack gap={0}>
			<Table.ScrollArea maxW={{ base: "sm", md: "full" }}>
				<Table.Root size={"lg"} stickyHeader interactive>
					<Table.Header>
						<For each={table.getHeaderGroups()}>
							{(headerGroup) => (
								<Table.Row key={headerGroup.id} bgColor={"bg.card"}>
									<For each={headerGroup.headers}>
										{(header) => (
											<Heading as={Table.ColumnHeader} size={"sm"} key={header.id}>
												{flexRender(header.column.columnDef.header, header.getContext())}
											</Heading>
										)}
									</For>
								</Table.Row>
							)}
						</For>
					</Table.Header>
					<Table.Body>
						<For
							each={table.getRowModel().rows}
							fallback={
								<DataTableFallback
									columns={columns}
									fallbackRows={fallbackRows}
									fallbackColumns={fallbackColumns}
									loading={loading}
									data={data}
									emptyState={emptyState}
								/>
							}
						>
							{(row) => (
								<Table.Row key={row.id}>
									<For each={row.getVisibleCells()}>
										{(cell) => <Table.Cell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Table.Cell>}
									</For>
								</Table.Row>
							)}
						</For>
					</Table.Body>
				</Table.Root>
			</Table.ScrollArea>
			<PaginationComponent count={data.length} padding={2} bgColor={"bg.card"} display={"flex"} justifyContent={"center"} limit={10} />
		</Stack>
	);
}
