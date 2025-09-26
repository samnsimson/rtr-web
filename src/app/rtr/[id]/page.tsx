import { RtrSteps } from "@/components/rtr/rtr-steps";
import { api } from "@/lib/api";
import { Stack } from "@chakra-ui/react";

const RtrViewPage = async (props: PageProps<"/rtr/[id]">) => {
	const { id } = await props.params;
	const rtrData = await api.getRtrDetail(id);
	const rtrTemplateData = await api.getCompiledRtrTemplateDetail({
		jobId: rtrData.job.id,
		templateId: rtrData.rtrTemplateId,
		candidate: { firstName: rtrData.candidateFirstName, lastName: rtrData.candidateLastName, email: rtrData.candidateEmail, phone: rtrData.candidatePhone },
	});
	return (
		<Stack flex={1} padding={4} gap={4}>
			<RtrSteps rtrTemplateData={rtrTemplateData} rtrData={rtrData} />
		</Stack>
	);
};
export default RtrViewPage;
