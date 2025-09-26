"use client";
import { FieldLabel, FieldRoot, Flex, For, Input, InputGroup, Show, Stack, Tag } from "@chakra-ui/react";
import { LuHash } from "react-icons/lu";
import { useState } from "react";

export const RtrSkillListForm = () => {
	const [skill, setSkill] = useState("");
	const [skills, setSkills] = useState<Array<string>>([]);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			setSkills([...skills, e.currentTarget.value]);
			setSkill("");
		}
	};

	return (
		<Stack>
			<Show when={skills.length > 0}>
				<Flex wrap={"wrap"} gap={2}>
					<For each={skills}>
						{(skill) => (
							<Tag.Root size={"lg"} key={skill} variant={"solid"} colorPalette={"teal"}>
								<Tag.Label>{skill}</Tag.Label>
								<Tag.EndElement>
									<Tag.CloseTrigger onClick={() => setSkills(skills.filter((s) => s !== skill))} />
								</Tag.EndElement>
							</Tag.Root>
						)}
					</For>
				</Flex>
			</Show>
			<FieldRoot id="skills">
				<FieldLabel>Skills</FieldLabel>
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
			</FieldRoot>
		</Stack>
	);
};
