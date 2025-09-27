"use client";
import { useRtrAcceptance } from "@/store";
import { Button, FileUpload, FileUploadFileAcceptDetails, FileUploadFileRejectDetails, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { HiUpload } from "react-icons/hi";
import { RtrFileUploadList } from "../rtr/rtr-file-upload-list";
import { RtrFileUploadError } from "../rtr/rtr-file-upload-error";
import { useState } from "react";
import { config } from "@/config/config";

export const RtrCandidatePhotoIdForm = () => {
	const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
	const { updateFormField } = useRtrAcceptance();

	const handleFileAccept = ({ files }: FileUploadFileAcceptDetails) => {
		setValidationErrors({});
		updateFormField("photoId", files);
	};

	const handleFileReject = ({ files }: FileUploadFileRejectDetails) => {
		setValidationErrors({});
		for (const { file, errors } of files) {
			for (const error of errors) {
				if (error === "FILE_TOO_LARGE") setValidationErrors((prev) => ({ ...prev, [file.name]: "File size must be less than 1MB" }));
				if (error === "FILE_EXISTS") setValidationErrors((prev) => ({ ...prev, [file.name]: "File already exists" }));
				if (error === "FILE_INVALID") setValidationErrors((prev) => ({ ...prev, [file.name]: "File is invalid" }));
				if (error === "FILE_INVALID_TYPE") setValidationErrors((prev) => ({ ...prev, [file.name]: "File type must be PDF, DOC, or DOCX" }));
				if (error === "TOO_MANY_FILES") setValidationErrors((prev) => ({ ...prev, [file.name]: "You can only upload one file" }));
			}
		}
	};

	return (
		<FileUpload.Root maxFiles={2} maxFileSize={config.maxFileSize} accept={config.acceptedPhotoIdFileTypes} onFileAccept={handleFileAccept} onFileReject={handleFileReject}>
			<FileUpload.HiddenInput />
			<RtrFileUploadList />
			<RtrFileUploadError errors={validationErrors} />
			<HStack width={"full"} justify={"space-between"}>
				<Stack gap={0}>
					<Heading size={"sm"}>Photo ID</Heading>
					<Text fontSize={"sm"}>Upload your photo ID to the system</Text>
				</Stack>
				<FileUpload.Trigger asChild>
					<Button variant="surface" size="lg" colorPalette={"teal"}>
						<HiUpload /> Upload file
					</Button>
				</FileUpload.Trigger>
			</HStack>
		</FileUpload.Root>
	);
};
