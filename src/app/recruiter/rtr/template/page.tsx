import { Heading, Stack, Text } from "@chakra-ui/react";
import { RtrTemplateDataTable } from "@/components/dashboard/recruiter/rtr/rtr-template-data-table";
import { AppCardHeadless } from "@/components/ui/app-card";

const RtrTemplatePage = () => {
	return (
		<Stack padding={4} gap={4}>
			<Stack gap={0}>
				<Heading fontSize={"2xl"}>RTR Templates</Heading>
				<Text>Manage all your RTR templates</Text>
			</Stack>
			<AppCardHeadless noPadding>
				<RtrTemplateDataTable />
			</AppCardHeadless>
		</Stack>
	);
};
export default RtrTemplatePage;
