import { ActionCards } from "@/components/dashboard/recruiter/action-cards";
import { RecentJobs } from "@/components/dashboard/recruiter/recent-jobs";
import { OverviewNumbers } from "@/components/dashboard/recruiter/numbers";
import { RecentRtrList } from "@/components/dashboard/recruiter/recent-rtr-list";
import { Button, Flex, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { api } from "@/lib/api";
import { LuPlus } from "react-icons/lu";

const RecruitedDashboardPage = async () => {
	const overviewData = await api.getOverview();
	const recentRtrsData = await api.getRecentRtrs();
	const recentJobsData = await api.getRecentJobs();
	const counts = [
		{ label: "Total RTRs", count: overviewData.totalRtrs, color: "primary" },
		{ label: "Total Jobs", count: overviewData.totalJobs, color: "secondary" },
		{ label: "Active Jobs", count: overviewData.activeJobs, color: "teal" },
		{ label: "Job applications", count: overviewData.totalJobApplications, color: "danger" },
	];
	return (
		<Stack p={4} gap={4}>
			<Flex alignItems={"center"} justifyContent={"space-between"}>
				<Stack gap={0}>
					<Heading fontSize={"2xl"}>Welcome Back!</Heading>
					<Text>Here&rsquo;s what&rsquo;s happening with your RTRs today.</Text>
				</Stack>
				<Button asChild variant={"solid"} colorPalette={"blue"}>
					<Link href={"/recruiter/rtr/create"}>
						<LuPlus /> Create New RTR
					</Link>
				</Button>
			</Flex>
			<SimpleGrid columns={{ base: 1, md: 4 }} gap={4}>
				<OverviewNumbers counts={counts} />
			</SimpleGrid>
			<SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
				<RecentRtrList recentRtrs={recentRtrsData} />
				<RecentJobs recentJobs={recentJobsData.data} />
			</SimpleGrid>
			<ActionCards />
		</Stack>
	);
};
export default RecruitedDashboardPage;
