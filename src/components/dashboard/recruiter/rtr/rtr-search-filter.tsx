"use client";
import { SelectBox, SelectBoxItem } from "@/components/ui/select-box";
import { useParamSearch } from "@/hooks/user-search-params";
import { CardRootProps, createListCollection, Field, Input, InputGroup, Stack, useListCollection } from "@chakra-ui/react";
import { ChangeEvent, FC, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { RtrStatus } from "@/graphql/generated/graphql";
import { AppCard } from "@/components/ui/app-card";
import { useQuery } from "@apollo/client/react";
import { CompaniesDocument } from "@/graphql/generated/graphql";

type RtrSearchFilterProps = CardRootProps;

export const RtrSearchFilter: FC<RtrSearchFilterProps> = ({ ...props }) => {
	const { searchDebounced } = useParamSearch();
	const { collection, set } = useListCollection<SelectBoxItem>({ initialItems: [], itemToString: (item) => item.name, itemToValue: (item) => item.value });
	const { data, loading } = useQuery(CompaniesDocument);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => searchDebounced("query", e.target.value);

	useEffect(() => {
		if (data?.companies) set(data.companies.map(({ name }) => ({ name: name, value: name })));
	}, [data, set]);

	return (
		<AppCard title="Filter" description="Filter by RTR name" {...props}>
			<Stack gap={4}>
				<Field.Root id="position-title">
					<Field.Label>Search</Field.Label>
					<InputGroup startElement={<BiSearch size={16} />}>
						<Input type="text" placeholder="Search with candidate name..." size={"lg"} bgColor={"bg.card"} onChange={handleChange} />
					</InputGroup>
				</Field.Root>
				<SelectBox name="job" label="Job" updateUrl={true} collection={createListCollection({ items: [{ name: "All", value: "" }] })} />
				<SelectBox name="company" label="Company" updateUrl={true} collection={collection} loading={loading} />
				<SelectBox
					name="status"
					label="Status"
					updateUrl={true}
					collection={createListCollection({
						items: [
							{ name: "All", value: "" },
							{ name: "Sent", value: RtrStatus.Sent },
							{ name: "Draft", value: RtrStatus.Draft },
							{ name: "Signed", value: RtrStatus.Signed },
							{ name: "Viewed", value: RtrStatus.Viewed },
							{ name: "Expired", value: RtrStatus.Expired },
							{ name: "Rejected", value: RtrStatus.Rejected },
							{ name: "Pending", value: RtrStatus.Pending },
						],
					})}
				/>
			</Stack>
		</AppCard>
	);
};
