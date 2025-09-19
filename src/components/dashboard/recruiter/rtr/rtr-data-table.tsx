"use client";
import { PaginationComponent } from "@/components/ui/pagination-component";
import { Badge, For, Heading, HStack, IconButton, Stack, Table, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import { CgMoreAlt } from "react-icons/cg";
import { LuEye } from "react-icons/lu";
import Link from "next/link";
import { RtrStatus } from "@/graphql/generated/graphql";
import { useQuery } from "@apollo/client/react";
import { ListRtrsDocument } from "@/graphql/generated/graphql";
import { TableSkeleton } from "@/components/ui/table-skeleton";

export const RtrDataTable = () => {
	const { data } = useQuery(ListRtrsDocument);
	const color: Record<string, string> = { [RtrStatus.Signed]: "green", [RtrStatus.Pending]: "yellow", [RtrStatus.Viewed]: "blue", [RtrStatus.Expired]: "red" };
	return (
		<Stack gap={0}>
			<Table.ScrollArea maxW={{ base: "sm", md: "full" }}>
				<Table.Root size={"lg"} stickyHeader interactive>
					<Table.Header>
						<Table.Row bgColor={"bg.card"}>
							<Heading as={Table.ColumnHeader} size={"sm"}>
								Candidate
							</Heading>
							<Heading as={Table.ColumnHeader} size={"sm"}>
								Position
							</Heading>
							<Heading as={Table.ColumnHeader} size={"sm"}>
								Company
							</Heading>
							<Heading as={Table.ColumnHeader} size={"sm"}>
								Status
							</Heading>
							<Heading as={Table.ColumnHeader} size={"sm"}>
								Sent Date
							</Heading>
							<Heading as={Table.ColumnHeader} size={"sm"}>
								Action
							</Heading>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						<For each={data?.rtrs || []} fallback={<TableSkeleton columns={6} rows={6} />}>
							{(item) => (
								<Table.Row key={item.id}>
									<Table.Cell>
										<Stack gap={0}>
											<Heading size={"sm"}>
												{item.candidateFirstName} {item.candidateLastName}
											</Heading>
											<Text>{item.candidateEmail}</Text>
										</Stack>
									</Table.Cell>
									<Table.Cell>{item.job?.title}</Table.Cell>
									<Table.Cell>{item.job?.company}</Table.Cell>
									<Table.Cell>
										<Badge variant={"solid"} colorPalette={color[item.status]}>
											{item.status.charAt(0).toUpperCase() + item.status.slice(1)}
										</Badge>
									</Table.Cell>
									<Table.Cell>{format(item.expiresAt, "PPP")}</Table.Cell>
									<Table.Cell>
										<HStack>
											<IconButton variant={"ghost"} rounded={"full"} _hover={{ color: "primary" }} asChild>
												<Link href={`/recruiter/rtr/${item.id}`}>
													<LuEye />
												</Link>
											</IconButton>
											<IconButton variant={"ghost"} rounded={"full"} _hover={{ color: "primary" }}>
												<CgMoreAlt />
											</IconButton>
										</HStack>
									</Table.Cell>
								</Table.Row>
							)}
						</For>
					</Table.Body>
				</Table.Root>
			</Table.ScrollArea>
			<PaginationComponent count={data?.rtrs?.length || 0} padding={2} bgColor={"bg.card"} display={"flex"} justifyContent={"center"} limit={10} />
		</Stack>
	);
};
