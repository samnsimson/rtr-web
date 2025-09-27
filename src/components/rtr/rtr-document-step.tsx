"use client";
import { FC, useRef } from "react";
import { AppCard } from "../ui/app-card";
import { RtrDetailQuery } from "@/graphql/generated/graphql";
import { Button, Show, Stack } from "@chakra-ui/react";
import { HiPlus } from "react-icons/hi";
import { RtrEmployerDetailForm } from "../forms/rtr-employer-detail-form";
import { RtrReferenceForm, RtrReferenceFormRef } from "../forms/rtr-reference-form";
import { RtrSkillListForm } from "../forms/rtr-skill-list-form";
import { RtrCandidateResumeForm } from "../forms/rtr-candidate-resume-form";
import { RtrCandidatePhotoIdForm } from "../forms/rtr-candidate-photoid-form";

interface RtrDocumentStepProps {
	rtr: RtrDetailQuery["rtr"];
}

export const RtrDocumentStep: FC<RtrDocumentStepProps> = ({ rtr }) => {
	const referenceFormRef = useRef<RtrReferenceFormRef>(null);
	return (
		<Stack gap={6}>
			<Show when={rtr.resumeRequired}>
				<AppCard title="Resume" bgColor={"bg"}>
					<RtrCandidateResumeForm />
				</AppCard>
			</Show>
			<Show when={rtr.photoIdRequired}>
				<AppCard title="Photo ID" bgColor={"bg"}>
					<RtrCandidatePhotoIdForm />
				</AppCard>
			</Show>
			<Show when={rtr.employerDetailsRequired}>
				<AppCard title="Employer Details" bgColor={"bg"}>
					<RtrEmployerDetailForm />
				</AppCard>
			</Show>
			<Show when={rtr.referencesRequired}>
				<AppCard
					title="References"
					bgColor={"bg"}
					noPadding
					action={
						<Button variant="plain" size="sm" colorPalette={"teal"} onClick={() => referenceFormRef.current?.addReference()}>
							<HiPlus /> Add reference
						</Button>
					}
				>
					<RtrReferenceForm ref={referenceFormRef} />
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
