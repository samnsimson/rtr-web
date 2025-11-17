"use client";
import { Field, For, ListCollection, Portal, Select, SelectRootProps, SelectValueChangeDetails, Show, Spinner } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";
import qs from "qs";

export interface SelectBoxItem {
	name: string;
	value: any;
}

interface SelectBoxProps extends Omit<SelectRootProps, "value"> {
	name: string;
	label: string;
	updateUrl?: boolean;
	loading?: boolean;
	collection: ListCollection<SelectBoxItem>;
	value?: string;
}

export const SelectBox: FC<SelectBoxProps> = ({ name, label, onValueChange, updateUrl = false, loading = false, collection, required = false, defaultValue = undefined }) => {
	const params = useSearchParams();
	const router = useRouter();

	const updateRoute = (newValue: string) => {
		const currentParams = qs.parse(params.toString());
		if (newValue && newValue !== "") currentParams[name] = newValue;
		else delete currentParams[name];
		const queryString = qs.stringify(currentParams, { arrayFormat: "comma", encode: false, skipNulls: true });
		router.push(`?${queryString}`, { scroll: false });
	};

	const handleValueChange = (e: SelectValueChangeDetails) => {
		const newValue = e.value[0];
		if (updateUrl) updateRoute(newValue);
		if (onValueChange) onValueChange({ ...e, value: [...e.value] });
	};

	return (
		<Select.Root collection={collection} width="full" onValueChange={handleValueChange} defaultValue={defaultValue}>
			<Select.HiddenSelect />
			<Select.Label>
				{label}&nbsp;
				<Show when={required}>
					<Field.RequiredIndicator />
				</Show>
			</Select.Label>
			<Select.Control bgColor={"bg.card"}>
				<Select.Trigger height={11}>
					<Select.ValueText placeholder={`Select ${label.toLowerCase()}`} />
				</Select.Trigger>
				<Select.IndicatorGroup spaceX={2}>
					{loading && <Spinner size="xs" borderWidth="1.5px" color="fg.muted" />}
					<Select.ClearTrigger />
					<Select.Indicator />
				</Select.IndicatorGroup>
			</Select.Control>
			<Portal>
				<Select.Positioner>
					<Select.Content>
						<For each={collection?.items}>
							{(item) => (
								<Select.Item item={item} key={item.value}>
									<Select.ItemText>{item.name}</Select.ItemText>
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
