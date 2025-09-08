"use client";
import { useAuth } from "@/hooks/use-auth";
import { Flex, Box, FieldRoot, FieldLabel, Input, Stack, Button, Heading, Text, InputGroup, Span, HStack, Alert, NativeSelect } from "@chakra-ui/react";
import { HistoryIcon, LockIcon, MailIcon, PhoneIcon, UserIcon, UserPlus } from "lucide-react";
import Link from "next/link";
import { FaSignInAlt } from "react-icons/fa";
import { useState } from "react";
import { UserRole } from "@/graphql/generated/graphql";

export const RegisterForm = () => {
	const { register, isLoading, error } = useAuth();
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		password: "",
		confirmPassword: "",
		role: UserRole.CANDIDATE,
	});

	const handleChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await register(formData);
	};

	return (
		<Flex flex={1} align={"center"} justify={"center"}>
			<Stack gap={8} mx={"auto"} width={"full"} maxW={"xl"} py={12} px={6}>
				<Stack align={"center"} width={"full"} maxW={"xl"}>
					<Heading fontSize={"4xl"}>
						<Span color={"primary"} fontWeight={"bold"}>
							Sign up
						</Span>{" "}
						your account
					</Heading>
					<Text fontSize={"lg"} color={"gray.600"}>
						to enjoy all of our cool <Span color={"blue.400"}>features</Span> ✌️
					</Text>
				</Stack>
				<Box rounded={"lg"} py={8} width={"full"} maxW={"xl"}>
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
							<HStack gap={4}>
								<FieldRoot id="firstName">
									<FieldLabel>First Name</FieldLabel>
									<InputGroup startElement={<UserIcon size={16} />}>
										<Input
											bgColor={"bg.card"}
											type="text"
											size={"xl"}
											rounded={"full"}
											placeholder="John"
											value={formData.firstName}
											onChange={(e) => handleChange("firstName", e.target.value)}
											required
										/>
									</InputGroup>
								</FieldRoot>
								<FieldRoot id="lastName">
									<FieldLabel>Last Name</FieldLabel>
									<InputGroup startElement={<UserIcon size={16} />}>
										<Input
											bgColor={"bg.card"}
											type="text"
											size={"xl"}
											rounded={"full"}
											placeholder="Doe"
											value={formData.lastName}
											onChange={(e) => handleChange("lastName", e.target.value)}
											required
										/>
									</InputGroup>
								</FieldRoot>
							</HStack>
							<HStack gap={4}>
								<FieldRoot id="email">
									<FieldLabel>Email address</FieldLabel>
									<InputGroup startElement={<MailIcon size={16} />}>
										<Input
											bgColor={"bg.card"}
											type="email"
											size={"xl"}
											rounded={"full"}
											placeholder="someone@example.com"
											value={formData.email}
											onChange={(e) => handleChange("email", e.target.value)}
											required
										/>
									</InputGroup>
								</FieldRoot>
								<FieldRoot id="phone">
									<FieldLabel>Phone</FieldLabel>
									<InputGroup startElement={<PhoneIcon size={16} />}>
										<Input
											bgColor={"bg.card"}
											type="tel"
											size={"xl"}
											rounded={"full"}
											placeholder="1234567890"
											value={formData.phone}
											onChange={(e) => handleChange("phone", e.target.value)}
											required
										/>
									</InputGroup>
								</FieldRoot>
							</HStack>
							<FieldRoot id="role">
								<FieldLabel>Register as</FieldLabel>
								<InputGroup>
									<NativeSelect.Root size={"xl"} rounded={"full"}>
										<NativeSelect.Field
											bgColor={"bg.card"}
											rounded={"full"}
											value={formData.role}
											onChange={(e) => handleChange("role", e.currentTarget.value)}
										>
											<option value={UserRole.CANDIDATE}>Candidate</option>
											<option value={UserRole.RECRUITER}>Recruiter</option>
										</NativeSelect.Field>
										<NativeSelect.Indicator />
									</NativeSelect.Root>
								</InputGroup>
							</FieldRoot>
							<FieldRoot id="password">
								<FieldLabel>Password</FieldLabel>
								<InputGroup startElement={<LockIcon size={16} />}>
									<Input
										bgColor={"bg.card"}
										type="password"
										size={"xl"}
										rounded={"full"}
										placeholder="Your Password"
										value={formData.password}
										onChange={(e) => handleChange("password", e.target.value)}
										required
									/>
								</InputGroup>
							</FieldRoot>
							<FieldRoot id="confirmPassword">
								<FieldLabel>Confirm Password</FieldLabel>
								<InputGroup startElement={<LockIcon size={16} />}>
									<Input
										bgColor={"bg.card"}
										type="password"
										size={"xl"}
										rounded={"full"}
										placeholder="Confirm Password"
										value={formData.confirmPassword}
										onChange={(e) => handleChange("confirmPassword", e.target.value)}
										required
									/>
								</InputGroup>
							</FieldRoot>
							<Stack gap={10}>
								<Button
									type="submit"
									variant={"solid"}
									bgColor={"primary"}
									size={"xl"}
									rounded={"full"}
									color={"bg"}
									mt={4}
									loading={isLoading}
									loadingText="Creating account..."
								>
									<UserPlus /> Register
								</Button>
								<Flex gap={4}>
									<Button variant={"outline"} colorPalette={"blue"} size={"xl"} rounded={"full"} flex={1}>
										<HistoryIcon /> Forgot password
									</Button>
									<Button asChild variant={"outline"} colorPalette={"blue"} size={"xl"} rounded={"full"} flex={1}>
										<Link href={"/auth/login"}>
											<FaSignInAlt /> Account login
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
