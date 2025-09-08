"use client";
import { PasswordInput } from "@/components/ui/password-input";
import { useAuth } from "@/hooks/use-auth";
import { Flex, Box, FieldRoot, FieldLabel, Input, Stack, Button, Heading, Text, InputGroup, Span, Alert } from "@chakra-ui/react";
import { HistoryIcon, LockIcon, UserIcon, UserPlus } from "lucide-react";
import Link from "next/link";
import { FaSignInAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export const LoginForm = () => {
	const { login, isLoading, error } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState<string | null>(null);
	const searchParams = useSearchParams();

	useEffect(() => {
		const msg = searchParams.get("message");
		if (msg) setMessage(msg);
	}, [searchParams]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await login({ email, password });
	};

	return (
		<Flex flex={1} align={"center"} justify={"center"}>
			<Stack gap={8} mx={"auto"} width={"full"} maxW={"xl"} py={12} px={6}>
				<Stack align={"center"} width={"full"} maxW={"xl"}>
					<Heading fontSize={"4xl"}>
						<Span color={"success"} fontWeight={"bold"}>
							Sign in
						</Span>{" "}
						to your account
					</Heading>
					<Text fontSize={"lg"} color={"gray.600"}>
						to enjoy all of our cool <Span color={"blue.400"}>features</Span> ✌️
					</Text>
				</Stack>
				<Box rounded={"lg"} py={8} width={"full"} maxW={"xl"}>
					{message && (
						<Alert.Root status="success" mb={4} rounded="lg">
							<Alert.Indicator />
							<Alert.Content>
								<Alert.Title>Success</Alert.Title>
								<Alert.Description>{message}</Alert.Description>
							</Alert.Content>
						</Alert.Root>
					)}
					{error && (
						<Alert.Root status="error" mb={4} rounded="lg">
							<Alert.Indicator />
							<Alert.Content>
								<Alert.Title>Error</Alert.Title>
								<Alert.Description>{error}</Alert.Description>
							</Alert.Content>
						</Alert.Root>
					)}
					<form onSubmit={handleSubmit}>
						<Stack gap={4}>
							<FieldRoot id="email">
								<FieldLabel>Email address</FieldLabel>
								<InputGroup startElement={<UserIcon />}>
									<Input
										bgColor={"bg.card"}
										type="email"
										size={"xl"}
										rounded={"full"}
										placeholder="someone@example.com"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
								</InputGroup>
							</FieldRoot>
							<FieldRoot id="password">
								<FieldLabel>Password</FieldLabel>
								<InputGroup startElement={<LockIcon />}>
									<PasswordInput
										bgColor={"bg.card"}
										type="password"
										size={"xl"}
										rounded={"full"}
										placeholder="Your Password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
									/>
								</InputGroup>
							</FieldRoot>
							<Stack gap={10}>
								<Button
									type="submit"
									variant={"solid"}
									bgColor={"success"}
									size={"xl"}
									rounded={"full"}
									color={"bg"}
									mt={4}
									loading={isLoading}
									loadingText="Signing in..."
								>
									<FaSignInAlt /> Sign in
								</Button>
								<Flex gap={4}>
									<Button variant={"outline"} colorPalette={"green"} size={"xl"} rounded={"full"} flex={1}>
										<HistoryIcon /> Forgot password
									</Button>
									<Button asChild variant={"outline"} colorPalette={"green"} size={"xl"} rounded={"full"} flex={1}>
										<Link href={"/auth/register"}>
											<UserPlus /> Create an account
										</Link>
									</Button>
								</Flex>
							</Stack>
						</Stack>
					</form>
				</Box>
			</Stack>
		</Flex>
	);
};
