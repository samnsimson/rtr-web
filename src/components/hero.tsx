"use client";
import { Container, Stack, Box, Heading, Text, Icon, Span, Button } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";

export const Hero = () => {
	return (
		<Container width={{ md: "5xl" }}>
			<Stack align={"center"} alignSelf={"center"} gap={{ base: 8, md: 14 }} py={{ base: 20, md: 36 }}>
				<Stack w={"full"} gap={4} textAlign={"center"}>
					<Heading fontWeight={600} fontSize={{ base: "3xl", sm: "5xl", md: "8xl" }} lineHeight={"110%"}>
						Streamline Your{" "}
						<Span bgGradient={"to-tr"} gradientFrom={"green.500"} gradientTo={"teal.600"} bgClip={"text"}>
							Right to Represent
						</Span>{" "}
						Process
					</Heading>
					<Text color={"gray.400"} fontSize={{ base: "md", md: "2xl" }}>
						Say goodbye to manual RTR forms and lost emails. Our platform helps recruiters and candidates manage representation agreements efficiently with digital
						signatures, document tracking, and seamless communication.
					</Text>
				</Stack>
				<Stack direction={{ base: "column", md: "row" }} gap={4} justifyContent={"center"} width={"full"}>
					<Box display={"flex"} gap={2} alignItems={"center"} p={4} bg={"bg.card"} rounded={12} width={{ base: "full", md: "auto" }}>
						<Icon as={FaCheckCircle} size={"md"} color={"success"} />
						<span>Digital Signatures</span>
					</Box>
					<Box display={"flex"} gap={2} alignItems={"center"} p={4} bg={"bg.card"} rounded={12} width={{ base: "full", md: "auto" }}>
						<Icon as={FaCheckCircle} size={"md"} color={"success"} />
						<span>Document Tracking</span>
					</Box>
					<Box display={"flex"} gap={2} alignItems={"center"} p={4} bg={"bg.card"} rounded={12} width={{ base: "full", md: "auto" }}>
						<Icon as={FaCheckCircle} size={"md"} color={"success"} />
						<span>Email Integration</span>
					</Box>
				</Stack>
				<Stack direction={{ base: "column", md: "row" }} gap={{ base: 4, md: 8 }}>
					<Button
						size={"2xl"}
						rounded={"full"}
						bgGradient={"to-tr"}
						gradientFrom={"green.500"}
						gradientTo={"teal.600"}
						color={"fg"}
						_hover={{ bgGradient: "to-tr", gradientFrom: "green.600", gradientTo: "teal.700" }}
					>
						Start free trial
					</Button>
					<Button size={"2xl"} rounded={"full"} variant={"outline"} colorPalette={"green"} _hover={{ bgColor: "blackAlpha.300" }}>
						Create an account
					</Button>
				</Stack>
			</Stack>
		</Container>
	);
};
