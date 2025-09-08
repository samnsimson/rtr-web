import { Card, HStack, List, Text, Heading } from "@chakra-ui/react";
import { FaEnvelope } from "react-icons/fa";

export const RtrNotes = () => {
	return (
		<Card.Root bgColor={"bg"} divideY={"1px"} divideColor={"border"}>
			<Card.Body gap={2}>
				<HStack gap={4}>
					<FaEnvelope />
					<Heading size={"md"}>Automatic Email Notifications:</Heading>
				</HStack>
				<Text>When you create this RTR, the following emails will be sent automatically:</Text>
				<List.Root paddingStart={4}>
					<List.Item>RTR form link to the candidate</List.Item>
					<List.Item>Creation confirmation to you</List.Item>
					<List.Item>Reminder emails before expiry</List.Item>
				</List.Root>
			</Card.Body>
		</Card.Root>
	);
};
