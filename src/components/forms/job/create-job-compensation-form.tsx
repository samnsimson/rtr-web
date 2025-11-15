"use client";
import { FC } from "react";
import { AppCard } from "@/components/ui/app-card";
import { CreateJobType } from "@/zod/types";
import { Stack, Field, InputGroup, Input } from "@chakra-ui/react";
import { UseFormReturn } from "react-hook-form";
import { LuDollarSign } from "react-icons/lu";

interface CreateJobCompensationFormProps {
	form: UseFormReturn<CreateJobType>;
}

export const CreateJobCompensationForm: FC<CreateJobCompensationFormProps> = ({ form }) => {
	return (
		<AppCard title="Compensation" description="Salary range and compensation details">
			<Stack gap={4} direction={{ base: "column", md: "row" }}>
				<Field.Root id="salary-min">
					<Field.Label>Min Salary</Field.Label>
					<InputGroup startElement={<LuDollarSign />}>
						<Input bgColor={"bg.card"} type="number" size={"lg"} placeholder="e.g., 50000" {...form.register("salaryMin", { valueAsNumber: true })} />
					</InputGroup>
					<Field.ErrorText>{form.formState.errors["salaryMin"]?.message}</Field.ErrorText>
				</Field.Root>
				<Field.Root id="salary-max">
					<Field.Label>Max Salary</Field.Label>
					<InputGroup startElement={<LuDollarSign />}>
						<Input bgColor={"bg.card"} type="number" size={"lg"} placeholder="e.g., 80000" {...form.register("salaryMax", { valueAsNumber: true })} />
					</InputGroup>
					<Field.ErrorText>{form.formState.errors["salaryMax"]?.message}</Field.ErrorText>
				</Field.Root>
			</Stack>
		</AppCard>
	);
};
