import { RtrDataTable } from "@/components/dashboard/recruiter/rtr/rtr-data-table";
import { RtrSearchFilter } from "@/components/dashboard/recruiter/rtr/rtr-search-filter";
import { Button, Flex, GridItem, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";
import { FC } from "react";
import Link from "next/link";
import { AppCard } from "@/components/ui/app-card";

const RtrListPage: FC<PageProps<"/recruiter/rtr">> = async ({ searchParams }) => {
	const params = (await searchParams) as Record<string, string>;
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
			<SimpleGrid columns={{ base: 1, md: 4 }} gap={4}>
				<GridItem colSpan={{ base: 1, md: 1 }} spaceY={4}>
					<RtrSearchFilter />
				</GridItem>
				<GridItem colSpan={{ base: 1, md: 3 }} spaceY={4}>
					<AppCard title="RTRs" description="Manage all your RTRs" noPadding>
						<RtrDataTable params={params} />
					</AppCard>
				</GridItem>
			</SimpleGrid>
		</Stack>
	);
};
export default RtrListPage;
