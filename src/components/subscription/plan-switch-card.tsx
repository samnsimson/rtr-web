"use client";
import { HStack, RadioCard } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";

export const PlanSwitchCard = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const term = searchParams.get("term");
	const defaultValue = term ? term : "monthly";

	return (
		<RadioCard.Root
			align="center"
			justify="center"
			defaultValue={defaultValue}
			variant={"surface"}
			colorPalette={"blue"}
			onValueChange={(e) => router.push(`/recruiter/settings/plans?term=${e.value}`)}
		>
			<HStack>
				<RadioCard.Item key={"monthly"} value={"monthly"} padding={0}>
					<RadioCard.ItemHiddenInput />
					<RadioCard.ItemControl>
						<RadioCard.ItemText>Monthly</RadioCard.ItemText>
					</RadioCard.ItemControl>
				</RadioCard.Item>
				<RadioCard.Item key={"yearly"} value={"yearly"} padding={0}>
					<RadioCard.ItemHiddenInput />
					<RadioCard.ItemControl>
						<RadioCard.ItemText>Yearly</RadioCard.ItemText>
					</RadioCard.ItemControl>
				</RadioCard.Item>
			</HStack>
		</RadioCard.Root>
	);
};
