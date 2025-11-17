import { Field, Textarea } from "@chakra-ui/react";
import { AppCard } from "@/components/ui/app-card";
import { UseFormReturn } from "react-hook-form";
import { CreateJobType } from "@/zod/types";
import { FC } from "react";

interface CreateJobDescriptionFormProps {
	form: UseFormReturn<CreateJobType>;
}

export const CreateJobDescriptionForm: FC<CreateJobDescriptionFormProps> = ({ form }) => {
	return (
		<AppCard title="Job Description" description="Detailed description of the role and responsibilities">
			<Field.Root id="job-description" required>
				<Field.Label>Job Description</Field.Label>
				<Textarea bgColor={"bg.card"} size={"lg"} rows={8} placeholder="Add a detailed job description for this position..." {...form.register("description")} />
				<Field.ErrorText>{form.formState.errors["description"]?.message}</Field.ErrorText>
			</Field.Root>
		</AppCard>
	);
};
