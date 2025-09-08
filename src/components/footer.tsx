import { Box, Container, Heading, ListIndicator, ListItem, ListRoot, Separator, SimpleGrid, Text } from "@chakra-ui/react";
import { BsArrowRight } from "react-icons/bs";

export const Footer = () => {
	return (
		<Container pt={16} pb={8}>
			<SimpleGrid columns={{ base: 1, md: 3 }} gap={8} pb={8}>
				<Box spaceY={4}>
					<Heading>Right To Represent</Heading>
					<Text>Streamline your recruitment process with our modern RTR management platform. Digital signatures, document tracking, and seamless communication.</Text>
				</Box>
				<Box spaceY={4}>
					<Heading>Product</Heading>
					<ListRoot gap="2" variant="plain" align="center">
						<ListItem>
							<ListIndicator asChild>
								<BsArrowRight />
							</ListIndicator>
							Features
						</ListItem>
						<ListItem>
							<ListIndicator asChild>
								<BsArrowRight />
							</ListIndicator>
							Pricing
						</ListItem>
						<ListItem>
							<ListIndicator asChild>
								<BsArrowRight />
							</ListIndicator>
							Integrations
						</ListItem>
						<ListItem>
							<ListIndicator asChild>
								<BsArrowRight />
							</ListIndicator>
							API
						</ListItem>
					</ListRoot>
				</Box>
				<Box spaceY={4}>
					<Heading>Company</Heading>
					<ListRoot gap="2" variant="plain" align="center">
						<ListItem>
							<ListIndicator asChild>
								<BsArrowRight />
							</ListIndicator>
							About
						</ListItem>
						<ListItem>
							<ListIndicator asChild>
								<BsArrowRight />
							</ListIndicator>
							Contact
						</ListItem>
						<ListItem>
							<ListIndicator asChild>
								<BsArrowRight />
							</ListIndicator>
							Privacy
						</ListItem>
						<ListItem>
							<ListIndicator asChild>
								<BsArrowRight />
							</ListIndicator>
							Terms
						</ListItem>
					</ListRoot>
				</Box>
			</SimpleGrid>
			<Separator />
			<Box textAlign={"center"} pt={8}>
				<Text color={"fg"}>© 2024 RTR Platform. All rights reserved.</Text>
			</Box>
		</Container>
	);
};
