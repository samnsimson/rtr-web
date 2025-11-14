import { ActionCards } from "@/components/dashboard/recruiter/action-cards";
import { RecentJobs } from "@/components/dashboard/recruiter/recent-jobs";
import { OverviewNumbers } from "@/components/dashboard/recruiter/numbers";
import { RecentRtrList } from "@/components/dashboard/recruiter/recent-rtr-list";
import { Button, Flex, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { StarredJobsOverview } from "@/components/dashboard/recruiter/starred-jobs";
import { api } from "@/lib/api";
import { LuPlus } from "react-icons/lu";
import Link from "next/link";

const RecruitedDashboardPage = async () => {
	const overviewDataPromise = api.getOverview();
	const recentRtrsDataPromise = api.getRecentRtrs();
	const recentJobsDataPromise = api.getRecentJobs();
	const starredJobsPromise = api.getStarredJobs();
	const [overviewData, recentRtrsData, recentJobsData, starredJobsData] = await Promise.all([
		overviewDataPromise,
		recentRtrsDataPromise,
		recentJobsDataPromise,
		starredJobsPromise,
	]);
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
			<SimpleGrid columns={{ base: 1, md: 2 }} columnGap={4}>
				<Stack spaceY={4}>
					<RecentRtrList recentRtrs={recentRtrsData} />
					<StarredJobsOverview starredJobs={starredJobsData.data} />
				</Stack>
				<Stack spaceY={4}>
					<RecentJobs recentJobs={recentJobsData.data} />
				</Stack>
			</SimpleGrid>
			<ActionCards />
		</Stack>
	);
};
export default RecruitedDashboardPage;
