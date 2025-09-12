"use client";
import { Card, Stack, FieldRoot, FieldLabel, InputGroup, Input, NumberInput } from "@chakra-ui/react";
import { RtrCompensationType } from "./rtr-compensation-type";
import { BiDollar } from "react-icons/bi";
import { useRtrForm } from "@/store/useRtrForm";

export const RtrPayInformation = () => {
	const { formData, updateField } = useRtrForm();
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
						<NumberInput.Root size={"lg"} width={"full"} onValueChange={(e) => updateField("compensation", parseInt(e.value))} min={0}>
							<NumberInput.Control />
							<InputGroup startElement={<BiDollar />}>
								<NumberInput.Input bgColor={"bg.card"} placeholder="Compensation" value={formData.compensation} />
							</InputGroup>
						</NumberInput.Root>
					</FieldRoot>
					<RtrCompensationType />
				</Stack>
			</Card.Body>
		</Card.Root>
	);
};
