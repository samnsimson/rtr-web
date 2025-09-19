import { Stack, Heading, Text, HStack } from "@chakra-ui/react";
import { PreviewRtrButton } from "@/components/dashboard/recruiter/rtr/preview-rtr-button";
import { FC, PropsWithChildren } from "react";
import { RtrSendButton } from "@/components/dashboard/recruiter/rtr/rtr-send-button";

const CreateRtrLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Stack paddingX={4} gap={4}>
			<HStack justify={"space-between"}>
				<Stack gap={0}>
					<Heading fontSize={"2xl"}>RTR</Heading>
					<Text>Send a new RTR now</Text>
				</Stack>
				<HStack gap={2}>
					<PreviewRtrButton />
					<RtrSendButton />
				</HStack>
			</HStack>
			{children}
		</Stack>
	);
};
export default CreateRtrLayout;
