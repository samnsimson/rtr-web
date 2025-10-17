"use client";
import { FC } from "react";
import { Button, HStack, UseStepsReturn } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight, LuCheck } from "react-icons/lu";
import { toaster } from "../ui/toaster";
import { UseFormReturn } from "react-hook-form";
import { RtrAcceptanceFormType } from "@/zod";

const isEmployerDetailsValid = (form: UseFormReturn<RtrAcceptanceFormType>) => {
	const values = form.getValues();
	if (values.employerDetailsRequired === false) return true;
	return values.employerName && values.contactPersonName && values.employerEmail && values.employerPhone;
};

const isReferencesValid = (form: UseFormReturn<RtrAcceptanceFormType>) => {
	const values = form.getValues();
	if (values.referencesRequired === false) return true;
	return values.references && values.references.length > 0;
};

const isSkillsValid = (form: UseFormReturn<RtrAcceptanceFormType>) => {
	const values = form.getValues();
	if (values.skillsRequired === false) return true;
	return values.skills && values.skills.length > 0;
};

const validateStep = (step: number, form: UseFormReturn<RtrAcceptanceFormType>, cb: () => void) => {
	const values = form.getValues();
	switch (step) {
		case 1:
			if (values.termsAccepted === false) return toaster.error({ title: "Error", description: "You must accept the terms and conditions." });
			return cb();
		case 2:
			if (!isEmployerDetailsValid(form)) return toaster.error({ title: "Error", description: "Please fill out all required employer details." });
			if (!isReferencesValid(form)) return toaster.error({ title: "Error", description: "Please add at least one reference." });
			if (!isSkillsValid(form)) return toaster.error({ title: "Error", description: "Please add at least one skill." });
			return cb();
		default:
			return cb();
	}
};

export const RtrStepsAction: FC<{ steps: UseStepsReturn; form: UseFormReturn<RtrAcceptanceFormType> }> = ({ steps, form }) => {
	const handleNext = (step: number) => validateStep(step, form, () => steps.goToNextStep());

	return (
		<HStack justify={"space-between"} width={"full"}>
			<Button variant={"plain"} colorPalette={"teal"} disabled={!steps.hasPrevStep} onClick={() => steps.goToPrevStep()}>
				<LuChevronLeft /> Previous
			</Button>
			{!steps.isCompleted ? (
				<Button variant={"plain"} colorPalette={"teal"} disabled={!steps.hasNextStep} onClick={() => handleNext(steps.value)}>
					Next <LuChevronRight />
				</Button>
			) : (
				<Button variant={"solid"} colorPalette={"teal"} onClick={() => steps.goToNextStep()}>
					Submit <LuCheck />
				</Button>
			)}
		</HStack>
	);
};
