import { AppCard, AppCardHeadless } from "@/components/ui/app-card";
import { ViewAllButton } from "@/components/ui/view-all-button";
import { JobStatus, ListJobsQuery } from "@/graphql/generated/graphql";
import { Badge, For, Heading, HStack, Link, Stack, Text, Box } from "@chakra-ui/react";
import { format } from "date-fns";
import { FC } from "react";

interface RecentJobsProps {
	recentJobs: ListJobsQuery["jobs"]["data"];
}

const getStatusColor = (status: string) => {
	switch (status) {
		case JobStatus.Active:
			return "green";
		case JobStatus.Inactive:
			return "yellow";
		case JobStatus.Closed:
			return "red";
		case JobStatus.Draft:
			return "gray";
		default:
			return "blue";
	}
};

export const RecentJobs: FC<RecentJobsProps> = ({ recentJobs }) => {
	return (
		<AppCard title="Recent Jobs" description="Your latest job activity and status updates" action={<ViewAllButton href={"/recruiter/job"} />}>
			<Stack gap={4}>
				<For each={recentJobs} fallback={<Text>No recent jobs found</Text>}>
					{(job) => (
						<AppCardHeadless asChild key={job.id} bgColor={"bg.card"}>
							<Link href={`/recruiter/job/${job.id}`}>
								<HStack justify={"space-between"} width={"full"}>
									<Stack gap={0}>
										<Heading fontSize={"md"}>{job.title}</Heading>
										<Text fontSize={"sm"}>{job.company}</Text>
										<Text fontSize={"sm"}>{job.location}</Text>
									</Stack>
									<Stack alignItems={"flex-end"} gap={0}>
										<Box>
											<Badge variant={"solid"} colorPalette={getStatusColor(job.status)}>
												{job.status}
											</Badge>
										</Box>
										<Text fontSize={"sm"}>
											Created: <b>{format(job.createdAt, "PP")}</b>
										</Text>
										<Text fontSize={"sm"}>
											Expires: <b>{job.expiresAt ? format(job.expiresAt, "PP") : "N/A"}</b>
										</Text>
									</Stack>
								</HStack>
							</Link>
						</AppCardHeadless>
					)}
				</For>
			</Stack>
		</AppCard>
	);
};
