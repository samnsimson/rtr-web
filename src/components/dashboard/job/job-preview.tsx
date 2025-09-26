"use client";
import { Stack, Heading, Text, HStack, VStack, List, For, Card, CardRootProps } from "@chakra-ui/react";
import { useJobForm } from "@/store";
import { CompensationType } from "@/graphql/generated/graphql";
import { FC } from "react";

type JobPreviewProps = CardRootProps;

export const JobPreview: FC<JobPreviewProps> = ({ ...props }) => {
	const { formData } = useJobForm((state) => state);

	return (
		<Card.Root bgColor={"bg"} divideY={"1px"} divideColor={"border"} {...props}>
			<Card.Header padding={4} gap={0}>
				<Card.Title>Job Preview</Card.Title>
				<Card.Description>A preview of the job you created</Card.Description>
			</Card.Header>
			<Card.Body>
				<Stack gap={4}>
					<HStack gap={4} justify="space-between">
						<VStack align="start" gap={0}>
							<Heading as="h3" fontSize="xl" fontWeight="semibold">
								{formData.title || "Job Title"}
							</Heading>
							<Text>{formData.company || "Company Name"}</Text>
						</VStack>
						<VStack align="end" gap={0}>
							<Text>{formData.location || "Location"}</Text>
							<Text>
								{formData.workType}, {formData.jobType}
							</Text>
						</VStack>
					</HStack>
					<Stack>
						<Heading size={"md"}>Job Description</Heading>
						<Card.Root bgColor={"bg.card"}>
							<Card.Body>
								<Text>{formData.description || "Job description will appear here..."}</Text>
							</Card.Body>
						</Card.Root>
					</Stack>

					{formData.compensation === CompensationType.Salary && (
						<Text fontWeight="medium">
							{formData.salaryMin && formData.salaryMax
								? `$${formData.salaryMin.toLocaleString()} - $${formData.salaryMax.toLocaleString()}`
								: "Salary range to be determined"}
						</Text>
					)}
					<Stack>
						<Heading size={"md"}>Requirements</Heading>
						<Card.Root bgColor={"bg.card"}>
							<Card.Body padding={2}>
								<For each={formData.requirements} fallback={<Text>No requirements found</Text>}>
									{(req, index) => (
										<List.Root listStyleType={"none"}>
											<List.Item key={index}>
												<List.Indicator>-</List.Indicator>
												{req}
											</List.Item>
										</List.Root>
									)}
								</For>
							</Card.Body>
						</Card.Root>
					</Stack>
					<Stack>
						<Heading size={"md"}>Benefits</Heading>
						<Card.Root bgColor={"bg.card"}>
							<Card.Body padding={2}>
								<For each={formData.benefits} fallback={<Text>No benefits found</Text>}>
									{(benefit, index) => (
										<List.Root listStyleType={"none"}>
											<List.Item key={index}>
												<List.Indicator>-</List.Indicator>
												{benefit}
											</List.Item>
										</List.Root>
									)}
								</For>
							</Card.Body>
						</Card.Root>
					</Stack>
				</Stack>
			</Card.Body>
		</Card.Root>
	);
};
