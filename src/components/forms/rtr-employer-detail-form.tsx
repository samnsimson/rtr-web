"use client";
import { FieldErrorText, FieldLabel, FieldRoot, Input, InputGroup, SimpleGrid } from "@chakra-ui/react";
import { LuMail, LuPhone, LuUser } from "react-icons/lu";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRtrAcceptance } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { RtrEmployerDetailFormType, rtrEmployerDetailFormSchema } from "@/zod";

export const RtrEmployerDetailForm = () => {
	const { updateField } = useRtrAcceptance();
	const { register, watch, formState } = useForm<RtrEmployerDetailFormType>({ resolver: zodResolver(rtrEmployerDetailFormSchema), mode: "onBlur" });

	useEffect(() => {
		const subscription = watch((value) => {
			updateField("employerName", value.employerName);
			updateField("contactPersonName", value.contactPersonName);
			updateField("employerPhone", value.employerPhone);
			updateField("employerEmail", value.employerEmail);
		});

		return () => subscription.unsubscribe();
	}, [updateField, watch]);

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
