import { RtrPreview } from "@/components/dashboard/recruiter/rtr/rtr-preview";
import { Button, SimpleGrid, Stack } from "@chakra-ui/react";
import { SendIcon } from "lucide-react";
import { CreateRtrForm } from "@/components/forms/create-rtr-form";

const CreateRtr = () => {
	return (
		<SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
			<Stack gap={4}>
				<CreateRtrForm />
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
