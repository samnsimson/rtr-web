import { RtrDataTable } from "@/components/dashboard/recruiter/rtr/rtr-data-table";
import { RtrSearchFilter } from "@/components/dashboard/recruiter/rtr/rtr-search-filter";
import { Button, Card, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { LuPlus } from "react-icons/lu";

const RtrListPage = () => {
	return (
		<Stack padding={4} gap={4}>
			<Flex alignItems={"center"} justifyContent={"space-between"}>
				<Stack gap={0}>
					<Heading fontSize={"2xl"}>RTR List</Heading>
					<Text>Manage all your Right to Represent forms</Text>
				</Stack>
				<Button asChild variant={"solid"} colorPalette={"blue"}>
					<Link href={"/recruiter/rtr/create"}>
						<LuPlus /> Create New RTR
					</Link>
				</Button>
			</Flex>
			<RtrSearchFilter />
			<Card.Root>
				<Card.Body padding={0}>
					<RtrDataTable />
				</Card.Body>
			</Card.Root>
		</Stack>
	);
};
export default RtrListPage;
