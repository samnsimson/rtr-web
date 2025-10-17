"use client";
import { FC } from "react";
import { GetCompiledRtrTemplateQuery } from "@/graphql/generated/graphql";
import { AppCard } from "../ui/app-card";
import { CheckboxCard, Field, Stack, Text } from "@chakra-ui/react";
import { Controller, UseFormReturn } from "react-hook-form";
import { RtrAcceptanceFormType } from "@/zod";

interface RtrInfoProps {
	rtr: GetCompiledRtrTemplateQuery["compiledRtrTemplate"];
	form: UseFormReturn<RtrAcceptanceFormType>;
}

export const RtrInfo: FC<RtrInfoProps> = ({ rtr, form }) => {
	return (
		<Stack gap={6}>
			<AppCard title="RTR Info" bgColor={"bg"}>
				<Text dangerouslySetInnerHTML={{ __html: rtr.html }} />
			</AppCard>
			<AppCard title="Note from Recruiter" bgColor={"bg"}>
				<Text>{rtr.description}</Text>
			</AppCard>
			<Controller
				name="termsAccepted"
				control={form.control}
				render={({ field }) => (
					<Field.Root required>
						<CheckboxCard.Root
							width={"full"}
							variant={"surface"}
							colorPalette={"blue"}
							checked={field.value}
							onCheckedChange={({ checked }) => field.onChange(checked)}
						>
							<CheckboxCard.HiddenInput />
							<CheckboxCard.Control spaceX={4}>
								<CheckboxCard.Indicator />
								<CheckboxCard.Content>
									<CheckboxCard.Label>I Accept</CheckboxCard.Label>
									<CheckboxCard.Description>The terms and conditions of the RTR</CheckboxCard.Description>
								</CheckboxCard.Content>
							</CheckboxCard.Control>
						</CheckboxCard.Root>
						<Field.ErrorText>{form.formState.errors["termsAccepted"]?.message}</Field.ErrorText>
					</Field.Root>
				)}
			/>
		</Stack>
	);
};
