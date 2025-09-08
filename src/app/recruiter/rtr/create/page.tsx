import { RtrCandidateInformation } from "@/components/dashboard/recruiter/rtr/rtr-candidate-information";
import { RtrNotes } from "@/components/dashboard/recruiter/rtr/rtr-notes";
import { RtrPayInformation } from "@/components/dashboard/recruiter/rtr/rtr-pay-information";
import { RtrPositionDetails } from "@/components/dashboard/recruiter/rtr/rtr-position-detail";
import { RtrPreview } from "@/components/dashboard/recruiter/rtr/rtr-preview";
import { RtrTemplateInfo } from "@/components/dashboard/recruiter/rtr/rtr-template-info";
import { Button, SimpleGrid, Stack } from "@chakra-ui/react";
import { SendIcon } from "lucide-react";

const CreateRtr = () => {
	return (
		<SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
			<Stack gap={4}>
				<RtrCandidateInformation />
				<RtrPositionDetails />
				<RtrPayInformation />
				<RtrTemplateInfo />
				<RtrNotes />
				<Button variant={"solid"} colorPalette={"blue"} size={"xl"} width={"full"}>
					<SendIcon /> Send RTR
				</Button>
			</Stack>
			<Stack gap={4}>
				<RtrPreview />
			</Stack>
		</SimpleGrid>
	);
};
export default CreateRtr;
