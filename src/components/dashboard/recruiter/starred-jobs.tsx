import { AppCard, AppCardHeadless } from "@/components/ui/app-card";
import { ViewAllButton } from "@/components/ui/view-all-button";
import { ListJobsQuery } from "@/graphql/generated/graphql";
import { For, Heading, HStack, Span, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";

interface StarredJobsOverviewProps {
	starredJobs: ListJobsQuery["jobs"]["data"];
}

export const StarredJobsOverview: FC<StarredJobsOverviewProps> = ({ starredJobs }) => {
	return (
		<AppCard title="Starred Jobs" description="Manage all your starred jobs" action={<ViewAllButton href={"/recruiter/job/starred"} />}>
			<Stack gap={4}>
				<For each={starredJobs} fallback={<Text>No starred jobs found</Text>}>
					{(job) => (
						<AppCardHeadless asChild key={job.id} bgColor={"bg.card"}>
							<Link href={`/recruiter/job/${job.id}`}>
								<HStack justify={"space-between"}>
									<Stack gap={0}>
										<Heading fontSize={"md"}>{job.title}</Heading>
										<Text fontSize={"sm"}>
											<Span fontWeight={"bold"} color={"primary"}>
												{job.company}
											</Span>
											, {job.location}
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
