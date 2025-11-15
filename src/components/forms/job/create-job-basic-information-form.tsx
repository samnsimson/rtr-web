"use client";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { CreateJobType } from "@/zod/types";
import { Stack, Field, InputGroup, Input } from "@chakra-ui/react";
import { LuUser, LuGlobe, LuCalendar } from "react-icons/lu";
import { AppCard } from "../../ui/app-card";

interface CreateJobBasicInformationFormProps {
	form: UseFormReturn<CreateJobType>;
}

export const CreateJobBasicInformationForm: FC<CreateJobBasicInformationFormProps> = ({ form }) => {
	return (
		<AppCard title="Basic Information" description="Essential details about the position">
			<Stack gap={4}>
				<Stack gap={4} direction={{ base: "column", md: "row" }}>
					<Field.Root id="position-title" required>
						<Field.Label>Position Title</Field.Label>
						<InputGroup startElement={<LuUser />}>
							<Input bgColor={"bg.card"} type="text" size={"lg"} placeholder="e.g., Senior Software Engineer" {...form.register("title")} />
						</InputGroup>
						<Field.ErrorText>{form.formState.errors["title"]?.message}</Field.ErrorText>
					</Field.Root>
					<Field.Root id="company-name" required>
						<Field.Label>Company Name</Field.Label>
						<InputGroup startElement={<LuUser />}>
							<Input bgColor={"bg.card"} type="text" size={"lg"} placeholder="e.g., TechSoft Corp" {...form.register("companyName")} />
						</InputGroup>
						<Field.ErrorText>{form.formState.errors["companyName"]?.message}</Field.ErrorText>
					</Field.Root>
				</Stack>
				<Stack gap={4} direction={{ base: "column", md: "row" }}>
					<Field.Root id="location" required>
						<Field.Label>Location</Field.Label>
						<InputGroup startElement={<LuGlobe />}>
							<Input bgColor={"bg.card"} type="text" size={"lg"} placeholder="e.g., New York, NY" {...form.register("location")} />
						</InputGroup>
						<Field.ErrorText>{form.formState.errors["location"]?.message}</Field.ErrorText>
					</Field.Root>
					<Field.Root id="expires-at" required>
						<Field.Label>Expires At</Field.Label>
						<InputGroup startElement={<LuCalendar />}>
							<Input bgColor={"bg.card"} type="date" size={"lg"} {...form.register("expiresAt")} />
						</InputGroup>
						<Field.ErrorText>{form.formState.errors["expiresAt"]?.message}</Field.ErrorText>
					</Field.Root>
				</Stack>
			</Stack>
		</AppCard>
	);
};
