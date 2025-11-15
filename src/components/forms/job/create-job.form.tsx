"use client";
import { Stack, HStack, Field, Input, Textarea, Button, createListCollection } from "@chakra-ui/react";
import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import { WorkType, JobType, CompensationType, ListJobsDocument } from "@/graphql/generated/graphql";
import { SelectBox } from "../../ui/select-box";
import { useJobForm } from "@/store";
import { JobFormData } from "@/types/database";
import { ValidationAlert } from "../../ui/validation-alert";
import { AlertDialog } from "../../ui/alert";
import { CreateJobDocument } from "@/graphql/generated/graphql";
import { useMutation } from "@apollo/client/react";
import { JobSkillsCard } from "../../dashboard/recruiter/job/job-skills-card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createJobSchema } from "@/zod/schema";
import { CreateJobType } from "@/zod/types";
import { AppCard } from "../../ui/app-card";
import { add } from "date-fns";
import { CreateJobBasicInformationForm } from "./create-job-basic-information-form";
import { CreateJobCompensationForm } from "./create-job-compensation-form";

export const CreateJobForm = () => {
	const router = useRouter();
	const [success] = useState(null);
	const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
	const { formData, updateField, updateArrayField, addArrayItem, removeArrayItem, resetForm } = useJobForm((state) => state);

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
			benefits: [],
			requirements: [],
			skills: [],
		},
	});

	const [createJob, { loading: isCreatingJob }] = useMutation(CreateJobDocument, {
		onCompleted: () => resetForm(),
		onError: (error) => setValidationErrors({ general: error.message }),
		refetchQueries: [{ query: ListJobsDocument }],
	});

	const handleInputChange = (field: keyof JobFormData, value: any) => {
		updateField(field, value);
	};

	const handleArrayChange = (field: keyof JobFormData, index: number, value: string) => {
		updateArrayField(field, index, value);
	};

	const handleSubmit = async (data: CreateJobType) => {
		// await createJob({ variables: { createJobInput: data } });
		console.log(data);
	};

	return (
		<form onSubmit={form.handleSubmit(handleSubmit)}>
			<Stack gap={6}>
				<ValidationAlert errors={validationErrors} />
				{success && <AlertDialog status="success" title="Success" description={success} />}

				{/* Basic Information Card */}
				<CreateJobBasicInformationForm form={form} />

				{/* Job Details Card */}
				<AppCard title="Job Details" description="Work arrangement and employment type">
					<Stack gap={4}>
						<Stack gap={4} direction={{ base: "column", md: "row" }}>
							<Suspense>
								<SelectBox
									name="jobType"
									label="Job Type"
									onValueChange={(e) => handleInputChange("jobType", e.value.pop())}
									collection={createListCollection({
										items: [
											{ name: "Full Time", value: JobType.FullTime },
											{ name: "Part Time", value: JobType.PartTime },
											{ name: "Contract", value: JobType.Contract },
											{ name: "Internship", value: JobType.Internship },
											{ name: "Freelance", value: JobType.Freelance },
										],
									})}
								/>
							</Suspense>
							<Suspense>
								<SelectBox
									name="workType"
									label="Work Type"
									onValueChange={(e) => handleInputChange("workType", e.value.pop())}
									collection={createListCollection({
										items: [
											{ name: "Remote", value: WorkType.Remote },
											{ name: "Hybrid", value: WorkType.Hybrid },
											{ name: "On Site", value: WorkType.OnSite },
										],
									})}
								/>
							</Suspense>
						</Stack>
						<Suspense>
							<SelectBox
								name="compensation"
								label="Compensation Type"
								onValueChange={(e) => handleInputChange("compensation", e.value.pop())}
								collection={createListCollection({
									items: [
										{ name: "Salary", value: CompensationType.Salary },
										{ name: "Hourly", value: CompensationType.Hourly },
										{ name: "Project Based", value: CompensationType.ProjectBased },
										{ name: "Commission", value: CompensationType.Commission },
									],
								})}
							/>
						</Suspense>
					</Stack>
				</AppCard>

				{/* Compensation Card */}
				<CreateJobCompensationForm form={form} />

				{/* Requirements & Benefits Card */}
				<AppCard title="Requirements & Benefits" description="What candidates need and what you offer">
					<Stack gap={6}>
						<Field.Root id="requirements" width="full">
							<Field.Label>Requirements</Field.Label>
							<Stack gap={2} width={"full"}>
								{formData.requirements.map((req, index) => (
									<HStack key={index} gap={2} width={"full"}>
										<Input
											bgColor={"bg.card"}
											placeholder="e.g., 5+ years of experience"
											size={"lg"}
											value={req}
											onChange={(e) => handleArrayChange("requirements", index, e.target.value)}
										/>
										<Button
											type="button"
											size="sm"
											variant="ghost"
											colorPalette="red"
											onClick={() => removeArrayItem("requirements", index)}
											disabled={formData.requirements.length === 1}
										>
											Remove
										</Button>
									</HStack>
								))}
								<Button type="button" size="sm" variant="outline" onClick={() => addArrayItem("requirements")} width={"full"}>
									Add Requirement
								</Button>
							</Stack>
						</Field.Root>
						<Field.Root id="benefits" width="full">
							<Field.Label>Benefits</Field.Label>
							<Stack gap={2} width={"full"}>
								{formData.benefits.map((benefit, index) => (
									<HStack key={index} gap={2} width={"full"}>
										<Input
											bgColor={"bg.card"}
											placeholder="e.g., Health insurance"
											value={benefit}
											size={"lg"}
											onChange={(e) => handleArrayChange("benefits", index, e.target.value)}
										/>
										<Button
											type="button"
											size="sm"
											variant="ghost"
											colorPalette="red"
											onClick={() => removeArrayItem("benefits", index)}
											disabled={formData.benefits.length === 1}
										>
											Remove
										</Button>
									</HStack>
								))}
								<Button type="button" size="sm" variant="outline" onClick={() => addArrayItem("benefits")} width={"full"}>
									Add Benefit
								</Button>
							</Stack>
						</Field.Root>
					</Stack>
				</AppCard>

				<JobSkillsCard />

				{/* Job Description Card */}
				<AppCard title="Job Description" description="Detailed description of the role and responsibilities">
					<Field.Root id="job-description" required>
						<Field.Label>Job Description</Field.Label>
						<Textarea
							bgColor={"bg.card"}
							size={"lg"}
							rows={8}
							placeholder="Add a detailed job description for this position..."
							value={formData.description}
							onChange={(e) => handleInputChange("description", e.target.value)}
						/>
					</Field.Root>
				</AppCard>

				{/* Submit Buttons */}
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
