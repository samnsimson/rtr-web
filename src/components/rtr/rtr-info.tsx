"use client";
import { FC } from "react";
import { GetCompiledRtrTemplateQuery } from "@/graphql/generated/graphql";
import { AppCard } from "../ui/app-card";
import { CheckboxCard, Stack, Text } from "@chakra-ui/react";
import { useRtrAcceptance } from "@/store";

interface RtrInfoProps {
	rtr: GetCompiledRtrTemplateQuery["compiledRtrTemplate"];
}

export const RtrInfo: FC<RtrInfoProps> = ({ rtr }) => {
	const { updateFormField } = useRtrAcceptance();
	return (
		<Stack gap={6}>
			<AppCard title="RTR Info" bgColor={"bg"}>
				<Text dangerouslySetInnerHTML={{ __html: rtr.html }} />
			</AppCard>
			<AppCard title="Note from Recruiter" bgColor={"bg"}>
				<Text>{rtr.description}</Text>
			</AppCard>
			<CheckboxCard.Root variant={"surface"} colorPalette={"blue"} onCheckedChange={({ checked }) => updateFormField("rtrAccepted", Boolean(checked))}>
				<CheckboxCard.HiddenInput />
				<CheckboxCard.Control spaceX={4}>
					<CheckboxCard.Indicator />
					<CheckboxCard.Content>
						<CheckboxCard.Label>I Accept</CheckboxCard.Label>
						<CheckboxCard.Description>The terms and conditions of the RTR</CheckboxCard.Description>
					</CheckboxCard.Content>
				</CheckboxCard.Control>
			</CheckboxCard.Root>
		</Stack>
	);
};
