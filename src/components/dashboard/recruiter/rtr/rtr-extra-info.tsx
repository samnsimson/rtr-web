"use client";
import { AppCard } from "@/components/ui/app-card";
import { Box, CheckboxCard, CheckboxGroup, For } from "@chakra-ui/react";
import { useRtrForm } from "@/store";
import { useState } from "react";

interface Item {
	value: string;
	label: string;
	description: string;
}

const items = [
	{ value: "request-resume", label: "Request Resume", description: "Request resume from the candidate" },
	{ value: "request-photo-id", label: "Request Photo ID", description: "Request photo ID from the candidate (e.g. passport, driver's license, etc.)" },
	{ value: "request-employer-details", label: "Request Employer Details", description: "Request employer details from the candidate" },
	{ value: "request-references", label: "Request References", description: "Request references from the candidate" },
	{ value: "request-skills", label: "Request Skills", description: "Request skills from the candidate" },
];

export const RtrExtraInfo = () => {
	const { formData, updateField } = useRtrForm();
	const [defaultChecked] = useState<string[]>(() => {
		const values = [];
		if (formData.resumeRequired) values.push("request-resume");
		if (formData.photoIdRequired) values.push("request-photo-id");
		if (formData.employerDetailsRequired) values.push("request-employer-details");
		if (formData.referencesRequired) values.push("request-references");
		if (formData.skillsRequired) values.push("request-skills");
		return values;
	});

	const handleCheckedChange = (checked: boolean, item: Item) => {
		if (item.value === "request-resume") updateField("resumeRequired", checked);
		if (item.value === "request-photo-id") updateField("photoIdRequired", checked);
		if (item.value === "request-employer-details") updateField("employerDetailsRequired", checked);
		if (item.value === "request-references") updateField("referencesRequired", checked);
		if (item.value === "request-skills") updateField("skillsRequired", checked);
	};

	return (
		<AppCard title="Extra Info" description="Extra Info" bgColor={"bg"} noPadding>
			<CheckboxGroup defaultValue={defaultChecked} gap={0} divideY={"1px"} divideColor={"border"}>
				<For each={items}>
					{(item) => (
						<Box key={item.value}>
							<CheckboxCard.Root
								value={item.value}
								variant={"surface"}
								colorPalette={"blue"}
								rounded={"none"}
								cursor={"pointer"}
								border={"none"}
								onCheckedChange={({ checked }) => handleCheckedChange(Boolean(checked), item)}
							>
								<CheckboxCard.HiddenInput />
								<CheckboxCard.Control>
									<CheckboxCard.Content>
										<CheckboxCard.Label>{item.label}</CheckboxCard.Label>
										<CheckboxCard.Description>{item.description}</CheckboxCard.Description>
									</CheckboxCard.Content>
									<CheckboxCard.Indicator />
								</CheckboxCard.Control>
							</CheckboxCard.Root>
						</Box>
					)}
				</For>
			</CheckboxGroup>
		</AppCard>
	);
};
