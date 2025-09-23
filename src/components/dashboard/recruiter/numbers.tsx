import { Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { FC } from "react";

interface NumbersProp {
	counts: Array<{ label: string; count: number; color: string }>;
}

export const OverviewNumbers: FC<NumbersProp> = ({ counts }) => {
	return counts.map((count, idx) => (
		<Flex key={idx} bgColor={"bg"} alignItems={"center"} justifyContent={"space-between"} minH={"140px"} p={4} rounded={12}>
			<Stack gap={0}>
				<Heading>{count.label}</Heading>
				<Text>+12% from last month</Text>
			</Stack>
			<Stack>
				<Heading fontWeight={"bold"} fontSize={"6xl"} color={count.color}>
					{count.count.toString().padStart(2, "0")}
				</Heading>
			</Stack>
		</Flex>
	));
};
