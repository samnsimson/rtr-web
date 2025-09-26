"use client";
import { FC, useRef } from "react";
import { AppCard } from "../ui/app-card";
import { RtrDetailQuery } from "@/graphql/generated/graphql";
import { Button, FileUpload, Flex, Heading, HStack, Show, Stack, Text } from "@chakra-ui/react";
import { HiPlus, HiUpload } from "react-icons/hi";
import { RtrEmployerDetailForm } from "../forms/rtr-employer-detail-form";
import { RtrReferenceForm, RtrReferenceFormRef } from "../forms/rtr-reference-form";
import { RtrSkillListForm } from "../forms/rtr-skill-list-form";

interface RtrDocumentStepProps {
	rtr: RtrDetailQuery["rtr"];
}

const DocumentList = () => {
	return (
		<FileUpload.ItemGroup>
			<FileUpload.Context>
				{({ acceptedFiles }) =>
					acceptedFiles.map((file) => (
						<FileUpload.Item key={file.name} file={file} bgColor={"bg.card"}>
							<HStack key={file.name} width={"full"} justify={"space-between"} align={"center"}>
								<Flex gap={4} alignItems={"center"}>
									<FileUpload.ItemPreview />
									<FileUpload.ItemName />
									<FileUpload.ItemSizeText />
								</Flex>
								<FileUpload.ItemDeleteTrigger />
							</HStack>
						</FileUpload.Item>
					))
				}
			</FileUpload.Context>
		</FileUpload.ItemGroup>
	);
};

export const RtrDocumentStep: FC<RtrDocumentStepProps> = ({ rtr }) => {
	const referenceFormRef = useRef<RtrReferenceFormRef>(null);
	return (
		<Stack gap={6}>
			<Show when={rtr.resumeRequired}>
				<AppCard title="Resume" bgColor={"bg"}>
					<FileUpload.Root maxFiles={1} accept={["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]}>
						<FileUpload.HiddenInput />
						<DocumentList />
						<HStack width={"full"} justify={"space-between"}>
							<Stack gap={0}>
								<Heading size={"sm"}>Resume</Heading>
								<Text fontSize={"sm"}>Upload your resume to the system</Text>
							</Stack>
							<FileUpload.Trigger asChild>
								<Button variant="surface" size="lg" colorPalette={"teal"}>
									<HiUpload /> Upload file
								</Button>
							</FileUpload.Trigger>
						</HStack>
					</FileUpload.Root>
				</AppCard>
			</Show>
			<Show when={rtr.photoIdRequired}>
				<AppCard title="Photo ID" bgColor={"bg"}>
					<FileUpload.Root maxFiles={5} accept={["application/pdf", "image/jpeg", "image/png", "image/jpg"]}>
						<FileUpload.HiddenInput />
						<DocumentList />
						<HStack width={"full"} justify={"space-between"}>
							<Stack gap={0}>
								<Heading size={"sm"}>Photo ID</Heading>
								<Text fontSize={"sm"}>Upload your photo ID to the system</Text>
							</Stack>
							<FileUpload.Trigger asChild>
								<Button variant="subtle" size="lg" colorPalette={"teal"}>
									<HiUpload /> Upload file
								</Button>
							</FileUpload.Trigger>
						</HStack>
					</FileUpload.Root>
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
