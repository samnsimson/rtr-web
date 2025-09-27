"use client";
import { GetCompiledRtrTemplateQuery, RtrDetailQuery } from "@/graphql/generated/graphql";
import { Field, For, Heading, Input, InputGroup, Separator, SimpleGrid, Stack, Steps, Text, useSteps } from "@chakra-ui/react";
import { FC, useEffect, useMemo } from "react";
import { RtrJobInfo } from "./rtr-job-info";
import { RtrStepsAction } from "./rtr-steps-action";
import { RtrInfo } from "./rtr-info";
import { RtrDocumentStep } from "./rtr-document-step";
import { useRtrAcceptance } from "@/store";

interface RtrStepsProps {
	rtrTemplateData: GetCompiledRtrTemplateQuery["compiledRtrTemplate"];
	rtrData: RtrDetailQuery["rtr"];
}

const generateSteps = (rtrTemplateData: GetCompiledRtrTemplateQuery["compiledRtrTemplate"], rtrData: RtrDetailQuery["rtr"]) => {
	return [
		{ title: "Job Info", children: <RtrJobInfo rtr={rtrData} /> },
		{ title: "RTR Info", children: <RtrInfo rtr={rtrTemplateData} /> },
		{ title: "Documents", children: <RtrDocumentStep rtr={rtrData} /> },
	];
};

export const RtrSteps: FC<RtrStepsProps> = ({ rtrTemplateData, rtrData }) => {
	const { formData, updateField, updateFormField } = useRtrAcceptance();
	const items = useMemo(() => generateSteps(rtrTemplateData, rtrData), [rtrTemplateData, rtrData]);
	const steps = useSteps({ defaultStep: 0, count: items.length });

	useEffect(() => {
		updateField("resumeRequired", rtrData.resumeRequired);
		updateField("photoIdRequired", rtrData.photoIdRequired);
		updateField("employerDetailsRequired", rtrData.employerDetailsRequired);
		updateField("referencesRequired", rtrData.referencesRequired);
		updateField("skillsRequired", rtrData.skillsRequired);
		if (rtrData.referencesRequired && formData.references.length === 0) {
			updateFormField("references", [{ name: "", email: "", phone: "" }]);
		}
	}, [rtrData, updateField, updateFormField, formData.references]);

	return (
		<Stack flex={1} direction={"column"} gap={6}>
			<RtrStepsAction steps={steps} />
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
					<SimpleGrid columns={{ base: 1, md: 2 }} gap={4} marginY={4}>
						<Field.Root>
							<Field.Label>Name</Field.Label>
							<InputGroup>
								<Input bgColor={"bg.card"} type="text" size={"lg"} placeholder="Your name" onChange={console.log} />
							</InputGroup>
						</Field.Root>
						<Field.Root>
							<Field.Label>Date</Field.Label>
							<InputGroup>
								<Input bgColor={"bg.card"} type="text" size={"lg"} placeholder="Select date" onChange={console.log} />
							</InputGroup>
						</Field.Root>
					</SimpleGrid>
				</Steps.CompletedContent>
			</Steps.RootProvider>
			<RtrStepsAction steps={steps} />
		</Stack>
	);
};
