import { ActionCards } from "@/components/dashboard/recruiter/action-cards";
import { OverviewNumbers } from "@/components/dashboard/recruiter/numbers";
import { RecentRtrList } from "@/components/dashboard/recruiter/recent-rtr-list";
import { Button, Flex, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";

const counts = [
	{ count: 24, color: "primary" },
	{ count: 18, color: "secondary" },
	{ count: 6, color: "teal" },
	{ count: 24, color: "danger" },
];

const RecruitedDashboardPage = () => {
	return (
		<Stack p={4} gap={8}>
			<Flex alignItems={"center"} justifyContent={"space-between"}>
				<Stack gap={0}>
					<Heading fontSize={"2xl"}>Welcome Back!</Heading>
					<Text>Here&rsquo;s what&rsquo;s happening with your RTRs today.</Text>
				</Stack>
				<Button asChild size={{ base: "md", md: "xl" }} variant={"solid"} colorPalette={"blue"}>
					<Link href={"/recruiter/rtr/create"}>
						<PlusCircleIcon /> Create New RTR
					</Link>
				</Button>
			</Flex>
			<SimpleGrid columns={{ base: 1, md: 4 }} gap={{ base: 4, md: 8 }}>
				<OverviewNumbers counts={counts} />
			</SimpleGrid>
			<RecentRtrList />
			<ActionCards />
		</Stack>
	);
};
export default RecruitedDashboardPage;
