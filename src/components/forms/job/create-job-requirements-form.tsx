"use client";
import { FC } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { CreateJobType } from "@/zod/types";
import { AppCard } from "@/components/ui/app-card";
import { Stack, Field, HStack, Input, Button, For } from "@chakra-ui/react";
import { LuPlus, LuX } from "react-icons/lu";

interface CreateJobRequirementsFormProps {
	form: UseFormReturn<CreateJobType>;
}

export const CreateJobRequirementsForm: FC<CreateJobRequirementsFormProps> = ({ form }) => {
	const { fields, append, remove } = useFieldArray({ control: form.control, name: "requirements" });

	return (
		<AppCard title="Requirements" description="What candidates need for the job">
			<Stack gap={6}>
				<Field.Root id="requirements" width="full">
					<Stack gap={2} width={"full"}>
						<For each={fields}>
							{(req, index) => (
								<HStack key={index} gap={2} width={"full"}>
									<Input bgColor={"bg.card"} placeholder="e.g., 5+ years of experience" size={"lg"} {...form.register(`requirements.${index}.requirement`)} />
									<Button type="button" size="sm" variant="ghost" colorPalette="red" onClick={() => remove(index)} disabled={fields.length === 1}>
										<LuX />
									</Button>
								</HStack>
							)}
						</For>

						<Button type="button" size="sm" variant="solid" colorPalette="blue" onClick={() => append({ requirement: "" })} width={"full"}>
							<LuPlus /> Add Requirement
						</Button>
					</Stack>
				</Field.Root>
			</Stack>
		</AppCard>
	);
};
