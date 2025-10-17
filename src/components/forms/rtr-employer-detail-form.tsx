"use client";
import { FC, useMemo } from "react";
import { Field, Input, InputGroup, SimpleGrid } from "@chakra-ui/react";
import { LuMail, LuPhone, LuUser } from "react-icons/lu";
import { UseFormReturn } from "react-hook-form";
import { RtrDetailQuery } from "@/graphql/generated/graphql";
import { RtrAcceptanceFormType } from "@/zod";

interface RtrEmployerDetailFormProps {
	rtr: RtrDetailQuery["rtr"];
	form: UseFormReturn<RtrAcceptanceFormType>;
}

export const RtrEmployerDetailForm: FC<RtrEmployerDetailFormProps> = ({ form }) => {
	const { register } = form;
	const formValues = useMemo(() => form.getValues(), [form]);
	return (
		<SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
			<Field.Root required={formValues.employerDetailsRequired} invalid={!!form.formState.errors.employerName}>
				<Field.Label>
					Employer Name <Field.RequiredIndicator fontSize={20} />
				</Field.Label>
				<InputGroup startElement={<LuUser />}>
					<Input bgColor={"bg.card"} type="text" size={"lg"} placeholder="Your employer name" {...register("employerName")} />
				</InputGroup>
				<Field.ErrorText>{form.formState.errors.employerName?.message}</Field.ErrorText>
			</Field.Root>

			<Field.Root required={formValues.employerDetailsRequired} invalid={!!form.formState.errors.contactPersonName}>
				<Field.Label>
					Contact Person Name <Field.RequiredIndicator fontSize={20} />
				</Field.Label>
				<InputGroup startElement={<LuUser />}>
					<Input bgColor={"bg.card"} type="text" size={"lg"} placeholder="Your contact person name" {...register("contactPersonName")} />
				</InputGroup>
				<Field.ErrorText>{form.formState.errors.contactPersonName?.message}</Field.ErrorText>
			</Field.Root>

			<Field.Root required={formValues.employerDetailsRequired} invalid={!!form.formState.errors.employerPhone}>
				<Field.Label>
					Employer Phone <Field.RequiredIndicator fontSize={20} />
				</Field.Label>
				<InputGroup startElement={<LuPhone />}>
					<Input bgColor={"bg.card"} type="text" size={"lg"} placeholder="Your employer phone" {...register("employerPhone")} />
				</InputGroup>
				<Field.ErrorText>{form.formState.errors.employerPhone?.message}</Field.ErrorText>
			</Field.Root>

			<Field.Root required={formValues.employerDetailsRequired} invalid={!!form.formState.errors.employerEmail}>
				<Field.Label>
					Employer Email <Field.RequiredIndicator fontSize={20} />
				</Field.Label>
				<InputGroup startElement={<LuMail />}>
					<Input bgColor={"bg.card"} type="text" size={"lg"} placeholder="Your employer email" {...register("employerEmail")} />
				</InputGroup>
				<Field.ErrorText>{form.formState.errors.employerEmail?.message}</Field.ErrorText>
			</Field.Root>
		</SimpleGrid>
	);
};
