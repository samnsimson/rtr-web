"use client";
import { useEffect } from "react";
import { RtrCandidateInformation } from "../dashboard/recruiter/rtr/rtr-candidate-information";
import { RtrPositionDetails } from "../dashboard/recruiter/rtr/rtr-position-detail";
import { RtrPayInformation } from "../dashboard/recruiter/rtr/rtr-pay-information";
import { RtrTemplateInfo } from "../dashboard/recruiter/rtr/rtr-template-info";
import { RtrNotes } from "../dashboard/recruiter/rtr/rtr-notes";
import { useRtrForm } from "@/store/useRtrForm";
import { SimpleGrid } from "@chakra-ui/react";

export const CreateRtrForm = () => {
	const { resetForm } = useRtrForm();

	useEffect(() => {
		return () => resetForm();
	}, [resetForm]);

	return (
		<SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
			<RtrCandidateInformation />
			<RtrPositionDetails />
			<RtrPayInformation />
			<RtrTemplateInfo />
			<RtrNotes />
		</SimpleGrid>
	);
};
