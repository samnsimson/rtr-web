"use client";
import React from "react";
import { Box, Button, DataList, Drawer, IconButton, List, SimpleGrid, VStack, Text } from "@chakra-ui/react";
import { LuCircleCheck, LuEye, LuX } from "react-icons/lu";
import { useRtrForm } from "@/store/useRtrForm";
import { useQuery } from "@apollo/client/react";
import { GetCompiledRtrTemplateDocument, JobDetailDocument } from "@/graphql/generated/graphql";
import { AsyncValue } from "./rtr-async-text";
import { AppCard } from "@/components/ui/app-card";
import { useDebounce } from "use-debounce";

export const PreviewRtrButton = () => {
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
		<Drawer.Root size={"lg"}>
			<Drawer.Backdrop />
			<Drawer.Trigger asChild>
				<Button variant={"surface"} colorPalette={"blue"}>
					<LuEye /> Preview
				</Button>
			</Drawer.Trigger>
			<Drawer.Positioner>
				<Drawer.Content>
					<Drawer.CloseTrigger />
					<Drawer.Header bgColor={"bg"} padding={4} gap={0} borderY={"1px solid"} borderColor={"border"}>
						<VStack align={"flex-start"} gap={0}>
							<Drawer.Title flex={1} alignItems={"center"} gap={2} color={"primary"}>
								Preview RTR
							</Drawer.Title>
							<Drawer.Description>A preview of the RTR you created</Drawer.Description>
						</VStack>
						<Drawer.CloseTrigger asChild>
							<IconButton variant={"plain"} colorPalette={"red"}>
								<LuX size={20} />
							</IconButton>
						</Drawer.CloseTrigger>
					</Drawer.Header>
					<Drawer.Body padding={4} spaceY={4}>
						<SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
							<AppCard title="Candidate Infomation" bgColor={"bg"}>
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
							</AppCard>

							<AppCard title="Job Infomation" bgColor={"bg"}>
								<DataList.Root orientation={"horizontal"} gap={2}>
									<DataList.Item>
										<DataList.ItemLabel>Title:</DataList.ItemLabel>
										<AsyncValue as={DataList.ItemValue} loading={jobLoading}>
											{jobData?.job?.title}
										</AsyncValue>
									</DataList.Item>
									<DataList.Item>
										<DataList.ItemLabel>Company:</DataList.ItemLabel>
										<AsyncValue as={DataList.ItemValue} loading={jobLoading}>
											{jobData?.job?.company}
										</AsyncValue>
									</DataList.Item>
									<DataList.Item>
										<DataList.ItemLabel>Type:</DataList.ItemLabel>
										<AsyncValue as={DataList.ItemValue} loading={jobLoading}>
											{jobData?.job?.workType}
										</AsyncValue>
									</DataList.Item>
								</DataList.Root>
							</AppCard>
						</SimpleGrid>
						<AppCard title="Candidate RTR" bgColor={"bg"}>
							<AsyncValue as={Box} loading={rtrTemplateLoading} skeletonLines={3} html={rtrTemplateData?.compiledRtrTemplate?.html ?? ""} />
						</AppCard>
						<AppCard title="Job Description" bgColor={"bg"}>
							<AsyncValue as={Text} loading={jobLoading} skeletonLines={3}>
								{jobData?.job?.description}
							</AsyncValue>
						</AppCard>
						<AppCard title="Job Requirements" bgColor={"bg"}>
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
						</AppCard>
						<AppCard title="Job Benefits" bgColor={"bg"}>
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
						</AppCard>
					</Drawer.Body>
					{/* <Drawer.Footer /> */}
				</Drawer.Content>
			</Drawer.Positioner>
		</Drawer.Root>
	);
};
