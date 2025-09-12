"use client";
import { Fragment } from "react";
import { RtrCandidateInformation } from "../dashboard/recruiter/rtr/rtr-candidate-information";
import { RtrPositionDetails } from "../dashboard/recruiter/rtr/rtr-position-detail";
import { RtrPayInformation } from "../dashboard/recruiter/rtr/rtr-pay-information";
import { RtrTemplateInfo } from "../dashboard/recruiter/rtr/rtr-template-info";
import { RtrNotes } from "../dashboard/recruiter/rtr/rtr-notes";

export const CreateRtrForm = () => {
	return (
		<Fragment>
			<RtrCandidateInformation />
			<RtrPositionDetails />
			<RtrPayInformation />
			<RtrTemplateInfo />
			<RtrNotes />
		</Fragment>
	);
};
