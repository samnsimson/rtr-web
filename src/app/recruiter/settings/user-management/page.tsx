import { Heading, Stack, Text } from "@chakra-ui/react";

const UserManagementPage = () => {
	return (
		<Stack padding={4} gap={4}>
			<Heading fontSize={"2xl"}>User Management</Heading>
			<Text>Manage all your users</Text>
		</Stack>
	);
};

export default UserManagementPage;
