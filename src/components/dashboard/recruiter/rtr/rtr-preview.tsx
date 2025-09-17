"use client";
import { Card, DataList, GridItem, Heading, List, Separator, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { RtrPreviewJobInfo } from "./rtr-preview-job-info";
import { useRtrForm } from "@/store/useRtrForm";
import { useQuery } from "@apollo/client/react";
import { JobDetailDocument } from "@/graphql/generated/graphql";
import { AsyncValue } from "./rtr-async-text";
import { LuCircleCheck } from "react-icons/lu";
import { AppCardHeadless } from "@/components/ui/app-card";

export const RtrPreview = () => {
	const { formData } = useRtrForm();
	const { data, loading } = useQuery(JobDetailDocument, { variables: { id: formData.jobId } });
	return (
		<Card.Root bgColor={"bg"} divideY={"1px"} divideColor={"border"}>
			<Card.Header padding={4} gap={0}>
				<Card.Title>RTR Preview</Card.Title>
				<Card.Description>A preview of the RTR you created</Card.Description>
			</Card.Header>
			<Card.Body>
				<Stack>
					<SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
						<GridItem spaceY={4}>
							<Heading size={"md"}>Candidate Infomation</Heading>
							<DataList.Root orientation={"horizontal"} gap={2}>
								<DataList.Item>
									<DataList.ItemLabel>Name:</DataList.ItemLabel>
									<DataList.ItemValue>Sam Nishanth Simson</DataList.ItemValue>
								</DataList.Item>
								<DataList.Item>
									<DataList.ItemLabel>Email:</DataList.ItemLabel>
									<DataList.ItemValue>samnsimson@gmail.com</DataList.ItemValue>
								</DataList.Item>
								<DataList.Item>
									<DataList.ItemLabel>Phone:</DataList.ItemLabel>
									<DataList.ItemValue>9049177058</DataList.ItemValue>
								</DataList.Item>
							</DataList.Root>
						</GridItem>
						<RtrPreviewJobInfo job={data?.job} loading={loading} />
					</SimpleGrid>

					<Separator marginY={4} />
					<Stack gap={6}>
						<Stack>
							<Heading size={"md"}>Candidate RTR</Heading>
							<AppCardHeadless bgColor={"bg.card"}>
								<Text>
									I give exclusive permission to VYSystems to represent Sam Nishanth Simson profile and qualifications to Mphasis for the below requirement. I
									confirm that I have not submitted my resume or application for this specific position to any other recruitment agency or directly with this
									client within the last 30-60 days. By granting us the Right to Represent, you allow us to present your resume and credentials to our client for
									their consideration.
								</Text>
							</AppCardHeadless>
						</Stack>
						<Stack>
							<Heading size={"md"}>Job Description</Heading>
							<AppCardHeadless bgColor={"bg.card"}>
								<AsyncValue as={Text} loading={loading} skeletonLines={3}>
									{data?.job?.description}
								</AsyncValue>
							</AppCardHeadless>
						</Stack>
						<Stack>
							<Heading size={"md"}>Job Requirements</Heading>
							<AppCardHeadless bgColor={"bg.card"}>
								<List.Root listStyleType={"none"} align={"start"}>
									<AsyncValue as={List.Item} loading={loading} skeletonLines={6}>
										{data?.job?.requirements.map((requirement) => (
											<List.Item key={requirement}>
												<List.Indicator asChild color={"green.500"}>
													<LuCircleCheck />
												</List.Indicator>
												{requirement}
											</List.Item>
										))}
									</AsyncValue>
								</List.Root>
							</AppCardHeadless>
						</Stack>
						<Stack>
							<Heading size={"md"}>Job Benefits</Heading>
							<AppCardHeadless bgColor={"bg.card"}>
								<List.Root listStyleType={"none"} align={"start"}>
									<AsyncValue as={List.Item} loading={loading} skeletonLines={6}>
										{data?.job?.benefits.map((benefit) => (
											<List.Item key={benefit}>
												<List.Indicator asChild color={"green.500"}>
													<LuCircleCheck />
												</List.Indicator>
												{benefit}
											</List.Item>
										))}
									</AsyncValue>
								</List.Root>
							</AppCardHeadless>
						</Stack>
					</Stack>
				</Stack>
			</Card.Body>
		</Card.Root>
	);
};
