import { HStack, RadioCard } from "@chakra-ui/react";
import { WorkType } from "@/graphql/generated/graphql";

const items = [
	{ value: WorkType.Hybrid, title: "Hybrid", description: "Occational travel" },
	{ value: WorkType.Remote, title: "Remote", description: "No travel" },
];

export const RtrWorkType = () => {
	return (
		<RadioCard.Root defaultValue={WorkType.Hybrid} variant={"surface"} colorPalette={"blue"}>
			<RadioCard.Label>Work type</RadioCard.Label>
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
