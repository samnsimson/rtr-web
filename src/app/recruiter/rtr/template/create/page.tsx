import { FC } from "react";
import { Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { CreateRtrTemplateButton } from "@/components/dashboard/recruiter/rtr/create-rtr-template-button";
import { TemplateEditorDynamic } from "@/components/dashboard/recruiter/rtr/template-editor-dynamic";

const CreateRtrTemplatePage: FC<PageProps<"/recruiter/rtr/template/create">> = async () => {
	return (
		<Stack padding={4} gap={4}>
			<HStack justify={"space-between"}>
				<Stack gap={0}>
					<Heading fontSize={"2xl"}>Create RTR Template</Heading>
					<Text>Create a new RTR template</Text>
				</Stack>
				<CreateRtrTemplateButton />
			</HStack>
			<TemplateEditorDynamic />
		</Stack>
	);
};

export default CreateRtrTemplatePage;
