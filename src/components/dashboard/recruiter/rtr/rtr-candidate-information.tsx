"use client";
import { useRtrForm } from "@/store/useRtrForm";
import { Card, Stack, FieldRoot, FieldLabel, InputGroup, Input } from "@chakra-ui/react";
import { LuMail, LuPhone, LuUser } from "react-icons/lu";

export const RtrCandidateInformation = () => {
	const { formData, updateField } = useRtrForm();
	return (
		<Card.Root bgColor={"bg"} divideY={"1px"} divideColor={"border"}>
			<Card.Header padding={4} gap={0}>
				<Card.Title>Candidate Information</Card.Title>
				<Card.Description>Enter your candidate information</Card.Description>
			</Card.Header>
			<Card.Body>
				<Stack gap={4}>
					<Stack gap={4} direction={{ base: "column", md: "row" }}>
						<FieldRoot id="candidate-first-name">
							<FieldLabel>First Name</FieldLabel>
							<InputGroup startElement={<LuUser />}>
								<Input
									bgColor={"bg.card"}
									type="text"
									size={"lg"}
									placeholder="Enter candidate's first name"
									value={formData.firstName}
									onChange={(e) => updateField("firstName", e.target.value)}
								/>
							</InputGroup>
						</FieldRoot>
						<FieldRoot id="candidate-last-name">
							<FieldLabel>Last Name</FieldLabel>
							<InputGroup startElement={<LuUser />}>
								<Input
									bgColor={"bg.card"}
									type="text"
									size={"lg"}
									placeholder="Enter candidate's last name"
									value={formData.lastName}
									onChange={(e) => updateField("lastName", e.target.value)}
								/>
							</InputGroup>
						</FieldRoot>
					</Stack>
					<Stack gap={4} direction={{ base: "column", md: "row" }}>
						<FieldRoot id="candidate-email">
							<FieldLabel>Email</FieldLabel>
							<InputGroup startElement={<LuMail />}>
								<Input
									bgColor={"bg.card"}
									type="text"
									size={"lg"}
									placeholder="Enter candidate's email address"
									value={formData.email}
									onChange={(e) => updateField("email", e.target.value)}
								/>
							</InputGroup>
						</FieldRoot>
						<FieldRoot id="candidate-phone">
							<FieldLabel>Phone</FieldLabel>
							<InputGroup startElement={<LuPhone />}>
								<Input
									bgColor={"bg.card"}
									type="text"
									size={"lg"}
									placeholder="Enter candidate's phone"
									value={formData.phone}
									onChange={(e) => updateField("phone", e.target.value)}
								/>
							</InputGroup>
						</FieldRoot>
					</Stack>
				</Stack>
			</Card.Body>
		</Card.Root>
	);
};
