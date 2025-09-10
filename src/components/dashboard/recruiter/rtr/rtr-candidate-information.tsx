import { Card, Stack, FieldRoot, FieldLabel, InputGroup, Input } from "@chakra-ui/react";
import { UserIcon, MailIcon, PhoneIcon } from "lucide-react";

export const RtrCandidateInformation = () => {
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
							<InputGroup startElement={<UserIcon />}>
								<Input bgColor={"bg.card"} type="text" size={"lg"} placeholder="Enter candidate's first name" />
							</InputGroup>
						</FieldRoot>
						<FieldRoot id="candidate-last-name">
							<FieldLabel>Last Name</FieldLabel>
							<InputGroup startElement={<UserIcon />}>
								<Input bgColor={"bg.card"} type="text" size={"lg"} placeholder="Enter candidate's last name" />
							</InputGroup>
						</FieldRoot>
					</Stack>
					<Stack gap={4} direction={{ base: "column", md: "row" }}>
						<FieldRoot id="candidate-email">
							<FieldLabel>Email</FieldLabel>
							<InputGroup startElement={<MailIcon />}>
								<Input bgColor={"bg.card"} type="text" size={"lg"} placeholder="Enter candidate's email address" />
							</InputGroup>
						</FieldRoot>
						<FieldRoot id="candidate-phone">
							<FieldLabel>Phone</FieldLabel>
							<InputGroup startElement={<PhoneIcon />}>
								<Input bgColor={"bg.card"} type="text" size={"lg"} placeholder="Enter candidate's phone" />
							</InputGroup>
						</FieldRoot>
					</Stack>
				</Stack>
			</Card.Body>
		</Card.Root>
	);
};
