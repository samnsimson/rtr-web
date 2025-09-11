import { JobDetailQuery } from "@/graphql/generated/graphql";
import { Badge, CardRootProps, DataList, Stack } from "@chakra-ui/react";
import { Card } from "@chakra-ui/react";
import { format } from "date-fns";
import { FC } from "react";

interface JobInfoExtraCardProps extends CardRootProps {
	job: JobDetailQuery["job"];
}

export const JobInfoExtraCard: FC<JobInfoExtraCardProps> = ({ job }) => {
	return (
		<Card.Root bgColor={"bg"} divideY={"1px"} divideColor={"border"}>
			<Card.Header padding={4} gap={0}>
				<Card.Title>Job Information</Card.Title>
				<Card.Description>Details about the job</Card.Description>
			</Card.Header>
			<Card.Body>
				<Stack direction={{ base: "column", md: "row" }} gap={{ base: 2, md: 4 }}>
					<DataList.Root orientation={"horizontal"} gap={2} flex={1}>
						<DataList.Item alignItems={"flex-start"} gap={{ base: 0, md: 2 }}>
							<DataList.ItemLabel>Min Salary:</DataList.ItemLabel>
							<DataList.ItemValue>${job.salaryMin}</DataList.ItemValue>
						</DataList.Item>
						<DataList.Item alignItems={"flex-start"} gap={{ base: 0, md: 2 }}>
							<DataList.ItemLabel>Max Salary:</DataList.ItemLabel>
							<DataList.ItemValue>${job.salaryMax}</DataList.ItemValue>
						</DataList.Item>
						<DataList.Item alignItems={"flex-start"} gap={{ base: 0, md: 2 }}>
							<DataList.ItemLabel>Compensation:</DataList.ItemLabel>
							<DataList.ItemValue>
								<Badge variant={"surface"} colorPalette={"green"}>
									{job.compensation}
								</Badge>
							</DataList.ItemValue>
						</DataList.Item>
					</DataList.Root>
					<DataList.Root orientation={"horizontal"} gap={2} flex={1}>
						<DataList.Item alignItems={"flex-start"} gap={{ base: 0, md: 2 }}>
							<DataList.ItemLabel>Created At:</DataList.ItemLabel>
							<DataList.ItemValue>{format(job.createdAt, "PPP")}</DataList.ItemValue>
						</DataList.Item>
						<DataList.Item alignItems={"flex-start"} gap={{ base: 0, md: 2 }}>
							<DataList.ItemLabel>Expires At:</DataList.ItemLabel>
							<DataList.ItemValue>{job.expiresAt ? format(job.expiresAt, "PPP") : "N/A"}</DataList.ItemValue>
						</DataList.Item>
					</DataList.Root>
				</Stack>
			</Card.Body>
		</Card.Root>
	);
};
