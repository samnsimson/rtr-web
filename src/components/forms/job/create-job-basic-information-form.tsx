"use client";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { CreateJobType } from "@/zod/types";
import { Stack, Field, Input } from "@chakra-ui/react";
import { AppCard } from "../../ui/app-card";
import { format } from "date-fns";

interface CreateJobBasicInformationFormProps {
	form: UseFormReturn<CreateJobType>;
}

export const CreateJobBasicInformationForm: FC<CreateJobBasicInformationFormProps> = ({ form }) => {
	return (
		<AppCard title="Basic Information" description="Essential details about the position">
			<Stack gap={4}>
				<Stack gap={4} direction={{ base: "column", md: "row" }}>
					<Field.Root id="position-title" required invalid={form.formState.errors["title"] !== undefined}>
						<Field.Label>
							Position Title <Field.RequiredIndicator />
						</Field.Label>
						<Input bgColor={"bg.card"} type="text" size={"lg"} placeholder="e.g., Senior Software Engineer" {...form.register("title")} />
						<Field.ErrorText>{form.formState.errors["title"]?.message}</Field.ErrorText>
					</Field.Root>
					<Field.Root id="company-name" required invalid={form.formState.errors["companyName"] !== undefined}>
						<Field.Label>
							Company Name <Field.RequiredIndicator />
						</Field.Label>
						<Input bgColor={"bg.card"} type="text" size={"lg"} placeholder="e.g., TechSoft Corp" {...form.register("companyName")} />
						<Field.ErrorText>{form.formState.errors["companyName"]?.message}</Field.ErrorText>
					</Field.Root>
				</Stack>
				<Stack gap={4} direction={{ base: "column", md: "row" }}>
					<Field.Root id="location" required invalid={form.formState.errors["location"] !== undefined}>
						<Field.Label>
							Location <Field.RequiredIndicator />
						</Field.Label>
						<Input bgColor={"bg.card"} type="text" size={"lg"} placeholder="e.g., New York, NY" {...form.register("location")} />
						<Field.ErrorText>{form.formState.errors["location"]?.message}</Field.ErrorText>
					</Field.Root>
					<Field.Root id="expires-at" required invalid={form.formState.errors["expiresAt"] !== undefined}>
						<Field.Label>
							Expires At <Field.RequiredIndicator />
						</Field.Label>
						<Input bgColor={"bg.card"} type="date" min={format(new Date(), "yyyy-MM-dd")} size={"lg"} {...form.register("expiresAt", { valueAsDate: true })} />
						<Field.ErrorText>{form.formState.errors["expiresAt"]?.message}</Field.ErrorText>
					</Field.Root>
				</Stack>
			</Stack>
		</AppCard>
	);
};
