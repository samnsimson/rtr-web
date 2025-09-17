"use client";
import { forwardRef, useCallback, useEffect, useRef } from "react";
import { Badge, Box, For, GridItem, SimpleGrid, Flex } from "@chakra-ui/react";
import { AppCard } from "@/components/ui/app-card";
import Quill from "quill";

const templateContext: Record<string, string> = {
	"Candidate first name": "{{template.context.firstName}}",
	"Candidate last name": "{{template.context.lastName}}",
	"Candidate email": "{{template.context.email}}",
	"Candidate phone": "{{template.context.phone}}",
	"Candidate location": "{{template.context.location}}",
	"Company name": "{{template.context.company}}",
	"Job title": "{{template.context.jobTitle}}",
	"Job description": "{{template.context.jobDescription}}",
};

export const TemplateEditor = forwardRef<HTMLDivElement, object>((props, ref) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const quillRef = useRef<Quill>(null);

	const handleTemplateContextChange = useCallback((value: string) => {
		if (!quillRef.current) return;
		const range = quillRef.current.getSelection();
		const index = range ? range.index : quillRef.current.getLength();
		quillRef.current.insertText(index, value, { color: "#fff", bold: true });
		quillRef.current.setSelection(index + value.length);
		quillRef.current.format("bold", false);
	}, []);

	useEffect(() => {
		if (!containerRef.current) return;
		const container = containerRef.current as HTMLElement;
		quillRef.current = new Quill(container, { theme: "snow", placeholder: "Write something here..." });

		return () => {
			container.innerHTML = "";
			quillRef.current = null;
		};
	}, [ref]);

	return (
		<SimpleGrid columns={{ base: 1, md: 4 }} gap={4}>
			<GridItem colSpan={1}>
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
									onClick={() => handleTemplateContextChange(templateContext[key])}
								>
									{key}
								</Badge>
							)}
						</For>
					</Flex>
				</AppCard>
			</GridItem>
			<GridItem colSpan={3}>
				<AppCard title="Template editor" description="Edit the template for the RTR form" noPadding>
					<Box ref={containerRef} minHeight={200} />
				</AppCard>
			</GridItem>
		</SimpleGrid>
	);
});

TemplateEditor.displayName = "TemplateEditor";
