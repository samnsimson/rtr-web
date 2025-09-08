"use client";
import { SelectBox } from "@/components/ui/select-box";
import { useParamSearch } from "@/hooks/user-search-params";
import { Box, Card, CardRootProps, Field, Input, InputGroup, Stack } from "@chakra-ui/react";
import { ChangeEvent, FC } from "react";
import { BiSearch } from "react-icons/bi";
import { RTRStatus } from "@prisma/client";

type RtrSearchFilterProps = CardRootProps;

export const RtrSearchFilter: FC<RtrSearchFilterProps> = ({ ...props }) => {
	const { searchDebounced, search } = useParamSearch();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => searchDebounced("query", e.target.value);

	return (
		<Card.Root bgColor={"bg"} divideY={"1px"} divideColor={"border"} {...props}>
			<Card.Header padding={4} gap={0}>
				<Card.Title>Filter</Card.Title>
				<Card.Description>Filter by RTR name</Card.Description>
			</Card.Header>
			<Card.Body>
				<Stack direction={{ base: "column", md: "row" }}>
					<Field.Root id="position-title">
						<Field.Label>Search</Field.Label>
						<InputGroup startElement={<BiSearch size={16} />}>
							<Input type="text" placeholder="Search for RTR..." size={"lg"} bgColor={"bg.card"} onChange={handleChange} />
						</InputGroup>
					</Field.Root>
					<Box width={{ base: "full", md: "2/12" }}>
						<SelectBox
							label="Status"
							items={[
								{ label: "Sent", value: RTRStatus.SENT },
								{ label: "Draft", value: RTRStatus.DRAFT },
								{ label: "Signed", value: RTRStatus.SIGNED },
								{ label: "Viewed", value: RTRStatus.VIEWED },
								{ label: "Expired", value: RTRStatus.EXPIRED },
								{ label: "Rejected", value: RTRStatus.REJECTED },
								{ label: "Pending", value: RTRStatus.PENDING },
							]}
							onValueChange={(e) => search("status", e.value)}
						/>
					</Box>
				</Stack>
			</Card.Body>
		</Card.Root>
	);
};
