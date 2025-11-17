import { AppCard } from "@/components/ui/app-card";
import { SelectBox } from "@/components/ui/select-box";
import { JobType, WorkType, CompensationType } from "@/graphql/generated/graphql";
import { Field, Input, InputGroup, Stack, createListCollection } from "@chakra-ui/react";
import { FC, Suspense } from "react";
import { UseFormReturn } from "react-hook-form";
import { CreateJobType } from "@/zod/types";
import { LuDollarSign } from "react-icons/lu";

interface CreateJobDetailFormProps {
	form: UseFormReturn<CreateJobType>;
}

export const CreateJobDetailForm: FC<CreateJobDetailFormProps> = ({ form }) => {
	return (
		<AppCard title="Job Details" description="Work arrangement and employment type">
			<Stack gap={4}>
				<Stack gap={4} direction={{ base: "column", md: "row" }}>
					<Suspense>
						<SelectBox
							name="jobType"
							label="Job Type"
							onValueChange={(e) => form.setValue("jobType", e.value.pop() as JobType)}
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
							onValueChange={(e) => form.setValue("workType", e.value.pop() as WorkType)}
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
						onValueChange={(e) => form.setValue("compensation", e.value.pop() as CompensationType)}
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
				<Stack gap={4} direction={{ base: "column", md: "row" }}>
					<Field.Root id="salary-min">
						<Field.Label>Min Salary</Field.Label>
						<InputGroup startElement={<LuDollarSign />}>
							<Input bgColor={"bg.card"} type="number" size={"lg"} placeholder="e.g., 50000" {...form.register("salaryMin", { valueAsNumber: true })} />
						</InputGroup>
						<Field.ErrorText>{form.formState.errors["salaryMin"]?.message}</Field.ErrorText>
					</Field.Root>
					<Field.Root id="salary-max">
						<Field.Label>Max Salary</Field.Label>
						<InputGroup startElement={<LuDollarSign />}>
							<Input bgColor={"bg.card"} type="number" size={"lg"} placeholder="e.g., 80000" {...form.register("salaryMax", { valueAsNumber: true })} />
						</InputGroup>
						<Field.ErrorText>{form.formState.errors["salaryMax"]?.message}</Field.ErrorText>
					</Field.Root>
				</Stack>
			</Stack>
		</AppCard>
	);
};
