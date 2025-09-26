import { SelectBox, SelectBoxItem } from "@/components/ui/select-box";
import { Card, Stack, HStack, FieldRoot, FieldLabel, NumberInput, InputGroup, Textarea, Link, useListCollection } from "@chakra-ui/react";
import { LuArrowRight, LuCalendar } from "react-icons/lu";
import NextLink from "next/link";
import { Suspense, useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import { ListRtrTemplatesDocument } from "@/graphql/generated/graphql";
import { useRtrForm } from "@/store";

export const RtrTemplateInfo = () => {
	const { updateField } = useRtrForm();
	const { data, loading } = useQuery(ListRtrTemplatesDocument);
	const { collection, set } = useListCollection<SelectBoxItem>({ initialItems: [], itemToString: (item) => item.name, itemToValue: (item) => item.value });

	useEffect(() => {
		if (data?.rtrTemplates) set(data.rtrTemplates.map((template) => ({ name: template.name, value: template.id })));
	}, [data, set]);

	return (
		<Card.Root bgColor={"bg"} divideY={"1px"} divideColor={"border"}>
			<Card.Header padding={4} gap={0}>
				<HStack justify={"space-between"}>
					<Card.Title>RTR Settings</Card.Title>
					<Link asChild colorPalette={"yellow"} fontSize={"sm"}>
						<NextLink href={"/recruiter/rtr/template/create"}>
							Create RTR template
							<LuArrowRight size={16} />
						</NextLink>
					</Link>
				</HStack>

				<Card.Description>Configure the RTR form settings</Card.Description>
			</Card.Header>
			<Card.Body>
				<Stack gap={4}>
					<Stack gap={4} direction={{ base: "column", md: "row" }}>
						<Suspense>
							<SelectBox
								name="rtrTemplate"
								label="RTR Template"
								collection={collection}
								loading={loading}
								onValueChange={(e) => updateField("rtrTemplateId", e.value.pop() ?? "")}
							/>
						</Suspense>
						<FieldRoot id="rtr-expiry-days">
							<FieldLabel>Expiry Days</FieldLabel>
							<NumberInput.Root defaultValue="30" size={"lg"} width={"full"}>
								<NumberInput.Control />
								<InputGroup startElement={<LuCalendar />}>
									<NumberInput.Input bgColor={"bg.card"} />
								</InputGroup>
							</NumberInput.Root>
						</FieldRoot>
					</Stack>
					<FieldRoot id="rtr-notes">
						<FieldLabel>Notes</FieldLabel>
						<Textarea bgColor={"bg.card"} size={"lg"} placeholder="Add internal notes about this RTR..." />
					</FieldRoot>
				</Stack>
			</Card.Body>
		</Card.Root>
	);
};
