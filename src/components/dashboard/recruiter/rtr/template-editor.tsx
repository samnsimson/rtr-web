"use client";
import Quill from "quill";
import { useCallback, useEffect, useRef } from "react";
import { Badge, Box, For, GridItem, SimpleGrid, Flex, FieldLabel, Input, FieldRoot, Stack } from "@chakra-ui/react";
import { AppCard } from "@/components/ui/app-card";
import { useRtrTemplate } from "@/store";

const templateContext: Record<string, string> = {
	"Candidate first name": "{{context.candidate.firstName}}",
	"Candidate last name": "{{context.candidate.lastName}}",
	"Candidate email": "{{context.candidate.email}}",
	"Candidate phone": "{{context.candidate.phone}}",
	"Candidate location": "{{context.candidate.location}}",
	"Company name": "{{context.company.name}}",
	"Job title": "{{context.job.title}}",
	"Job description": "{{context.job.description}}",
};

export const TemplateEditor = () => {
	const { formData, updateField } = useRtrTemplate();
	const quillRef = useRef<Quill | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const clearQuillEditor = useCallback(() => {
		if (!quillRef.current) return;
		quillRef.current.setContents([]);
	}, []);

	const handleTemplateContextChange = useCallback((value: string) => {
		if (!quillRef.current) return;
		const range = quillRef.current.getSelection();
		const index = range ? range.index : quillRef.current.getLength();
		quillRef.current.insertText(index, value, { bold: true }, "user");
		quillRef.current.setSelection(index + value.length);
		quillRef.current.format("bold", false);
	}, []);

	useEffect(() => {
		if (!containerRef.current || quillRef.current) return;
		quillRef.current = new Quill(containerRef.current, { theme: "snow", placeholder: "Write something here..." });
		quillRef.current.on("text-change", () => {
			updateField("text", quillRef.current?.getText().trim() || "");
			updateField("html", quillRef.current?.getSemanticHTML() || "");
		});
	}, [updateField]);

	useEffect(() => {
		if (Object.values(formData).every((value) => value === "")) clearQuillEditor();
	}, [formData, clearQuillEditor]);

	return (
		<SimpleGrid columns={{ base: 1, md: 4 }} gap={4}>
			<GridItem colSpan={{ base: 4, md: 1 }}>
				<AppCard title="Template context" description="Use this context in your template">
					<Flex alignItems={"flex-start"} gap={2} flexWrap={"wrap"}>
						<For each={Object.entries(templateContext)}>
							{([key], idx) => (
								<Badge
									size={"lg"}
									variant={"surface"}
									colorPalette={"blue"}
									key={idx}
									borderRadius={"full"}
									cursor={"pointer"}
									onClick={() => handleTemplateContextChange(templateContext[key])}
								>
									{key}
								</Badge>
							)}
						</For>
					</Flex>
				</AppCard>
			</GridItem>
			<GridItem colSpan={{ base: 4, md: 3 }} spaceY={4}>
				<AppCard title="Template info" description="Edit the template info">
					<Stack direction={{ base: "column", md: "row" }} gap={4}>
						<FieldRoot id="template-name">
							<FieldLabel>Name</FieldLabel>
							<Input
								size={"lg"}
								bgColor={"bg.card"}
								value={formData.name}
								placeholder="Enter the template name"
								onChange={(e) => updateField("name", e.target.value)}
							/>
						</FieldRoot>
						<FieldRoot id="template-description">
							<FieldLabel>Description</FieldLabel>
							<Input
								size={"lg"}
								bgColor={"bg.card"}
								value={formData.description}
								placeholder="Enter the template description"
								onChange={(e) => updateField("description", e.target.value)}
							/>
						</FieldRoot>
					</Stack>
				</AppCard>
				<AppCard title="Template editor" description="Edit the template for the RTR form" noPadding>
					<Box ref={containerRef} minHeight={200} />
				</AppCard>
			</GridItem>
		</SimpleGrid>
	);
};
