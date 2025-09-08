"use client";
import { Box, Button, Flex, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LuArrowLeft, LuHouse } from "react-icons/lu";

const DashboardNotFound = () => {
	const router = useRouter();
	return (
		<Flex height={"100vh"} flex={1} alignItems="center" justifyContent="center" p={8}>
			<VStack gap={8} textAlign="center" maxW="md">
				<Box>
					<Heading fontSize="6xl" fontWeight="bold" color="warning">
						404
					</Heading>
					<Heading fontSize="2xl" fontWeight="semibold" mt={4}>
						Page Not Found
					</Heading>
				</Box>
				<Text fontSize="lg">The dashboard page you&apos;re looking for doesn&apos;t exist or has been moved.</Text>
				<Stack direction="row" gap={4} pt={4}>
					<Button variant="surface" colorPalette={"blue"} size="lg" onClick={() => router.back()}>
						<LuArrowLeft /> Go Back
					</Button>
					<Button asChild variant="surface" colorPalette={"blue"} size="lg">
						<Link href="/recruiter">
							<LuHouse />
							Go to Dashboard
						</Link>
					</Button>
				</Stack>
			</VStack>
		</Flex>
	);
};

export default DashboardNotFound;
