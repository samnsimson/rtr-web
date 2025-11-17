import { FC } from "react";
import { AppCard } from "@/components/ui/app-card";
import { Button, Field, For, HStack, Input, Stack } from "@chakra-ui/react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { LuX, LuPlus } from "react-icons/lu";
import { CreateJobType } from "@/zod/types";

interface CreateJobBenefitsFormProps {
	form: UseFormReturn<CreateJobType>;
}

export const CreateJobBenefitsForm: FC<CreateJobBenefitsFormProps> = ({ form }) => {
	const { fields, append, remove } = useFieldArray({ control: form.control, name: "benefits" });
	return (
		<AppCard title="Benefits" description="What the job offers to candidates">
			<Stack gap={6}>
				<Field.Root id="benefits" width="full">
					<Stack gap={2} width={"full"}>
						<For each={fields}>
							{(ben, index) => (
								<HStack key={index} gap={2} width={"full"}>
									<Input bgColor={"bg.card"} placeholder="e.g., Health insurance" size={"lg"} {...form.register(`benefits.${index}.benefit`)} />
									<Button type="button" size="sm" variant="ghost" colorPalette="red" onClick={() => remove(index)} disabled={fields.length === 1}>
										<LuX />
									</Button>
								</HStack>
							)}
						</For>
						<Button type="button" size="sm" variant="solid" colorPalette="blue" onClick={() => append({ benefit: "" })} width={"full"}>
							<LuPlus /> Add Benefit
						</Button>
					</Stack>
				</Field.Root>
			</Stack>
		</AppCard>
	);
};
