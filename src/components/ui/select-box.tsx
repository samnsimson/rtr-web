"use client";
import { createListCollection, For, ListCollection, Portal, Select, SelectRootProps, SelectValueChangeDetails, Stack } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";

type SelectBoxItem = {
	label: string;
	value: string;
};

interface SelectBoxProps extends Omit<SelectRootProps, "collection"> {
	label: string;
	items: Array<SelectBoxItem>;
}

export const SelectBox: FC<SelectBoxProps> = ({ label, onValueChange, items }) => {
	const [selectedValue, setSelectedValue] = useState<Array<string>>([]);
	const [defaultItems, setDefaultItems] = useState<ListCollection<SelectBoxItem>>();
	const [isUserSelected, setIsUserSelected] = useState(false);
	const params = useSearchParams();

	useEffect(() => {
		setDefaultItems(createListCollection({ items }));
	}, [items]);

	useEffect(() => {
		if (isUserSelected) return;
		const status = params.get("status");
		const templateExists = defaultItems?.items.some(({ value }) => value === status?.toLowerCase());
		if (templateExists) setSelectedValue([status!]);
		else setSelectedValue([]);
	}, [defaultItems?.items, params, isUserSelected]);

	const handleValueChange = (e: SelectValueChangeDetails<SelectBoxItem>) => {
		setSelectedValue(e.value);
		setIsUserSelected(true);
		if (onValueChange) onValueChange(e);
	};

	return (
		<Select.Root collection={defaultItems!} width="full" value={selectedValue} onValueChange={handleValueChange}>
			<Select.HiddenSelect />
			<Select.Label>{label}</Select.Label>
			<Select.Control bgColor={"bg.card"}>
				<Select.Trigger height={11}>
					<Select.ValueText placeholder="Select a template" />
				</Select.Trigger>
				<Select.IndicatorGroup spaceX={2}>
					<Select.ClearTrigger />
					<Select.Indicator />
				</Select.IndicatorGroup>
			</Select.Control>
			<Portal>
				<Select.Positioner>
					<Select.Content>
						<For each={defaultItems?.items}>
							{(item) => (
								<Select.Item item={item} key={item.value}>
									<Stack gap="0">
										<Select.ItemText>{item.label}</Select.ItemText>
									</Stack>
									<Select.ItemIndicator />
								</Select.Item>
							)}
						</For>
					</Select.Content>
				</Select.Positioner>
			</Portal>
		</Select.Root>
	);
};
