"use client";
import { FieldHelperText, FieldLabel, FieldRoot, Flex, For, Input, InputGroup, Show, Stack, Tag } from "@chakra-ui/react";
import { LuHash } from "react-icons/lu";
import { useState } from "react";
import { useRtrAcceptance } from "@/store";

export const RtrSkillListForm = () => {
	const [skill, setSkill] = useState("");
	const { formData, updateFormField } = useRtrAcceptance();

	const removeSkill = (skill: string) => {
		const updatedSkills = formData.skills.filter((s) => s !== skill);
		updateFormField("skills", updatedSkills);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" || e.key === "Tab") {
			e.preventDefault();
			updateFormField("skills", [...formData.skills, e.currentTarget.value]);
			setSkill("");
		}
	};

	return (
		<Stack>
			<Show when={formData.skills.length > 0}>
				<Flex wrap={"wrap"} gap={2}>
					<For each={formData.skills}>
						{(skill) => (
							<Tag.Root size={"lg"} key={skill} variant={"solid"} colorPalette={"teal"}>
								<Tag.Label>{skill}</Tag.Label>
								<Tag.EndElement>
									<Tag.CloseTrigger onClick={() => removeSkill(skill)} />
								</Tag.EndElement>
							</Tag.Root>
						)}
					</For>
				</Flex>
			</Show>
			<FieldRoot id="skills">
				<FieldLabel>Add your skills</FieldLabel>
				<InputGroup startElement={<LuHash />}>
					<Input
						bgColor={"bg.card"}
						type="text"
						size={"lg"}
						placeholder="Your skill"
						value={skill}
						onKeyDown={handleKeyDown}
						onChange={(e) => setSkill(e.target.value)}
					/>
				</InputGroup>
				<FieldHelperText>Enter your skills and hit enter to add</FieldHelperText>
			</FieldRoot>
		</Stack>
	);
};
