"use client";
import { RadioCard, Stack } from "@chakra-ui/react";
import { useRtrForm } from "@/store/useRtrForm";
import { CompensationType } from "@/graphql/generated/graphql";
import { FC } from "react";

const items = [
	{ value: CompensationType.Hourly, title: "Per Hour", description: "Paid on hourly basis" },
	{ value: CompensationType.Salary, title: "Annual", description: "Paid annually" },
];

export const RtrCompensationType: FC = () => {
	const { formData, updateField } = useRtrForm();
	return (
		<RadioCard.Root
			defaultValue={formData.compensationType}
			variant={"surface"}
			colorPalette={"blue"}
			onValueChange={(e) => updateField("compensationType", e.value as CompensationType)}
		>
			<RadioCard.Label>Compensation type</RadioCard.Label>
			<Stack direction={{ base: "column", md: "row" }}>
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
			</Stack>
		</RadioCard.Root>
	);
};
