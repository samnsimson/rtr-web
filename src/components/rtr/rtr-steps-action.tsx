"use client";
import { FC } from "react";
import { Button, HStack, UseStepsReturn } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight, LuCheck } from "react-icons/lu";
import { useRtrAcceptance } from "@/store";
import { toaster } from "../ui/toaster";

export const RtrStepsAction: FC<{ steps: UseStepsReturn }> = ({ steps }) => {
	const { isStepValid } = useRtrAcceptance();

	const handleNext = () => {
		if (isStepValid(steps.value)) steps.goToNextStep();
		else toaster.create({ title: "Please fill out all required fields", type: "error" });
	};
	return (
		<HStack justify={"space-between"} width={"full"}>
			<Button variant={"plain"} colorPalette={"teal"} disabled={!steps.hasPrevStep} onClick={() => steps.goToPrevStep()}>
				<LuChevronLeft /> Previous
			</Button>
			{!steps.isCompleted ? (
				<Button variant={"plain"} colorPalette={"teal"} disabled={!steps.hasNextStep} onClick={handleNext}>
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
