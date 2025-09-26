"use client";
import { FieldLabel, FieldRoot, Input, InputGroup, SimpleGrid } from "@chakra-ui/react";
import { LuMail, LuPhone, LuUser } from "react-icons/lu";

export const RtrEmployerDetailForm = () => {
	return (
		<SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
			<FieldRoot id="employer-name">
				<FieldLabel>Employer Name</FieldLabel>
				<InputGroup startElement={<LuUser />}>
					<Input bgColor={"bg.card"} type="text" size={"lg"} placeholder="Your employer name" onChange={() => {}} />
				</InputGroup>
			</FieldRoot>
			<FieldRoot id="employer-name">
				<FieldLabel>Contact Person Name</FieldLabel>
				<InputGroup startElement={<LuUser />}>
					<Input bgColor={"bg.card"} type="text" size={"lg"} placeholder="Your contact person name" onChange={() => {}} />
				</InputGroup>
			</FieldRoot>
			<FieldRoot id="employer-phone">
				<FieldLabel>Employer Phone</FieldLabel>
				<InputGroup startElement={<LuPhone />}>
					<Input bgColor={"bg.card"} type="text" size={"lg"} placeholder="Your employer phone" onChange={() => {}} />
				</InputGroup>
			</FieldRoot>

			<FieldRoot id="employer-email">
				<FieldLabel>Employer Email</FieldLabel>
				<InputGroup startElement={<LuMail />}>
					<Input bgColor={"bg.card"} type="text" size={"lg"} placeholder="Your employer email" onChange={() => {}} />
				</InputGroup>
			</FieldRoot>
		</SimpleGrid>
	);
};
