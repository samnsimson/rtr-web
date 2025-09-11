import { JobDetailQuery } from "@/graphql/generated/graphql";
import { CardRootProps, For, List, Text } from "@chakra-ui/react";
import { Card } from "@chakra-ui/react";
import { FC } from "react";

interface JobRequirementCardProps extends CardRootProps {
	job: JobDetailQuery["job"];
}

export const JobRequirementCard: FC<JobRequirementCardProps> = ({ job }) => {
	return (
		<Card.Root bgColor={"bg"} divideY={"1px"} divideColor={"border"}>
			<Card.Header padding={4} gap={0}>
				<Card.Title>Job Requirements</Card.Title>
				<Card.Description>Details about the job</Card.Description>
			</Card.Header>
			<Card.Body>
				<List.Root listStyleType={"none"}>
					<For each={job.requirements} fallback={<Text>No requirements found</Text>}>
						{(requirement, index) => (
							<List.Item key={index}>
								<List.Indicator>-</List.Indicator>
								{requirement}
							</List.Item>
						)}
					</For>
				</List.Root>
			</Card.Body>
		</Card.Root>
	);
};
