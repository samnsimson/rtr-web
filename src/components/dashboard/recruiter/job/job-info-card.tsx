import { JobDetailQuery } from "@/graphql/generated/graphql";
import { Badge, CardRootProps, DataList, Stack } from "@chakra-ui/react";
import { Card } from "@chakra-ui/react";
import { FC } from "react";

interface JobInfoCardProps extends CardRootProps {
	job: JobDetailQuery["job"];
}

export const JobInfoCard: FC<JobInfoCardProps> = ({ job }) => {
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
							<DataList.ItemLabel>Job Title:</DataList.ItemLabel>
							<DataList.ItemValue>{job.title}</DataList.ItemValue>
						</DataList.Item>
						<DataList.Item alignItems={"flex-start"} gap={{ base: 0, md: 2 }}>
							<DataList.ItemLabel>Company:</DataList.ItemLabel>
							<DataList.ItemValue>{job.company}</DataList.ItemValue>
						</DataList.Item>
						<DataList.Item alignItems={"flex-start"} gap={{ base: 0, md: 2 }}>
							<DataList.ItemLabel>Location:</DataList.ItemLabel>
							<DataList.ItemValue>{job.location}</DataList.ItemValue>
						</DataList.Item>
					</DataList.Root>
					<DataList.Root orientation={"horizontal"} gap={2} flex={1}>
						<DataList.Item alignItems={"flex-start"} gap={{ base: 0, md: 2 }}>
							<DataList.ItemLabel>Work Type:</DataList.ItemLabel>
							<DataList.ItemValue>
								<Badge variant={"surface"} colorPalette={"blue"}>
									{job.workType}
								</Badge>
							</DataList.ItemValue>
						</DataList.Item>
						<DataList.Item alignItems={"flex-start"} gap={{ base: 0, md: 2 }}>
							<DataList.ItemLabel>Job Type:</DataList.ItemLabel>
							<DataList.ItemValue>
								<Badge variant={"surface"} colorPalette={"purple"}>
									{job.jobType}
								</Badge>
							</DataList.ItemValue>
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
				</Stack>
			</Card.Body>
		</Card.Root>
	);
};
