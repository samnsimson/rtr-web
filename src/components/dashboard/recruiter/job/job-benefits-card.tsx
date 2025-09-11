import { JobDetailQuery } from "@/graphql/generated/graphql";
import { CardRootProps, For, List, Text } from "@chakra-ui/react";
import { Card } from "@chakra-ui/react";
import { FC } from "react";

interface JobBenefitsCardProps extends CardRootProps {
	job: JobDetailQuery["job"];
}

export const JobBenefitsCard: FC<JobBenefitsCardProps> = ({ job }) => {
	return (
		<Card.Root bgColor={"bg"} divideY={"1px"} divideColor={"border"}>
			<Card.Header padding={4} gap={0}>
				<Card.Title>Job Benefits</Card.Title>
				<Card.Description>Details about the job</Card.Description>
			</Card.Header>
			<Card.Body>
				<List.Root listStyleType={"none"}>
					<For each={job.benefits} fallback={<Text>No benefits found</Text>}>
						{(benefit, index) => (
							<List.Item key={index}>
								<List.Indicator>-</List.Indicator>
								{benefit}
							</List.Item>
						)}
					</For>
				</List.Root>
			</Card.Body>
		</Card.Root>
	);
};
