"use client";
import { FC } from "react";
import { Button, HStack, UseStepsReturn } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight, LuCheck } from "react-icons/lu";

export const RtrStepsAction: FC<{ steps: UseStepsReturn }> = ({ steps }) => {
	return (
		<HStack justify={"space-between"} width={"full"}>
			<Button variant={"plain"} colorPalette={"teal"} disabled={!steps.hasPrevStep} onClick={() => steps.goToPrevStep()}>
				<LuChevronLeft /> Previous
			</Button>
			{!steps.isCompleted ? (
				<Button variant={"plain"} colorPalette={"teal"} disabled={!steps.hasNextStep} onClick={() => steps.goToNextStep()}>
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
