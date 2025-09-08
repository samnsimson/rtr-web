import { PaginationComponent } from "@/components/ui/pagination-component";
import { Badge, For, Heading, HStack, IconButton, Stack, Table, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import { CgMoreAlt } from "react-icons/cg";
import { LuEye } from "react-icons/lu";
import Link from "next/link";
import { RTRStatus } from "@prisma/client";

const dataTableItems = [
	{
		id: 1,
		name: "Sam Nishanth Simson",
		email: "samnsimson@gmail.com",
		position: "Senior Software Engineer",
		company: "TechCorp Inc.",
		status: RTRStatus.SIGNED,
		date: new Date(),
	},
	{
		id: 2,
		name: "Sam Nishanth Simson",
		email: "samnsimson@gmail.com",
		position: "Senior Software Engineer",
		company: "Florida Blue",
		status: RTRStatus.SIGNED,
		date: new Date(),
	},
	{
		id: 3,
		name: "Sam Nishanth Simson",
		email: "samnsimson@gmail.com",
		position: "Senior Software Engineer",
		company: "Blue Cross Blue Sheild",
		status: RTRStatus.VIEWED,
		date: new Date(),
	},
	{ id: 4, name: "Sam Nishanth Simson", email: "samnsimson@gmail.com", position: "Senior Software Engineer", company: "FoodHub", status: RTRStatus.PENDING, date: new Date() },
	{
		id: 5,
		name: "Sam Nishanth Simson",
		email: "samnsimson@gmail.com",
		position: "Senior Software Engineer",
		company: "Matrimony.com",
		status: RTRStatus.EXPIRED,
		date: new Date(),
	},
	{
		id: 6,
		name: "Sam Nishanth Simson",
		email: "samnsimson@gmail.com",
		position: "Senior Software Engineer",
		company: "Emazzanti Technologies",
		status: RTRStatus.SIGNED,
		date: new Date(),
	},
	{ id: 7, name: "Sam Nishanth Simson", email: "samnsimson@gmail.com", position: "Senior Software Engineer", company: "Flykart", status: RTRStatus.VIEWED, date: new Date() },
];

export const RtrDataTable = () => {
	const color: Record<string, string> = { signed: "green", pending: "yellow", viewed: "blue", expired: "red" };
	return (
		<Stack gap={0}>
			<Table.ScrollArea maxW={{ base: "sm", md: "full" }}>
				<Table.Root size={"lg"} stickyHeader interactive>
					<Table.Header>
						<Table.Row bgColor={"bg.card"}>
							<Heading as={Table.ColumnHeader} size={"sm"}>
								ID
							</Heading>
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
						<For each={dataTableItems}>
							{(item) => (
								<Table.Row key={item.id}>
									<Table.Cell>{item.id}</Table.Cell>
									<Table.Cell>
										<Stack gap={0}>
											<Heading size={"sm"}>{item.name}</Heading>
											<Text>{item.email}</Text>
										</Stack>
									</Table.Cell>
									<Table.Cell>{item.position}</Table.Cell>
									<Table.Cell>{item.company}</Table.Cell>
									<Table.Cell>
										<Badge variant={"solid"} colorPalette={color[item.status]}>
											{item.status.charAt(0).toUpperCase() + item.status.slice(1)}
										</Badge>
									</Table.Cell>
									<Table.Cell>{format(item.date, "PPP")}</Table.Cell>
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
			<PaginationComponent count={dataTableItems.length} padding={2} bgColor={"bg.card"} display={"flex"} justifyContent={"center"} />
		</Stack>
	);
};
