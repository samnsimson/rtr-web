"use client";

import { Button, Flex, Heading, Icon, Stack, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LuTriangleAlert, LuArrowLeft, LuHouse, LuRefreshCcw } from "react-icons/lu";

interface ErrorPageProps {
	error: Error & { digest?: string };
	reset: () => void;
}

const ErrorHandler = ({ error, reset }: ErrorPageProps) => {
	const router = useRouter();

	useEffect(() => {
		console.error("Application error:", error);
	}, [error]);

	return (
		<Flex height={"100vh"} flex={1} alignItems="center" justifyContent="center" p={8}>
			<VStack gap={8} textAlign="center" maxW="md">
				<VStack gap={4}>
					<Icon as={LuTriangleAlert} size={"2xl"} color="red.500" />
					<Heading fontSize="6xl" fontWeight="bold" color="red.500">
						Oops!
					</Heading>
					<Heading fontSize="2xl" fontWeight="semibold" mt={4}>
						Something went wrong
					</Heading>
				</VStack>
				<VStack gap={4}>
					<Text fontSize="lg" color="gray.400">
						We encountered an unexpected error. This has been logged and our team will look into it.
					</Text>
					{error.digest && (
						<Text fontSize="sm" color="gray.500" fontFamily="mono">
							Error ID: {error.digest}
						</Text>
					)}
				</VStack>
				<Stack direction={{ base: "column", sm: "row" }} gap={4} pt={4} w="full">
					<Button variant="surface" colorPalette="blue" size="lg" onClick={reset} flex={1}>
						<LuRefreshCcw />
						Try Again
					</Button>
					<Button variant="surface" colorPalette="blue" size="lg" onClick={() => router.back()} flex={1}>
						<LuArrowLeft />
						Go Back
					</Button>
					<Button asChild variant="surface" colorPalette="blue" size="lg" flex={1}>
						<Link href="/api/auth/callback">
							<LuHouse /> Go Home
						</Link>
					</Button>
				</Stack>
			</VStack>
		</Flex>
	);
};

export default ErrorHandler;
