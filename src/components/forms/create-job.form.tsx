"use client";
import { Stack, HStack, FieldRoot, FieldLabel, InputGroup, Input, Textarea, Button, Card, Heading, Text, createListCollection } from "@chakra-ui/react";
import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import { WorkType, JobType, CompensationType, ListJobsDocument } from "@/graphql/generated/graphql";
import { SelectBox } from "../ui/select-box";
import { useJobForm } from "@/store/useJobForm";
import { JobFormData } from "@/types/database";
import { ValidationAlert } from "../ui/validation-alert";
import { AlertDialog } from "../ui/alert";
import { CreateJobDocument } from "@/graphql/generated/graphql";
import { useMutation } from "@apollo/client/react";
import { LuDollarSign, LuUser, LuGlobe, LuCalendar } from "react-icons/lu";

export const CreateJobForm = () => {
	const router = useRouter();
	const [success, setSuccess] = useState<string | null>(null);
	const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
	const { formData, updateField, updateArrayField, addArrayItem, removeArrayItem, resetForm } = useJobForm((state) => state);

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

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setValidationErrors({});
		setSuccess(null);
		console.log("Form data being sent:", formData);
		await createJob({ variables: { createJobInput: formData } });
	};

	return (
		<form onSubmit={handleSubmit}>
			<Stack gap={6}>
				<ValidationAlert errors={validationErrors} />

				{success && <AlertDialog status="success" title="Success" description={success} />}

				{/* Basic Information Card */}
				<Card.Root bgColor={"bg"} divideY={"1px"} divideColor={"border"}>
					<Card.Header padding={4} gap={0}>
						<Heading fontSize="lg">Basic Information</Heading>
						<Text fontSize="sm" color="muted">
							Essential details about the position
						</Text>
					</Card.Header>
					<Card.Body padding={6}>
						<Stack gap={4}>
							<Stack gap={4} direction={{ base: "column", md: "row" }}>
								<FieldRoot id="position-title" required>
									<FieldLabel>Position Title</FieldLabel>
									<InputGroup startElement={<LuUser />}>
										<Input
											bgColor={"bg.card"}
											type="text"
											size={"lg"}
											placeholder="e.g., Senior Software Engineer"
											value={formData.title}
											onChange={(e) => handleInputChange("title", e.target.value)}
										/>
									</InputGroup>
								</FieldRoot>
								<FieldRoot id="company-name" required>
									<FieldLabel>Company Name</FieldLabel>
									<InputGroup startElement={<LuUser />}>
										<Input
											bgColor={"bg.card"}
											type="text"
											size={"lg"}
											placeholder="e.g., TechSoft Corp"
											value={formData.company}
											onChange={(e) => handleInputChange("company", e.target.value)}
										/>
									</InputGroup>
								</FieldRoot>
							</Stack>
							<Stack gap={4} direction={{ base: "column", md: "row" }}>
								<FieldRoot id="location" required>
									<FieldLabel>Location</FieldLabel>
									<InputGroup startElement={<LuGlobe />}>
										<Input
											bgColor={"bg.card"}
											type="text"
											size={"lg"}
											placeholder="e.g., New York, NY"
											value={formData.location}
											onChange={(e) => handleInputChange("location", e.target.value)}
										/>
									</InputGroup>
								</FieldRoot>
								<FieldRoot id="expires-at">
									<FieldLabel>Expires At</FieldLabel>
									<InputGroup startElement={<LuCalendar />}>
										<Input
											bgColor={"bg.card"}
											type="date"
											size={"lg"}
											value={formData.expiresAt}
											onChange={(e) => handleInputChange("expiresAt", e.target.value)}
										/>
									</InputGroup>
								</FieldRoot>
							</Stack>
						</Stack>
					</Card.Body>
				</Card.Root>

				{/* Job Details Card */}
				<Card.Root bgColor={"bg"} divideY={"1px"} divideColor={"border"}>
					<Card.Header padding={4} gap={0}>
						<Heading fontSize="lg">Job Details</Heading>
						<Text fontSize="sm" color="muted">
							Work arrangement and employment type
						</Text>
					</Card.Header>
					<Card.Body padding={6}>
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
					</Card.Body>
				</Card.Root>

				{/* Compensation Card */}
				<Card.Root bgColor={"bg"} divideY={"1px"} divideColor={"border"}>
					<Card.Header padding={4} gap={0}>
						<Heading fontSize="lg">Compensation</Heading>
						<Text fontSize="sm" color="muted">
							Salary range and compensation details
						</Text>
					</Card.Header>
					<Card.Body padding={6}>
						<Stack gap={4} direction={{ base: "column", md: "row" }}>
							<FieldRoot id="salary-min">
								<FieldLabel>Min Salary</FieldLabel>
								<InputGroup startElement={<LuDollarSign />}>
									<Input
										bgColor={"bg.card"}
										type="number"
										size={"lg"}
										placeholder="e.g., 50000"
										value={formData.salaryMin ?? ""}
										onChange={(e) => handleInputChange("salaryMin", e.target.value ? parseInt(e.target.value) : undefined)}
									/>
								</InputGroup>
							</FieldRoot>
							<FieldRoot id="salary-max">
								<FieldLabel>Max Salary</FieldLabel>
								<InputGroup startElement={<LuDollarSign />}>
									<Input
										bgColor={"bg.card"}
										type="number"
										size={"lg"}
										placeholder="e.g., 80000"
										value={formData.salaryMax ?? ""}
										onChange={(e) => handleInputChange("salaryMax", e.target.value ? parseInt(e.target.value) : undefined)}
									/>
								</InputGroup>
							</FieldRoot>
						</Stack>
					</Card.Body>
				</Card.Root>

				{/* Requirements & Benefits Card */}
				<Card.Root bgColor={"bg"} divideY={"1px"} divideColor={"border"}>
					<Card.Header padding={4} gap={0}>
						<Heading fontSize="lg">Requirements & Benefits</Heading>
						<Text fontSize="sm" color="muted">
							What candidates need and what you offer
						</Text>
					</Card.Header>
					<Card.Body padding={6}>
						<Stack gap={6}>
							<FieldRoot id="requirements" width="full">
								<FieldLabel>Requirements</FieldLabel>
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
							</FieldRoot>
							<FieldRoot id="benefits" width="full">
								<FieldLabel>Benefits</FieldLabel>
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
							</FieldRoot>
						</Stack>
					</Card.Body>
				</Card.Root>

				{/* Job Description Card */}
				<Card.Root bgColor={"bg"} divideY={"1px"} divideColor={"border"}>
					<Card.Header padding={4} gap={0}>
						<Heading fontSize="lg">Job Description</Heading>
						<Text fontSize="sm" color="muted">
							Detailed description of the role and responsibilities
						</Text>
					</Card.Header>
					<Card.Body padding={6}>
						<FieldRoot id="job-description" required>
							<FieldLabel>Job Description</FieldLabel>
							<Textarea
								bgColor={"bg.card"}
								size={"lg"}
								rows={8}
								placeholder="Add a detailed job description for this position..."
								value={formData.description}
								onChange={(e) => handleInputChange("description", e.target.value)}
							/>
						</FieldRoot>
					</Card.Body>
				</Card.Root>

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
