"use client";
import { Box, CardBody, CardDescription, CardHeader, CardRoot, CardTitle, Container, Heading, Icon, SimpleGrid, Span, Stack, Text } from "@chakra-ui/react";
import { FaChartBar, FaClock, FaEnvelope } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { FiFileText } from "react-icons/fi";
import { GrSecure } from "react-icons/gr";

const features = [
	{
		icon: FiFileText,
		title: "Digital RTR Forms",
		description: "Create and customize RTR templates for different roles. No more copy-pasting from old emails.",
	},
	{
		icon: FaUserGroup,
		title: "Candidate Management",
		description: "Track all your candidates and their RTR status in one centralized dashboard.",
	},
	{
		icon: FaEnvelope,
		title: "Email Integration",
		description: "Send RTR forms directly via email with secure links for candidates to sign online.",
	},
	{
		icon: FaChartBar,
		title: "Analytics & Reporting",
		description: "Get insights into your RTR process with detailed analytics and reporting tools.",
	},
	{
		icon: GrSecure,
		title: "Secure & Compliant",
		description: "Bank-level security with digital signatures that are legally binding and compliant.",
	},
	{
		icon: FaClock,
		title: "Real-time Tracking",
		description: "Monitor RTR status in real-time. Know exactly when forms are sent, viewed, and signed.",
	},
];

export const Features = () => {
	return (
		<Box bg={"blackAlpha.300"} py={24}>
			<Container id="features">
				<Stack gap={16}>
					<Box alignSelf={"center"} textAlign={"center"} maxW={"2xl"} spaceY={4}>
						<Heading fontSize={"3xl"} lineHeight={"110%"}>
							Everything you need to manage RTR forms
						</Heading>
						<Text fontSize={{ base: "md", md: "lg" }}>
							Our platform provides all the tools you need to streamline your recruitment process and eliminate the hassle of manual RTR management.
						</Text>
					</Box>

					<SimpleGrid columns={{ sm: 2, md: 3 }} gap={8}>
						{features.map((feature) => (
							<CardRoot bg={"bg.card"} key={feature.title}>
								<CardHeader>
									<CardTitle as={Heading} fontSize={"xl"} display={"flex"} gap={2} alignItems={"center"}>
										<Box
											width={10}
											height={10}
											display={"flex"}
											alignItems={"center"}
											justifyContent={"center"}
											bg={"info.muted"}
											borderColor={"info"}
											borderWidth={1}
											rounded={8}
										>
											<Icon as={feature.icon} size={"md"} color={"info"} />
										</Box>
										<Span>{feature.title}</Span>
									</CardTitle>
								</CardHeader>
								<CardBody>
									<CardDescription fontSize={"md"} color={"gray.300"}>
										{feature.description}
									</CardDescription>
								</CardBody>
							</CardRoot>
						))}
					</SimpleGrid>
				</Stack>
			</Container>
		</Box>
	);
};
