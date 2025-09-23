"use client";
import { SelectBox } from "@/components/ui/select-box";
import { useParamSearch } from "@/hooks/user-search-params";
import { CardRootProps, createListCollection, Field, Input, InputGroup, Stack } from "@chakra-ui/react";
import { ChangeEvent, FC } from "react";
import { BiSearch } from "react-icons/bi";
import { RtrStatus } from "@/graphql/generated/graphql";
import { AppCard } from "@/components/ui/app-card";

type RtrSearchFilterProps = CardRootProps;

export const RtrSearchFilter: FC<RtrSearchFilterProps> = ({ ...props }) => {
	const { searchDebounced } = useParamSearch();
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => searchDebounced("query", e.target.value);

	return (
		<AppCard title="Filter" description="Filter by RTR name" {...props}>
			<Stack gap={4}>
				<Field.Root id="position-title">
					<Field.Label>Search</Field.Label>
					<InputGroup startElement={<BiSearch size={16} />}>
						<Input type="text" placeholder="Search with candidate name..." size={"lg"} bgColor={"bg.card"} onChange={handleChange} />
					</InputGroup>
				</Field.Root>
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
