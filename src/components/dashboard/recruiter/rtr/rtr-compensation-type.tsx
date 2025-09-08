import { HStack, RadioCard } from "@chakra-ui/react";
import { CompensationType } from "@prisma/client";

const items = [
	{ value: CompensationType.HOURLY, title: "Per Hour", description: "Paid on hourly basis" },
	{ value: CompensationType.SALARY, title: "Annual", description: "Paid annually" },
];

export const RtrCompensationType = () => {
	return (
		<RadioCard.Root defaultValue={CompensationType.HOURLY} variant={"surface"} colorPalette={"blue"}>
			<RadioCard.Label>Compensation type</RadioCard.Label>
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
