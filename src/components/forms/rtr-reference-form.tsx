/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Box, FieldErrorText, FieldLabel, FieldRoot, IconButton, Input, InputGroup, Show, SimpleGrid, Stack } from "@chakra-ui/react";
import { LuMail, LuPhone, LuUser, LuX } from "react-icons/lu";
import { FC, useMemo } from "react";
import { useRtrAcceptance } from "@/store";
import { RtrDetailQuery } from "@/graphql/generated/graphql";
import { UseFormReturn } from "react-hook-form";
import { getFormSchema } from "@/lib/utils";
import { z } from "zod";

interface ReferenceData {
	name: string;
	email: string;
	phone: string;
}

interface RtrReferenceFormProps {
	rtr: RtrDetailQuery["rtr"];
	form: UseFormReturn<any>;
}

export const RtrReferenceForm: FC<RtrReferenceFormProps> = ({ rtr, form }) => {
	const formSchema = useMemo(() => getFormSchema(rtr), [rtr]);
	const { register, formState, watch } = useMemo(() => form as UseFormReturn<z.infer<typeof formSchema>>, [form]);
	const { formData, updateFormField } = useRtrAcceptance();
	const references: ReferenceData[] = useMemo(() => formData.references, [formData.references]);

	return (
		<Stack gap={4} divideY={"1px"} divideColor={"border"}>
			{references.map((reference, index) => (
				<Box key={index} position={"relative"}>
					<SimpleGrid flex={1} columns={{ base: 1, md: 3 }} gap={4} padding={4}>
						<FieldRoot id={`reference-name-${index}`} invalid={!!formState.errors.references?.[index]?.name}>
							<FieldLabel>Name</FieldLabel>
							<InputGroup startElement={<LuUser />}>
								<Input bgColor={"bg.card"} type="text" size={"lg"} placeholder="Your reference name" {...register(`references.${index}.name`)} />
							</InputGroup>
							<FieldErrorText>{formState.errors.references?.[index]?.name?.message}</FieldErrorText>
						</FieldRoot>
						<FieldRoot id={`reference-email-${index}`} invalid={!!formState.errors.references?.[index]?.email}>
							<FieldLabel>Email</FieldLabel>
							<InputGroup startElement={<LuMail />}>
								<Input bgColor={"bg.card"} type="email" size={"lg"} placeholder="Your reference email" {...register(`references.${index}.email`)} />
							</InputGroup>
							<FieldErrorText>{formState.errors.references?.[index]?.email?.message}</FieldErrorText>
						</FieldRoot>
						<FieldRoot id={`reference-phone-${index}`} invalid={!!formState.errors.references?.[index]?.phone}>
							<FieldLabel>Phone</FieldLabel>
							<InputGroup startElement={<LuPhone />}>
								<Input bgColor={"bg.card"} type="tel" size={"lg"} placeholder="Your reference phone" {...register(`references.${index}.phone`)} />
							</InputGroup>
							<FieldErrorText>{formState.errors.references?.[index]?.phone?.message}</FieldErrorText>
						</FieldRoot>
					</SimpleGrid>
					<Show when={index !== 0}>
						<IconButton position={"absolute"} right={0} top={0} size={"sm"} onClick={() => {}} variant={"plain"} colorPalette={"red"}>
							<LuX />
						</IconButton>
					</Show>
				</Box>
			))}
		</Stack>
	);
};
