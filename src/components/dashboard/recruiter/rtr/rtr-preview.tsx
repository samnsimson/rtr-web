"use client";
import { Box, Card, DataList, GridItem, Heading, List, Separator, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { RtrPreviewJobInfo } from "./rtr-preview-job-info";
import { useRtrForm } from "@/store/useRtrForm";
import { useQuery } from "@apollo/client/react";
import { GetCompiledRtrTemplateDocument, JobDetailDocument } from "@/graphql/generated/graphql";
import { AsyncValue } from "./rtr-async-text";
import { LuCircleCheck } from "react-icons/lu";
import { AppCardHeadless } from "@/components/ui/app-card";
import { useDebounce } from "use-debounce";

export const RtrPreview = () => {
	const { formData } = useRtrForm();
	const [debouncedFormData] = useDebounce(formData, 500);

	const { data: jobData, loading: jobLoading } = useQuery(JobDetailDocument, {
		variables: { id: formData.jobId },
		skip: !formData.jobId,
	});

	const { data: rtrTemplateData, loading: rtrTemplateLoading } = useQuery(GetCompiledRtrTemplateDocument, {
		skip: !debouncedFormData.jobId || !debouncedFormData.rtrTemplateId,
		variables: {
			input: {
				jobId: debouncedFormData.jobId,
				templateId: debouncedFormData.rtrTemplateId,
				candidate: { firstName: debouncedFormData.firstName, lastName: debouncedFormData.lastName, email: debouncedFormData.email, phone: debouncedFormData.phone },
			},
		},
	});

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
									<DataList.ItemValue>
										{formData.firstName} {formData.lastName}
									</DataList.ItemValue>
								</DataList.Item>
								<DataList.Item>
									<DataList.ItemLabel>Email:</DataList.ItemLabel>
									<DataList.ItemValue>{formData.email}</DataList.ItemValue>
								</DataList.Item>
								<DataList.Item>
									<DataList.ItemLabel>Phone:</DataList.ItemLabel>
									<DataList.ItemValue>{formData.phone}</DataList.ItemValue>
								</DataList.Item>
							</DataList.Root>
						</GridItem>
						<RtrPreviewJobInfo job={jobData?.job} loading={jobLoading} />
					</SimpleGrid>

					<Separator marginY={4} />
					<Stack gap={6}>
						<Stack>
							<Heading size={"md"}>Candidate RTR</Heading>
							<AppCardHeadless bgColor={"bg.card"}>
								<AsyncValue as={Box} loading={rtrTemplateLoading} skeletonLines={3} html={rtrTemplateData?.compiledRtrTemplate?.html ?? ""} />
							</AppCardHeadless>
						</Stack>
						<Stack>
							<Heading size={"md"}>Job Description</Heading>
							<AppCardHeadless bgColor={"bg.card"}>
								<AsyncValue as={Text} loading={jobLoading} skeletonLines={3}>
									{jobData?.job?.description}
								</AsyncValue>
							</AppCardHeadless>
						</Stack>
						<Stack>
							<Heading size={"md"}>Job Requirements</Heading>
							<AppCardHeadless bgColor={"bg.card"}>
								<List.Root listStyleType={"none"} align={"start"}>
									<AsyncValue as={List.Item} loading={jobLoading} skeletonLines={6}>
										{jobData?.job?.requirements.map((requirement) => (
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
									<AsyncValue as={List.Item} loading={jobLoading} skeletonLines={6}>
										{jobData?.job?.benefits.map((benefit) => (
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
