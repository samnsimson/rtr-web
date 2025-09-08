import { SelectBox } from "@/components/ui/select-box";
import { Card, Stack, HStack, FieldRoot, FieldLabel, NumberInput, InputGroup, Textarea, Link } from "@chakra-ui/react";
import { ArrowRightIcon, CalendarIcon } from "lucide-react";
import NextLink from "next/link";

export const RtrTemplateInfo = () => {
	return (
		<Card.Root bgColor={"bg"} divideY={"1px"} divideColor={"border"}>
			<Card.Header padding={4} gap={0}>
				<HStack justify={"space-between"}>
					<Card.Title>RTR Settings</Card.Title>
					<Link asChild colorPalette={"yellow"} fontSize={"sm"}>
						<NextLink href={"/recruiter/rtr/template/create"}>
							Create RTR template
							<ArrowRightIcon size={16} />
						</NextLink>
					</Link>
				</HStack>

				<Card.Description>Configure the RTR form settings</Card.Description>
			</Card.Header>
			<Card.Body>
				<Stack gap={4}>
					<HStack gap={4}>
						<SelectBox label="RTR Template" items={[]} />
						<FieldRoot id="rtr-expiry-days">
							<FieldLabel>Expiry Days</FieldLabel>
							<NumberInput.Root defaultValue="30" size={"lg"} width={"full"}>
								<NumberInput.Control />
								<InputGroup startElement={<CalendarIcon />}>
									<NumberInput.Input bgColor={"bg.card"} />
								</InputGroup>
							</NumberInput.Root>
						</FieldRoot>
					</HStack>
					<FieldRoot id="rtr-notes">
						<FieldLabel>Notes</FieldLabel>
						<Textarea bgColor={"bg.card"} size={"lg"} placeholder="Add internal notes about this RTR..." />
					</FieldRoot>
				</Stack>
			</Card.Body>
		</Card.Root>
	);
};
