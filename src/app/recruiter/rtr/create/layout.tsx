import { Flex, Stack, Heading, Text, Button, Link } from "@chakra-ui/react";
import { SendIcon } from "lucide-react";
import { FC, PropsWithChildren } from "react";

const CreateRtrLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Stack paddingX={4} gap={4}>
			<Flex alignItems={"center"} justifyContent={"space-between"}>
				<Stack gap={0}>
					<Heading fontSize={"2xl"}>RTR</Heading>
					<Text>Send a new RTR now</Text>
				</Stack>
				<Button asChild variant={"solid"} colorPalette={"blue"}>
					<Link href={"#"}>
						<SendIcon /> Send RTR
					</Link>
				</Button>
			</Flex>
			{children}
		</Stack>
	);
};
export default CreateRtrLayout;
