"use client";
import { createListCollection, For, ListCollection, Portal, Select, SelectRootProps, SelectValueChangeDetails, Stack } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import qs from "qs";

type SelectBoxItem = {
	label: string;
	value: string;
};

interface SelectBoxProps extends Omit<SelectRootProps, "collection"> {
	name: string;
	label: string;
	items: Array<SelectBoxItem>;
	updateUrl?: boolean;
}

export const SelectBox: FC<SelectBoxProps> = ({ name, label, onValueChange, items, updateUrl = false }) => {
	const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);
	const [defaultItems, setDefaultItems] = useState<ListCollection<SelectBoxItem>>();
	const params = useSearchParams();
	const router = useRouter();

	useEffect(() => {
		setDefaultItems(createListCollection({ items }));
	}, [items]);

	useEffect(() => {
		if (!updateUrl || !defaultItems?.items) return;
		const urlValue = params.get(name);
		if (!urlValue) return setSelectedValue(undefined);
		const itemExists = defaultItems.items.some(({ value }) => value === urlValue);
		if (itemExists) setSelectedValue(urlValue);
	}, [updateUrl, defaultItems?.items, params, name]);

	const updateRoute = (newValue: string) => {
		const currentParams = qs.parse(params.toString());
		if (newValue && newValue !== "") currentParams[name] = newValue;
		else delete currentParams[name];
		const queryString = qs.stringify(currentParams, { arrayFormat: "comma", encode: false, skipNulls: true });
		router.push(`?${queryString}`, { scroll: false });
	};

	const handleValueChange = (e: SelectValueChangeDetails<SelectBoxItem>) => {
		const newValue = e.value[0];
		setSelectedValue(newValue);
		if (updateUrl) updateRoute(newValue);
		else if (onValueChange) onValueChange(e);
	};

	return (
		<Select.Root collection={defaultItems!} width="full" value={selectedValue ? [selectedValue] : []} onValueChange={handleValueChange}>
			<Select.HiddenSelect />
			<Select.Label>{label}</Select.Label>
			<Select.Control bgColor={"bg.card"}>
				<Select.Trigger height={11}>
					<Select.ValueText placeholder={`Select ${label.toLowerCase()}`} />
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
