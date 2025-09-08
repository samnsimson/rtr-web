"use client";
import { Box, CardBody, CardRoot, Container, Heading, HStack, Icon, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

const testimonials = [
	{
		name: "Sarah Johnson",
		role: "Senior Recruiter at TechCorp",
		content: "RTR Platform has completely transformed how we handle candidate representation. No more lost emails or manual tracking!",
		rating: 5,
	},
	{
		name: "Michael Chen",
		role: "Software Engineer",
		content: "As a candidate, I love how easy it is to sign RTR forms digitally. The process is so much smoother now.",
		rating: 5,
	},
	{
		name: "Emily Rodriguez",
		role: "Talent Acquisition Manager",
		content: "The analytics and reporting features give us incredible insights into our recruitment process. Highly recommended!",
		rating: 5,
	},
];

export const Testimonial = () => {
	return (
		<Box py={24}>
			<Container spaceY={16}>
				<Stack alignItems={"center"} textAlign={"center"}>
					<Heading fontSize={"3xl"} lineHeight={"110%"}>
						Trusted by recruiters and candidates
					</Heading>
					<Text fontSize={{ base: "md", md: "lg" }}>See what our users have to say about their experience with RTR Platform.</Text>
				</Stack>
				<SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
					{testimonials.map((testimonial, index) => (
						<CardRoot key={index} bgColor={"bg.card"}>
							<CardBody spaceY={4}>
								<HStack gap={1}>
									{[...Array(testimonial.rating)].map((_, i) => (
										<Icon key={i} as={FaStar} color={"success"} />
									))}
								</HStack>
								<blockquote className="text-foreground mb-4 leading-relaxed">&rsquo;{testimonial.content}&rsquo;</blockquote>
								<Stack gap={0}>
									<Heading fontWeight={"semibold"} fontSize={"md"} color={"success"}>
										{testimonial.name}
									</Heading>
									<Text>{testimonial.role}</Text>
								</Stack>
							</CardBody>
						</CardRoot>
					))}
				</SimpleGrid>
			</Container>
		</Box>
	);
};
