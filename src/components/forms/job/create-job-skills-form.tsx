"use client";
import { FC } from "react";
import { AppCard } from "@/components/ui/app-card";
import { Button, createListCollection, Field, For, HStack, Icon, Input, Show, Stack } from "@chakra-ui/react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { CreateJobType } from "@/zod/types";
import { SelectBox } from "@/components/ui/select-box";
import { ExperiencePeriod } from "@/graphql/generated/graphql";
import { LuPlus, LuX } from "react-icons/lu";

interface CreateJobSkillsFormProps {
	form: UseFormReturn<CreateJobType>;
}

const experienceCollection = createListCollection({
	items: [
		{ name: "Years", value: ExperiencePeriod.Years },
		{ name: "Months", value: ExperiencePeriod.Months },
		{ name: "Days", value: ExperiencePeriod.Days },
	],
});

export const CreateJobSkillsForm: FC<CreateJobSkillsFormProps> = ({ form }) => {
	const { fields, append, remove } = useFieldArray({ control: form.control, name: "skills" });
	const addSkill = () => append({ skill: "", experience: 0, experiencePeriod: ExperiencePeriod.Years });
	const removeSkill = (index: number) => remove(index);

	return (
		<AppCard title="Job Skills" description="The skills required for the job">
			<Stack gap={4}>
				<For each={fields}>
					{(skill, index) => (
						<HStack key={index} gap={4} width={"full"} position={"relative"}>
							<Field.Root id="skill" required>
								<Field.Label>
									Skill <Field.RequiredIndicator />
								</Field.Label>
								<Input bgColor={"bg.card"} type="text" size={"lg"} placeholder="e.g., React" {...form.register(`skills.${index}.skill`)} />
								<Field.ErrorText>{form.formState.errors["skills"]?.[index]?.skill?.message}</Field.ErrorText>
							</Field.Root>
							<Field.Root id="experience" required>
								<Field.Label>
									Experience <Field.RequiredIndicator />
								</Field.Label>
								<Input
									size={"lg"}
									type="number"
									bgColor={"bg.card"}
									placeholder="e.g., 5"
									{...form.register(`skills.${index}.experience`, { valueAsNumber: true })}
								/>
								<Field.ErrorText>{form.formState.errors["skills"]?.[index]?.experience?.message}</Field.ErrorText>
							</Field.Root>
							<Field.Root id="experience-period" required>
								<SelectBox
									required
									label={"Period"}
									name={`skills.${index}.experiencePeriod`}
									defaultValue={[form.getValues(`skills.${index}.experiencePeriod`) as ExperiencePeriod]}
									onValueChange={(e) => form.setValue(`skills.${index}.experiencePeriod`, e.value.pop() as ExperiencePeriod)}
									collection={experienceCollection}
								/>
								<Field.ErrorText>{form.formState.errors["skills"]?.[index]?.experiencePeriod?.message}</Field.ErrorText>
							</Field.Root>
							<Show when={index !== 0}>
								<Icon as={LuX} size={"sm"} color={"red.500"} cursor={"pointer"} position={"absolute"} right={0} top={0} onClick={() => removeSkill(index)} />
							</Show>
						</HStack>
					)}
				</For>
				<Button type="button" size="sm" variant="solid" colorPalette={"blue"} onClick={addSkill}>
					<LuPlus /> Add Skill
				</Button>
			</Stack>
		</AppCard>
	);
};
