import { HStack, Separator, Text } from "@chakra-ui/react";
import { FC } from "react";

interface LabelSeparatorProps {
	label: string;
}

export const LabelSeparator: FC<LabelSeparatorProps> = ({ label }) => {
	return (
		<HStack>
			<Separator flex="1" />
			<Text flexShrink="0" color={"primary"}>
				{label}
			</Text>
			<Separator flex="1" />
		</HStack>
	);
};
