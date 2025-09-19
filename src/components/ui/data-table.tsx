"use client";
import { For, HStack, Heading, Icon, IconButton, Table, Stack, EmptyState, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { TableSkeleton } from "./table-skeleton";
import { PaginationComponent } from "./pagination-component";
import { FC } from "react";
import { IconType } from "react-icons/lib";
import { LuFolderOpen } from "react-icons/lu";

export interface DataTableColumn<T = any> {
	key: string;
	label: string;
	render?: (item: T, value: any) => React.ReactNode;
	width?: string;
	align?: "left" | "center" | "right";
}

export interface DataTableAction<T = any> {
	key: string;
	icon: any;
	href?: (item: T) => string;
	onClick?: (item: T) => void;
	variant?: "ghost" | "solid" | "outline";
	colorPalette?: string;
	_hover?: any;
}

export interface DataTableProps<T = any> {
	columns: DataTableColumn<T>[];
	data: T[];
	loading?: boolean;
	actions?: DataTableAction<T>[];
	pagination?: { count: number; limit?: number; onPageChange?: (page: number) => void };
	fallbackRows?: number;
	fallbackColumns?: number;
	tableProps?: any;
	scrollAreaProps?: any;
	emptyState?: EmptyStateProps;
}

export interface DataTableFallbackProps {
	columns: DataTableColumn<any>[];
	fallbackRows: number;
	fallbackColumns: number;
	loading: boolean;
	emptyState?: EmptyStateProps;
	data: any[];
}

export interface EmptyStateProps {
	title?: string;
	description?: string;
	icon?: IconType;
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

export const DataTable = <T extends Record<string, any>>({
	columns,
	data,
	loading = false,
	actions = [],
	pagination,
	fallbackRows = 6,
	fallbackColumns = 5,
	tableProps = {},
	scrollAreaProps = {},
	emptyState,
}: DataTableProps<T>) => {
	const getValue = (item: T, key: string) => {
		return key.split(".").reduce((obj, k) => obj?.[k], item);
	};

	return (
		<Stack gap={0}>
			<Table.ScrollArea maxW={{ base: "sm", md: "full" }} {...scrollAreaProps}>
				<Table.Root size={"lg"} stickyHeader interactive {...tableProps}>
					<Table.Header>
						<Table.Row bgColor={"bg.card"}>
							{columns.map((column) => (
								<Heading key={column.key} as={Table.ColumnHeader} size={"sm"} textAlign={column.align || "left"} width={column.width}>
									{column.label}
								</Heading>
							))}
							{actions.length > 0 && (
								<Heading as={Table.ColumnHeader} size={"sm"} textAlign={"right"}>
									Action
								</Heading>
							)}
						</Table.Row>
					</Table.Header>
					<Table.Body>
						<For
							each={data}
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
							{(item) => (
								<Table.Row key={item.id || JSON.stringify(item)}>
									{columns.map((column) => {
										const value = getValue(item, column.key);
										return (
											<Table.Cell key={column.key} textAlign={column.align || "left"}>
												{column.render ? column.render(item, value) : String(value || "")}
											</Table.Cell>
										);
									})}
									{actions.length > 0 && (
										<Table.Cell textAlign={"right"}>
											<HStack justify={"flex-end"}>
												{actions.map((action) => {
													const href = action.href?.(item);
													const content = (
														<IconButton
															key={action.key}
															variant={action.variant || "ghost"}
															rounded={"full"}
															colorPalette={action.colorPalette}
															_hover={action._hover || { color: "primary" }}
															onClick={() => action.onClick?.(item)}
														>
															<Icon as={action.icon} />
														</IconButton>
													);

													return href ? (
														<Link key={action.key} href={href as any} style={{ textDecoration: "none" }}>
															{content}
														</Link>
													) : (
														content
													);
												})}
											</HStack>
										</Table.Cell>
									)}
								</Table.Row>
							)}
						</For>
					</Table.Body>
				</Table.Root>
			</Table.ScrollArea>
			{pagination && (
				<PaginationComponent
					count={pagination.count}
					padding={2}
					bgColor={"bg.card"}
					display={"flex"}
					justifyContent={"center"}
					limit={pagination.limit || 10}
					onPageChange={(details) => pagination.onPageChange?.(details.page)}
				/>
			)}
		</Stack>
	);
};
