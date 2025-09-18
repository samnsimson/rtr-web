import { Button, Stack } from "@chakra-ui/react";
import { SendIcon } from "lucide-react";
import { CreateRtrForm } from "@/components/forms/create-rtr-form";

const CreateRtr = () => {
	return (
		<Stack gap={4}>
			<CreateRtrForm />
			<Button variant={"solid"} colorPalette={"blue"} size={"xl"} width={"full"}>
				<SendIcon /> Send RTR
			</Button>
		</Stack>
	);
};
export default CreateRtr;
