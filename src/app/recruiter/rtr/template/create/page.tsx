import { Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { TemplateEditor } from "@/components/dashboard/recruiter/rtr/template-editor";
import { CreateRtrTemplateButton } from "@/components/dashboard/recruiter/rtr/create-rtr-template-button";

export default function CreateRtrTemplatePage() {
	return (
		<Stack padding={4} gap={4}>
			<HStack justify={"space-between"}>
				<Stack gap={0}>
					<Heading fontSize={"2xl"}>Create RTR Template</Heading>
					<Text>Create a new RTR template</Text>
				</Stack>
				<CreateRtrTemplateButton />
			</HStack>
			<TemplateEditor />
		</Stack>
	);
}
