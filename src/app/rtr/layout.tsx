import { Box, Container, Flex, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { Toaster } from "@/components/ui/toaster";

const RtrLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Box height={"100vh"} bgColor={"bg.panel"}>
			<Container maxW={"4xl"} height={"full"} padding={0}>
				<Flex height={"full"} direction={"column"} divideY={"1px"} divideColor={"border"}>
					<VStack padding={4}>
						<Heading fontSize={"2xl"}>Right to Represent Agreement</Heading>
						<Text>Please review and sign the RTR agreement below</Text>
					</VStack>
					<Stack flex={1} overflow={"auto"}>
						{children}
					</Stack>
					<Stack alignItems={"center"} justifyContent={"center"} padding={4}>
						<Text>© {new Date().getFullYear()} Right To Represent. All rights reserved.</Text>
					</Stack>
				</Flex>
			</Container>
			<Toaster />
		</Box>
	);
};
export default RtrLayout;
