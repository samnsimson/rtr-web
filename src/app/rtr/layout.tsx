import { Container, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

const RtrLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Container maxW={"4xl"} height={"100vh"} padding={0}>
			<Flex height={"full"} direction={"column"} divideY={"1px"} divideColor={"border"}>
				<Stack padding={4}>
					<Heading fontSize={"2xl"}>RTR</Heading>
					<Text>Manage all your Right to Represent forms</Text>
				</Stack>
				<Stack flex={1} overflow={"auto"}>
					{children}
				</Stack>
				<Stack alignItems={"center"} justifyContent={"center"} padding={4}>
					<Text>© {new Date().getFullYear()} Right To Represent. All rights reserved.</Text>
				</Stack>
			</Flex>
		</Container>
	);
};
export default RtrLayout;
