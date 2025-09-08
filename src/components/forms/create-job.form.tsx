"use client";
import { Stack, HStack, FieldRoot, FieldLabel, InputGroup, Input, Textarea, Button, Card, Heading, Text } from "@chakra-ui/react";
import { UserIcon, Globe, DollarSign, Calendar } from "lucide-react";
import { useState } from "react";
import { WorkType, JobType, CompensationType } from "@/types/database";
import { useRouter } from "next/navigation";
import { SelectBox } from "../ui/select-box";
import { useJobForm } from "@/store/useJobForm";
import { JobFormData } from "@/types/database";
import { ValidationAlert } from "../ui/validation-alert";
import { AlertDialog } from "../ui/alert";

export const CreateJobForm = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState<string | null>(null);
	const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
	const { formData, updateField, updateArrayField, addArrayItem, removeArrayItem, resetForm } = useJobForm((state) => state);

	const handleInputChange = (field: keyof JobFormData, value: any) => {
		updateField(field, value);
	};

	const handleArrayChange = (field: keyof JobFormData, index: number, value: string) => {
		updateArrayField(field, index, value);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setValidationErrors({});
		setSuccess(null);

		// Debug: Log what's being sent
		console.log("Form data being sent:", formData);

		try {
			// TODO: Replace with GraphQL mutation
			// Mock API call for now
			const response = await fetch("/api/recruiter/jobs", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...formData,
					requirements: formData.requirements.filter((req) => req.trim() !== ""),
					benefits: formData.benefits.filter((benefit) => benefit.trim() !== ""),
				}),
			});

			const result = await response.json();

			if (!response.ok) {
				if (response.status === 400 && result.errors) {
					setValidationErrors(result.errors);
				} else {
					setValidationErrors({ general: result.error || "An error occurred" });
				}
				return;
			}

			setSuccess("Job created successfully!");
			resetForm();
		} catch (err) {
			console.log("🚀 ~ handleSubmit ~ err:", err);
			setValidationErrors({ general: "Network error occurred" });
		} finally {
			setLoading(false);
		}
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
							<HStack gap={4}>
								<FieldRoot id="position-title" required>
									<FieldLabel>Position Title</FieldLabel>
									<InputGroup startElement={<UserIcon />}>
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
									<InputGroup startElement={<UserIcon />}>
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
							</HStack>
							<HStack gap={4}>
								<FieldRoot id="location" required>
									<FieldLabel>Location</FieldLabel>
									<InputGroup startElement={<Globe />}>
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
									<InputGroup startElement={<Calendar />}>
										<Input
											bgColor={"bg.card"}
											type="date"
											size={"lg"}
											value={formData.expiresAt}
											onChange={(e) => handleInputChange("expiresAt", e.target.value)}
										/>
									</InputGroup>
								</FieldRoot>
							</HStack>
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
							<HStack gap={4}>
								<SelectBox
									label="Job Type"
									onValueChange={(e) => handleInputChange("jobType", e.value)}
									items={[
										{ label: "Full Time", value: JobType.FULL_TIME },
										{ label: "Part Time", value: JobType.PART_TIME },
										{ label: "Contract", value: JobType.CONTRACT },
										{ label: "Internship", value: JobType.INTERNSHIP },
										{ label: "Freelance", value: JobType.FREELANCE },
									]}
								/>
								<SelectBox
									label="Work Type"
									onValueChange={(e) => handleInputChange("workType", e.value)}
									items={[
										{ label: "Remote", value: WorkType.REMOTE },
										{ label: "Hybrid", value: WorkType.HYBRID },
										{ label: "On Site", value: WorkType.ON_SITE },
									]}
								/>
							</HStack>
							<SelectBox
								label="Compensation Type"
								onValueChange={(e) => handleInputChange("compensation", e.value)}
								items={[
									{ label: "Salary", value: CompensationType.SALARY },
									{ label: "Hourly", value: CompensationType.HOURLY },
									{ label: "Project Based", value: CompensationType.PROJECT_BASED },
									{ label: "Commission", value: CompensationType.COMMISSION },
								]}
							/>
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
						<HStack gap={4}>
							<FieldRoot id="salary-min">
								<FieldLabel>Min Salary</FieldLabel>
								<InputGroup startElement={<DollarSign />}>
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
								<InputGroup startElement={<DollarSign />}>
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
						</HStack>
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
					<Button flex={1} type="button" variant="outline" onClick={() => router.back()} disabled={loading}>
						Cancel
					</Button>
					<Button flex={1} type="submit" variant="solid" colorPalette="blue" loading={loading}>
						{loading ? "Creating..." : "Create Job"}
					</Button>
				</HStack>
			</Stack>
		</form>
	);
};
