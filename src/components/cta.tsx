import { Box, Button, Container, Heading, Stack, Text } from "@chakra-ui/react";

export const Cta = () => {
	return (
		<Box bgGradient={"to-tr"} gradientFrom={"green.500"} gradientTo={"teal.600"} py={24}>
			<Container>
				<Stack align={"center"} spaceY={8}>
					<Box maxW={"2xl"} textAlign={"center"} spaceY={4}>
						<Heading fontSize={"3xl"} color={"bg"} lineHeight={"110%"}>
							Ready to streamline your RTR process?
						</Heading>
						<Text fontSize={"lg"} color={"bg"} fontWeight={"semibold"}>
							Join hundreds of recruiters and candidates who have already transformed their representation workflow with our platform.
						</Text>
					</Box>
					<Stack direction={{ base: "column", md: "row" }} gap={{ base: 4, md: 8 }}>
						<Button size={"2xl"} rounded={"full"} variant={"solid"} bgColor={"bg"} color={"fg"} _hover={{ bgColor: "blackAlpha.600" }}>
							Start free trial
						</Button>
						<Button size={"2xl"} rounded={"full"} variant={"outline"} bgColor={"transparent"} color={"bg"} _hover={{ bgColor: "blackAlpha.300" }}>
							Create an account
						</Button>
					</Stack>
				</Stack>
			</Container>
		</Box>
	);
};
