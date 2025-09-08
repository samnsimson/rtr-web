import { Card, Stack, FieldRoot, FieldLabel, InputGroup, Input } from "@chakra-ui/react";
import { RtrCompensationType } from "./rtr-compensation-type";
import { BiDollar } from "react-icons/bi";

export const RtrPayInformation = () => {
	return (
		<Card.Root bgColor={"bg"} divideY={"1px"} divideColor={"border"}>
			<Card.Header padding={4} gap={0}>
				<Card.Title>Compensation</Card.Title>
				<Card.Description>Enter the job pay information</Card.Description>
			</Card.Header>
			<Card.Body>
				<Stack gap={4}>
					<FieldRoot id="compensation">
						<FieldLabel>Compensation</FieldLabel>
						<InputGroup startElement={<BiDollar size={24} />}>
							<Input bgColor={"bg.card"} type="text" size={"lg"} placeholder="Compensation" />
						</InputGroup>
					</FieldRoot>
					<RtrCompensationType />
				</Stack>
			</Card.Body>
		</Card.Root>
	);
};
