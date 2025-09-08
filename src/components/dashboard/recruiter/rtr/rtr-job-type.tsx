import { HStack, RadioCard } from "@chakra-ui/react";
import { WorkType } from "@prisma/client";

const items = [
	{ value: WorkType.HYBRID, title: "Hybrid", description: "Occational travel" },
	{ value: WorkType.REMOTE, title: "Remote", description: "No travel" },
];

export const RtrJobType = () => {
	return (
		<RadioCard.Root defaultValue="on-site" variant={"surface"} colorPalette={"blue"}>
			<RadioCard.Label>Job type</RadioCard.Label>
			<HStack align="stretch">
				{items.map((item) => (
					<RadioCard.Item key={item.value} value={item.value}>
						<RadioCard.ItemHiddenInput />
						<RadioCard.ItemControl>
							<RadioCard.ItemContent>
								<RadioCard.ItemText>{item.title}</RadioCard.ItemText>
								<RadioCard.ItemDescription>{item.description}</RadioCard.ItemDescription>
							</RadioCard.ItemContent>
							<RadioCard.ItemIndicator />
						</RadioCard.ItemControl>
					</RadioCard.Item>
				))}
			</HStack>
		</RadioCard.Root>
	);
};
