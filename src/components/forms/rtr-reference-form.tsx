"use client";
import { Box, FieldLabel, FieldRoot, IconButton, Input, InputGroup, Show, SimpleGrid, Stack } from "@chakra-ui/react";
import { LuMail, LuPhone, LuUser, LuX } from "react-icons/lu";
import { forwardRef, useImperativeHandle, useMemo } from "react";
import { useRtrAcceptance } from "@/store";

interface ReferenceData {
	name: string;
	email: string;
	phone: string;
}

export interface RtrReferenceFormRef {
	addReference: () => void;
}

export const RtrReferenceForm = forwardRef<RtrReferenceFormRef>((props, ref) => {
	const { formData, updateFormField } = useRtrAcceptance();
	const references: ReferenceData[] = useMemo(() => formData.references, [formData.references]);

	const addReference = () => {
		const newReferences = [...formData.references, { name: "", email: "", phone: "" }];
		updateFormField("references", newReferences);
	};

	const removeReference = (index: number) => {
		if (formData.references.length > 1) {
			const newReferences = formData.references.filter((_, i) => i !== index);
			updateFormField("references", newReferences);
		}
	};

	const updateReference = (index: number, field: keyof ReferenceData, value: string) => {
		const newReferences = formData.references.map((ref, i) => (i === index ? { ...ref, [field]: value } : ref));
		updateFormField("references", newReferences);
	};

	useImperativeHandle(ref, () => ({ addReference }));

	return (
		<Stack gap={4} divideY={"1px"} divideColor={"border"}>
			{references.map((reference, index) => (
				<Box key={index} position={"relative"}>
					<SimpleGrid flex={1} columns={{ base: 1, md: 3 }} gap={4} padding={4}>
						<FieldRoot id={`reference-name-${index}`}>
							<FieldLabel>Name</FieldLabel>
							<InputGroup startElement={<LuUser />}>
								<Input
									bgColor={"bg.card"}
									type="text"
									size={"lg"}
									placeholder="Your reference name"
									value={reference.name}
									onChange={(e) => updateReference(index, "name", e.target.value)}
								/>
							</InputGroup>
						</FieldRoot>
						<FieldRoot id={`reference-email-${index}`}>
							<FieldLabel>Email</FieldLabel>
							<InputGroup startElement={<LuMail />}>
								<Input
									bgColor={"bg.card"}
									type="email"
									size={"lg"}
									placeholder="Your reference email"
									value={reference.email}
									onChange={(e) => updateReference(index, "email", e.target.value)}
								/>
							</InputGroup>
						</FieldRoot>
						<FieldRoot id={`reference-phone-${index}`}>
							<FieldLabel>Phone</FieldLabel>
							<InputGroup startElement={<LuPhone />}>
								<Input
									bgColor={"bg.card"}
									type="tel"
									size={"lg"}
									placeholder="Your reference phone"
									value={reference.phone}
									onChange={(e) => updateReference(index, "phone", e.target.value)}
								/>
							</InputGroup>
						</FieldRoot>
					</SimpleGrid>
					<Show when={index !== 0}>
						<IconButton position={"absolute"} right={0} top={0} size={"sm"} onClick={() => removeReference(index)} variant={"plain"} colorPalette={"red"}>
							<LuX />
						</IconButton>
					</Show>
				</Box>
			))}
		</Stack>
	);
});

RtrReferenceForm.displayName = "RtrReferenceForm";
