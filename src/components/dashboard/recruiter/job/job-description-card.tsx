import { JobDetailQuery } from "@/graphql/generated/graphql";
import { CardRootProps, Text } from "@chakra-ui/react";
import { Card } from "@chakra-ui/react";
import { FC } from "react";

interface JobDescriptionCardProps extends CardRootProps {
	job: JobDetailQuery["job"];
}

export const JobDescriptionCard: FC<JobDescriptionCardProps> = ({ job }) => {
	return (
		<Card.Root bgColor={"bg"} divideY={"1px"} divideColor={"border"}>
			<Card.Header padding={4} gap={0}>
				<Card.Title>Job Description</Card.Title>
				<Card.Description>Details about the job</Card.Description>
			</Card.Header>
			<Card.Body>
				<Text>{job.description}</Text>
			</Card.Body>
		</Card.Root>
	);
};
