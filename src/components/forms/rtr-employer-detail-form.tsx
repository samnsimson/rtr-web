/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { FieldErrorText, FieldLabel, FieldRoot, Input, InputGroup, SimpleGrid } from "@chakra-ui/react";
import { LuMail, LuPhone, LuUser } from "react-icons/lu";
import { UseFormReturn } from "react-hook-form";
import { FC, useEffect, useMemo } from "react";
import { useRtrAcceptance } from "@/store";
import { RtrDetailQuery } from "@/graphql/generated/graphql";
import { getFormSchema } from "@/lib/utils";
import { z } from "zod";

interface RtrEmployerDetailFormProps {
	rtr: RtrDetailQuery["rtr"];
	form: UseFormReturn<any>;
}

export const RtrEmployerDetailForm: FC<RtrEmployerDetailFormProps> = ({ rtr, form }) => {
	const formSchema = useMemo(() => getFormSchema(rtr), [rtr]);
	const { register, formState, watch } = useMemo(() => form as UseFormReturn<z.infer<typeof formSchema>>, [form]);
	const { updateFormField } = useRtrAcceptance();

	useEffect(() => {
		const subscription = watch((value, { name }) => {
			if (name == "employerName") updateFormField("employerName", value[name]);
			if (name == "contactPersonName") updateFormField("contactPersonName", value[name]);
			if (name == "employerPhone") updateFormField("employerPhone", value[name]);
			if (name == "employerEmail") updateFormField("employerEmail", value[name]);
		});

		return () => subscription.unsubscribe();
	}, [updateFormField, watch]);

	return (
		<SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
			<FieldRoot id="employer-name" invalid={!!formState.errors.employerName}>
				<FieldLabel>Employer Name</FieldLabel>
				<InputGroup startElement={<LuUser />}>
					<Input bgColor={"bg.card"} type="text" size={"lg"} placeholder="Your employer name" {...register("employerName")} />
				</InputGroup>
				<FieldErrorText>{formState.errors.employerName?.message}</FieldErrorText>
			</FieldRoot>
			<FieldRoot id="employer-name" invalid={!!formState.errors.contactPersonName}>
				<FieldLabel>Contact Person Name</FieldLabel>
				<InputGroup startElement={<LuUser />}>
					<Input bgColor={"bg.card"} type="text" size={"lg"} placeholder="Your contact person name" {...register("contactPersonName")} />
				</InputGroup>
				<FieldErrorText>{formState.errors.contactPersonName?.message}</FieldErrorText>
			</FieldRoot>
			<FieldRoot id="employer-phone" invalid={!!formState.errors.employerPhone}>
				<FieldLabel>Employer Phone</FieldLabel>
				<InputGroup startElement={<LuPhone />}>
					<Input bgColor={"bg.card"} type="text" size={"lg"} placeholder="Your employer phone" {...register("employerPhone")} />
				</InputGroup>
				<FieldErrorText>{formState.errors.employerPhone?.message}</FieldErrorText>
			</FieldRoot>

			<FieldRoot id="employer-email" invalid={!!formState.errors.employerEmail}>
				<FieldLabel>Employer Email</FieldLabel>
				<InputGroup startElement={<LuMail />}>
					<Input bgColor={"bg.card"} type="text" size={"lg"} placeholder="Your employer email" {...register("employerEmail")} />
				</InputGroup>
				<FieldErrorText>{formState.errors.employerEmail?.message}</FieldErrorText>
			</FieldRoot>
		</SimpleGrid>
	);
};
