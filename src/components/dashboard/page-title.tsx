import { Heading, Text, VStack } from "@chakra-ui/react";
import { FC } from "react";

interface PageTitleProps {
	title: string;
	description: string;
}

export const PageTitle: FC<PageTitleProps> = ({ title, description }) => {
	return (
		<VStack gap={0} alignItems={"start"}>
			<Heading fontSize={"2xl"}>{title}</Heading>
			<Text>{description}</Text>
		</VStack>
	);
};
