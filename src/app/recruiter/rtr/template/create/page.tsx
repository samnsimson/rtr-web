import { Heading, Stack, Text } from "@chakra-ui/react";

export default function CreateRtrTemplatePage() {
	return (
		<Stack padding={4} gap={4}>
			<Stack gap={0}>
				<Heading fontSize={"2xl"}>Create RTR Template</Heading>
				<Text>Create a new RTR template</Text>
			</Stack>
		</Stack>
	);
}
