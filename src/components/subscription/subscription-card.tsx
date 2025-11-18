import { AppCard } from "@/components/ui/app-card";
import { Badge, Box, Button, For, FormatNumber, Heading, List, Show, Stack, Text, VStack } from "@chakra-ui/react";
import { FC } from "react";
import Link from "next/link";

interface SubscriptionCardProps {
	title: string;
	description: string;
	features: string[];
	price: number;
	interval: string;
	currency: string;
	stripePaymentLink: string;
	stripePriceId: string;
	popular: boolean;
}

const PopularBadge: FC<{ popular: boolean }> = ({ popular }) => {
	return (
		<Show when={popular}>
			<Badge variant={"solid"} size={"lg"} colorPalette={"green"}>
				Popular
			</Badge>
		</Show>
	);
};

export const SubscriptionCard: FC<SubscriptionCardProps> = (props) => {
	return (
		<AppCard title={props.title} description={props.description} bgColor={"bg"} noPadding action={<PopularBadge popular={props.popular} />}>
			<Stack gap={0} divideY={"1px"} divideColor={"border"}>
				<VStack padding={4} gap={0} bgColor={"bg.card"}>
					<Heading size={"4xl"} fontWeight={"bold"} color={"secondary"}>
						<FormatNumber value={props.price} style="currency" currency={props.currency} />
					</Heading>
					<Text>{props.interval}</Text>
					<Text>{props.currency}</Text>
				</VStack>
				<List.Root listStyleType={"none"} padding={4}>
					<For each={props.features} fallback={<Text>No features found</Text>}>
						{(feature, index) => <List.Item key={index}>{feature}</List.Item>}
					</For>
				</List.Root>
				<Box padding={4}>
					<Button asChild variant={"solid"} colorPalette={"blue"} size={"lg"} width={"full"}>
						<Link href={props.stripePaymentLink as any} target="_blank" rel="noopener noreferrer">
							Subscribe
						</Link>
					</Button>
				</Box>
			</Stack>
		</AppCard>
	);
};
