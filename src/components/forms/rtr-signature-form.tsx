"use client";
import { RtrDetailQuery } from "@/graphql/generated/graphql";
import { RtrAcceptanceFormType } from "@/zod";
import { SimpleGrid, Field, InputGroup, Input } from "@chakra-ui/react";
import { FC, HTMLAttributes } from "react";
import { UseFormReturn } from "react-hook-form";

interface RtrSignatureFormProps extends HTMLAttributes<HTMLDivElement> {
	form: UseFormReturn<RtrAcceptanceFormType>;
	rtr: RtrDetailQuery["rtr"];
}

export const RtrSignatureForm: FC<RtrSignatureFormProps> = ({ form }) => {
	const { register } = form;
	return (
		<SimpleGrid columns={{ base: 1, md: 2 }} gap={4} marginY={4}>
			<Field.Root required invalid={!!form.formState.errors["signatureName"]}>
				<Field.Label>
					Name <Field.RequiredIndicator fontSize={20} />
				</Field.Label>
				<InputGroup>
					<Input bgColor={"bg.card"} type="text" size={"lg"} placeholder="Your name" {...register("signatureName")} />
				</InputGroup>
				<Field.ErrorText>{form.formState.errors["signatureName"]?.message}</Field.ErrorText>
			</Field.Root>
			<Field.Root required invalid={!!form.formState.errors["signatureDate"]}>
				<Field.Label>
					Date <Field.RequiredIndicator fontSize={20} />
				</Field.Label>
				<InputGroup>
					<Input bgColor={"bg.card"} type="text" size={"lg"} placeholder="Select date" {...register("signatureDate")} />
				</InputGroup>
				<Field.ErrorText>{form.formState.errors["signatureDate"]?.message}</Field.ErrorText>
			</Field.Root>
		</SimpleGrid>
	);
};
