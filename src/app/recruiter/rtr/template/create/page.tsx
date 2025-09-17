import { Button, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { TemplateEditor } from "@/components/dashboard/recruiter/rtr/template-editor";
import { LuSave } from "react-icons/lu";

export default function CreateRtrTemplatePage() {
	return (
		<Stack padding={4} gap={4}>
			<HStack justify={"space-between"}>
				<Stack gap={0}>
					<Heading fontSize={"2xl"}>Create RTR Template</Heading>
					<Text>Create a new RTR template</Text>
				</Stack>
				<Button variant={"solid"} colorPalette={"blue"}>
					<LuSave /> Save Template
				</Button>
			</HStack>
			<TemplateEditor />
		</Stack>
	);
}
