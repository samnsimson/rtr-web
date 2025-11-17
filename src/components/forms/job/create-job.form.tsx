"use client";
import { Stack, HStack, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { WorkType, JobType, CompensationType, ListJobsDocument, ExperiencePeriod } from "@/graphql/generated/graphql";
import { CreateJobDocument } from "@/graphql/generated/graphql";
import { useMutation } from "@apollo/client/react";
import { CreateJobSkillsForm } from "./create-job-skills-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createJobSchema } from "@/zod/schema";
import { CreateJobType } from "@/zod/types";
import { add } from "date-fns";
import { CreateJobBasicInformationForm } from "./create-job-basic-information-form";
import { CreateJobDescriptionForm } from "./create-job-description-form";
import { CreateJobDetailForm } from "./create-job-detail-form";
import { CreateJobRequirementsForm } from "./create-job-requirements-form";
import { CreateJobBenefitsForm } from "./create-job-benefits-form";
import { toaster } from "@/components/ui/toaster";

export const CreateJobForm = () => {
	const router = useRouter();

	const form = useForm<CreateJobType>({
		mode: "onBlur",
		resolver: zodResolver(createJobSchema),
		defaultValues: {
			title: "",
			description: "",
			companyName: "",
			location: "",
			expiresAt: add(new Date(), { days: 30 }),
			workType: WorkType.Hybrid,
			jobType: JobType.FullTime,
			compensation: CompensationType.Salary,
			salaryMin: 0,
			salaryMax: 0,
			benefits: [{ benefit: "" }],
			requirements: [{ requirement: "" }],
			skills: [{ skill: "", experience: 0, experiencePeriod: ExperiencePeriod.Years }],
		},
	});

	const onCompleted = () => {
		form.reset();
		toaster.success({ title: "Job created successfully", description: "You can now view your job in the dashboard", closable: true });
	};

	const [createJob, { loading: isCreatingJob }] = useMutation(CreateJobDocument, {
		onCompleted: onCompleted,
		onError: (error) => toaster.error({ title: "Please try again", description: error.message, closable: true }),
		refetchQueries: [{ query: ListJobsDocument, variables: { filters: {} } }],
	});

	const handleSubmit = async ({ companyName, expiresAt, benefits, requirements, skills, ...data }: CreateJobType) => {
		await createJob({
			variables: {
				createJobInput: {
					...data,
					company: companyName,
					expiresAt: expiresAt.toISOString(),
					benefits: benefits.map(({ benefit }) => benefit),
					requirements: requirements.map(({ requirement }) => requirement),
					skillsRequired: skills.map(({ skill, experience, experiencePeriod }) => ({
						skill: skill,
						experience: experience ?? 0,
						experiencePeriod: experiencePeriod,
					})),
				},
			},
		});
	};

	return (
		<form onSubmit={form.handleSubmit(handleSubmit)}>
			<Stack gap={6}>
				<CreateJobBasicInformationForm form={form} />
				<CreateJobDetailForm form={form} />
				<CreateJobDescriptionForm form={form} />
				<CreateJobRequirementsForm form={form} />
				<CreateJobBenefitsForm form={form} />
				<CreateJobSkillsForm form={form} />
				<HStack gap={4} justify={"stretch"}>
					<Button flex={1} type="button" variant="outline" onClick={() => router.back()} disabled={isCreatingJob}>
						Cancel
					</Button>
					<Button flex={1} type="submit" variant="solid" colorPalette="blue" loading={isCreatingJob}>
						{isCreatingJob ? "Creating..." : "Create Job"}
					</Button>
				</HStack>
			</Stack>
		</form>
	);
};
