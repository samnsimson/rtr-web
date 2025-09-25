import { Heading, Stack, Text } from "@chakra-ui/react";

const RtrViewPage = async (props: PageProps<"/rtr/[id]">) => {
	const { id } = await props.params;
	return (
		<Stack padding={4} gap={4}>
			<Heading fontSize={"2xl"}>RTR #{id}</Heading>
			<Text>View your Right to Represent form</Text>
		</Stack>
	);
};
export default RtrViewPage;
