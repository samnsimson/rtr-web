"use client";
import { Box, FieldLabel, FieldRoot, IconButton, Input, InputGroup, Show, SimpleGrid, Stack } from "@chakra-ui/react";
import { LuMail, LuPhone, LuUser, LuX } from "react-icons/lu";
import { useState, forwardRef, useImperativeHandle } from "react";

interface ReferenceData {
	id: string;
	name: string;
	email: string;
	phone: string;
}

export interface RtrReferenceFormRef {
	addReference: () => void;
}

export const RtrReferenceForm = forwardRef<RtrReferenceFormRef>((props, ref) => {
	const [references, setReferences] = useState<ReferenceData[]>([{ id: "1", name: "", email: "", phone: "" }]);

	const addReference = () => {
		const newReference: ReferenceData = { id: Date.now().toString(), name: "", email: "", phone: "" };
		setReferences([...references, newReference]);
	};

	const removeReference = (id: string) => {
		if (references.length > 1) {
			setReferences(references.filter((ref) => ref.id !== id));
		}
	};

	const updateReference = (id: string, field: keyof Omit<ReferenceData, "id">, value: string) => {
		setReferences(references.map((ref) => (ref.id === id ? { ...ref, [field]: value } : ref)));
	};

	useImperativeHandle(ref, () => ({
		addReference,
	}));

	return (
		<Stack gap={4} divideY={"1px"} divideColor={"border"}>
			{references.map((reference, index) => (
				<Box key={reference.id} position={"relative"}>
					<SimpleGrid flex={1} columns={{ base: 1, md: 3 }} gap={4} padding={4}>
						<FieldRoot id={`reference-name-${reference.id}`}>
							<FieldLabel>Name</FieldLabel>
							<InputGroup startElement={<LuUser />}>
								<Input
									bgColor={"bg.card"}
									type="text"
									size={"lg"}
									placeholder="Your reference name"
									value={reference.name}
									onChange={(e) => updateReference(reference.id, "name", e.target.value)}
								/>
							</InputGroup>
						</FieldRoot>
						<FieldRoot id={`reference-email-${reference.id}`}>
							<FieldLabel>Email</FieldLabel>
							<InputGroup startElement={<LuMail />}>
								<Input
									bgColor={"bg.card"}
									type="email"
									size={"lg"}
									placeholder="Your reference email"
									value={reference.email}
									onChange={(e) => updateReference(reference.id, "email", e.target.value)}
								/>
							</InputGroup>
						</FieldRoot>
						<FieldRoot id={`reference-phone-${reference.id}`}>
							<FieldLabel>Phone</FieldLabel>
							<InputGroup startElement={<LuPhone />}>
								<Input
									bgColor={"bg.card"}
									type="tel"
									size={"lg"}
									placeholder="Your reference phone"
									value={reference.phone}
									onChange={(e) => updateReference(reference.id, "phone", e.target.value)}
								/>
							</InputGroup>
						</FieldRoot>
					</SimpleGrid>
					<Show when={index !== 0}>
						<IconButton position={"absolute"} right={0} top={0} size={"sm"} onClick={() => removeReference(reference.id)} variant={"plain"} colorPalette={"red"}>
							<LuX />
						</IconButton>
					</Show>
				</Box>
			))}
		</Stack>
	);
});

RtrReferenceForm.displayName = "RtrReferenceForm";
