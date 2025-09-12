import { Heading, Stack, Text } from "@chakra-ui/react";

const RtrTemplatePage = () => {
	return (
		<Stack padding={4} gap={4}>
			<Stack gap={0}>
				<Heading fontSize={"2xl"}>RTR Templates</Heading>
				<Text>Manage all your RTR templates</Text>
			</Stack>
		</Stack>
	);
};
export default RtrTemplatePage;
