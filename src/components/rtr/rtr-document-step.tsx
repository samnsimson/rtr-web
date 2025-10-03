"use client";
import { FC } from "react";
import { AppCard } from "../ui/app-card";
import { RtrDetailQuery } from "@/graphql/generated/graphql";
import { Button, Show, Stack } from "@chakra-ui/react";
import { HiPlus } from "react-icons/hi";
import { RtrEmployerDetailForm } from "../forms/rtr-employer-detail-form";
import { RtrReferenceForm } from "../forms/rtr-reference-form";
import { RtrSkillListForm } from "../forms/rtr-skill-list-form";
import { RtrCandidateResumeForm } from "../forms/rtr-candidate-resume-form";
import { RtrCandidatePhotoIdForm } from "../forms/rtr-candidate-photoid-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getFormSchema } from "@/lib/utils";

interface RtrDocumentStepProps {
	rtr: RtrDetailQuery["rtr"];
}

export const RtrDocumentStep: FC<RtrDocumentStepProps> = ({ rtr }) => {
	const formSchema = getFormSchema(rtr);
	const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema), mode: "onBlur" });

	return (
		<Stack gap={6}>
			<Show when={rtr.resumeRequired}>
				<AppCard title="Resume" bgColor={"bg"}>
					<RtrCandidateResumeForm rtr={rtr} form={form} />
				</AppCard>
			</Show>
			<Show when={rtr.photoIdRequired}>
				<AppCard title="Photo ID" bgColor={"bg"}>
					<RtrCandidatePhotoIdForm />
				</AppCard>
			</Show>
			<Show when={rtr.employerDetailsRequired}>
				<AppCard title="Employer Details" bgColor={"bg"}>
					<RtrEmployerDetailForm rtr={rtr} form={form} />
				</AppCard>
			</Show>
			<Show when={rtr.referencesRequired}>
				<AppCard
					title="References"
					bgColor={"bg"}
					noPadding
					action={
						<Button variant="plain" size="sm" colorPalette={"teal"} onClick={() => {}}>
							<HiPlus /> Add reference
						</Button>
					}
				>
					<RtrReferenceForm rtr={rtr} form={form} />
				</AppCard>
			</Show>
			<Show when={rtr.skillsRequired}>
				<AppCard title="Skills" bgColor={"bg"}>
					<RtrSkillListForm />
				</AppCard>
			</Show>
		</Stack>
	);
};
