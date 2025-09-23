"use client";
import { RecentRtrsQuery } from "@/graphql/generated/graphql";
import { Badge, For, Heading, HStack, Icon, Span, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";
import { format } from "date-fns";
import { color, statusIcon } from "@/lib/constants";
import { AppCard, AppCardHeadless } from "@/components/ui/app-card";
import { ViewAllButton } from "@/components/ui/view-all-button";

interface RecentRtrListProps {
	recentRtrs: RecentRtrsQuery["rtrs"];
}

export const RecentRtrList: FC<RecentRtrListProps> = ({ recentRtrs }) => {
	return (
		<AppCard title="Recent RTRs" description="Your latest RTRs" action={<ViewAllButton href={"/recruiter/rtr"} />}>
			<Stack gap={4}>
				<For each={recentRtrs} fallback={<Text>No recent RTRs found</Text>}>
					{(rtr) => (
						<AppCardHeadless asChild key={rtr.id} bgColor={"bg.card"}>
							<Link href={`/recruiter/rtr/${rtr.id}`}>
								<HStack justify={"space-between"}>
									<Stack gap={0}>
										<Heading fontSize={"md"}>
											{rtr.candidateFirstName} {rtr.candidateLastName}
										</Heading>
										<Text fontSize={"sm"}>
											{rtr.job?.title} at{" "}
											<Span fontWeight={"bold"} color={"primary"}>
												{rtr.job?.company}
											</Span>
										</Text>
										<Text fontSize={"sm"}>Sent: {rtr.expiresAt ? format(rtr.expiresAt, "PPP") : "N/A"}</Text>
									</Stack>
									<Badge variant={"solid"} colorPalette={color[rtr.status]}>
										<Icon as={statusIcon[rtr.status]} />
										{rtr.status.charAt(0).toUpperCase() + rtr.status.slice(1)}
									</Badge>
								</HStack>
							</Link>
						</AppCardHeadless>
					)}
				</For>
			</Stack>
		</AppCard>
	);
};
