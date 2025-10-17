import { RtrDetailQuery } from "@/graphql/generated/graphql";
import { AppCard } from "../ui/app-card";
import { DataList, For, FormatNumber, Icon, List, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { FC } from "react";
import { LuCircleCheck } from "react-icons/lu";
import { UseFormReturn } from "react-hook-form";
import { RtrAcceptanceFormType } from "@/zod";

interface RtrJobInfoProps {
	rtr: RtrDetailQuery["rtr"];
	form: UseFormReturn<RtrAcceptanceFormType>;
}

export const RtrJobInfo: FC<RtrJobInfoProps> = ({ rtr }) => {
	return (
		<Stack gap={6}>
			<AppCard title="Job Info" bgColor={"bg"}>
				<SimpleGrid columns={2} gap={4}>
					<DataList.Root orientation={"horizontal"} size="lg" gap={1}>
						<DataList.Item>
							<DataList.ItemLabel>Title</DataList.ItemLabel>
							<DataList.ItemValue>{rtr.job.title}</DataList.ItemValue>
						</DataList.Item>
						<DataList.Item>
							<DataList.ItemLabel>Company</DataList.ItemLabel>
							<DataList.ItemValue>{rtr.job.company}</DataList.ItemValue>
						</DataList.Item>
						<DataList.Item>
							<DataList.ItemLabel>Location</DataList.ItemLabel>
							<DataList.ItemValue>{rtr.job.location}</DataList.ItemValue>
						</DataList.Item>
					</DataList.Root>
					<DataList.Root orientation={"horizontal"} size="lg" gap={1}>
						<DataList.Item>
							<DataList.ItemLabel>Compensation</DataList.ItemLabel>
							<DataList.ItemValue>
								<FormatNumber value={rtr.compensation} style="currency" currency="USD" />
							</DataList.ItemValue>
						</DataList.Item>
						<DataList.Item>
							<DataList.ItemLabel>Compensation Type</DataList.ItemLabel>
							<DataList.ItemValue>{rtr.compensationType}</DataList.ItemValue>
						</DataList.Item>
						<DataList.Item>
							<DataList.ItemLabel>Work Type</DataList.ItemLabel>
							<DataList.ItemValue>Remote</DataList.ItemValue>
						</DataList.Item>
					</DataList.Root>
				</SimpleGrid>
			</AppCard>
			<AppCard title="Job Description" bgColor={"bg"}>
				<Text>{rtr.job.description}</Text>
			</AppCard>
			<AppCard title="Job Requirements" bgColor={"bg"}>
				<List.Root listStyleType={"none"}>
					<For each={rtr.job.requirements} fallback={<Text>No requirements found</Text>}>
						{(requirement, index) => (
							<List.Item key={index} display={"flex"} alignItems={"center"}>
								<List.Indicator>
									<Icon as={LuCircleCheck} color={"green.500"} />
								</List.Indicator>
								{requirement}
							</List.Item>
						)}
					</For>
				</List.Root>
			</AppCard>
			<AppCard title="Job Benefits" bgColor={"bg"}>
				<List.Root listStyleType={"none"}>
					<For each={rtr.job.benefits} fallback={<Text>No benefits found</Text>}>
						{(benefit, index) => (
							<List.Item key={index} display={"flex"} alignItems={"center"}>
								<List.Indicator>
									<Icon as={LuCircleCheck} color={"green.500"} />
								</List.Indicator>
								{benefit}
							</List.Item>
						)}
					</For>
				</List.Root>
			</AppCard>
		</Stack>
	);
};
