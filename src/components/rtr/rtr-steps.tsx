"use client";
import { GetCompiledRtrTemplateQuery, RtrDetailQuery } from "@/graphql/generated/graphql";
import { For, Heading, Separator, Stack, Steps, Text, useSteps } from "@chakra-ui/react";
import { FC, useMemo } from "react";
import { RtrJobInfo } from "./rtr-job-info";
import { RtrStepsAction } from "./rtr-steps-action";
import { RtrInfo } from "./rtr-info";
import { RtrDocumentStep } from "./rtr-document-step";
import { RtrAcceptanceFormType, rtrAcceptanceSchema } from "@/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RtrSignatureForm } from "../forms/rtr/rtr-signature-form";

interface RtrStepsProps {
	rtrTemplateData: GetCompiledRtrTemplateQuery["compiledRtrTemplate"];
	rtrData: RtrDetailQuery["rtr"];
}

const generateSteps = (rtrTemplateData: GetCompiledRtrTemplateQuery["compiledRtrTemplate"], rtrData: RtrDetailQuery["rtr"], form: UseFormReturn<RtrAcceptanceFormType>) => {
	return [
		{ title: "Job Info", children: <RtrJobInfo rtr={rtrData} form={form} /> },
		{ title: "RTR Info", children: <RtrInfo rtr={rtrTemplateData} form={form} /> },
		{ title: "Documents", children: <RtrDocumentStep rtr={rtrData} form={form} /> },
	];
};

export const RtrSteps: FC<RtrStepsProps> = ({ rtrTemplateData, rtrData }) => {
	const form = useForm<RtrAcceptanceFormType>({
		mode: "onBlur",
		resolver: zodResolver(rtrAcceptanceSchema),
		defaultValues: {
			resumeRequired: rtrData.resumeRequired,
			photoIdRequired: rtrData.photoIdRequired,
			employerDetailsRequired: rtrData.employerDetailsRequired,
			referencesRequired: rtrData.referencesRequired,
			skillsRequired: rtrData.skillsRequired,
			signatureDate: new Date(),
			termsAccepted: true,
			references: [],
			skills: [],
		},
	});
	const items = useMemo(() => generateSteps(rtrTemplateData, rtrData, form), [rtrTemplateData, rtrData, form]);
	const steps = useSteps({ defaultStep: 0, count: items.length });

	return (
		<Stack flex={1} direction={"column"} gap={6}>
			<RtrStepsAction steps={steps} form={form} />
			<Steps.RootProvider value={steps} flex={1}>
				<Steps.List marginY={4}>
					<For each={items}>
						{(step, index) => (
							<Steps.Item key={index} index={index} title={step.title}>
								<Steps.Indicator />
								<Steps.Title>{step.title}</Steps.Title>
								<Steps.Separator />
							</Steps.Item>
						)}
					</For>
				</Steps.List>
				<For each={items}>
					{(step, index) => (
						<Steps.Content key={index} index={index}>
							{step.children}
						</Steps.Content>
					)}
				</For>
				<Steps.CompletedContent>
					<Heading>All steps are complete!</Heading>
					<Text>Thank you for completing the RTR form. We will review your application and get back to you soon.</Text>
					<Separator marginY={8} />
					<Stack>
						<Text>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet saepe quasi vitae quisquam unde inventore soluta laudantium totam nisi dolorum numquam
							officiis atque, nulla, ea autem dolorem excepturi alias ex! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet saepe quasi vitae quisquam
							unde inventore soluta laudantium totam nisi dolorum numquam officiis atque, nulla, ea autem dolorem excepturi alias ex! Lorem ipsum dolor sit amet,
							consectetur adipisicing elit. Eveniet saepe quasi vitae quisquam unde inventore soluta laudantium totam nisi dolorum numquam
						</Text>
						<Text>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet saepe quasi vitae quisquam unde inventore soluta laudantium totam nisi dolorum numquam
							officiis atque, nulla, ea autem dolorem excepturi alias ex! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet saepe quasi vitae quisquam
							unde inventore soluta laudantium totam nisi dolorum numquam officiis atque, nulla, ea autem dolorem excepturi alias ex! Lorem ipsum dolor sit amet,
							consectetur adipisicing elit. Eveniet saepe quasi vitae quisquam unde inventore soluta laudantium totam nisi dolorum numquam
						</Text>
					</Stack>
					<RtrSignatureForm rtr={rtrData} form={form} />
				</Steps.CompletedContent>
			</Steps.RootProvider>
			<RtrStepsAction steps={steps} form={form} />
		</Stack>
	);
};
