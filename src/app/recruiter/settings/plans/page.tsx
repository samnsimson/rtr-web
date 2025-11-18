import { PlanSwitchCard } from "@/components/subscription/plan-switch-card";
import { SubscriptionCard } from "@/components/subscription/subscription-card";
import { GridItem, Heading, HStack, SimpleGrid, Stack, Text, VStack } from "@chakra-ui/react";

const PaymentPlans = async ({ searchParams }: PageProps<"/recruiter/settings/plans">) => {
	const params = (await searchParams) as Record<string, string>;
	const term = params.term ? params.term : "monthly";
	return (
		<Stack padding={0} gap={4}>
			<HStack justify={"space-between"} alignItems={"center"}>
				<VStack gap={0} alignItems={"start"}>
					<Heading fontSize={"2xl"}>Payment Plans</Heading>
					<Text>Manage all your payment plans</Text>
				</VStack>
				<PlanSwitchCard />
			</HStack>
			<SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
				<GridItem colSpan={{ base: 1, md: 1 }} spaceY={4}>
					<SubscriptionCard
						title="Basic"
						description=" Plan for small businesses"
						features={["100 jobs", "100 RTRs", "100 users"]}
						price={term === "monthly" ? 10 : 100}
						interval={term}
						currency="USD"
						stripePaymentLink="https://stripe.com/payment-link"
						stripePriceId="price_1234567890"
						popular={false}
					/>
				</GridItem>
				<GridItem colSpan={{ base: 1, md: 1 }} spaceY={4}>
					<SubscriptionCard
						title="Standard"
						description="Plan for medium businesses"
						features={["1000 jobs", "1000 RTRs", "1000 users"]}
						price={term === "monthly" ? 20 : 200}
						interval={term}
						currency="USD"
						stripePaymentLink="https://stripe.com/payment-link/standard"
						stripePriceId="price_1234567890"
						popular={true}
					/>
				</GridItem>
				<GridItem colSpan={{ base: 1, md: 1 }} spaceY={4}>
					<SubscriptionCard
						title="Premium"
						description="Plan for large businesses"
						features={["10000 jobs", "10000 RTRs", "10000 users"]}
						price={term === "monthly" ? 30 : 300}
						interval={term}
						currency="USD"
						stripePaymentLink="https://stripe.com/payment-link/premium"
						stripePriceId="price_1234567890"
						popular={false}
					/>
				</GridItem>
			</SimpleGrid>
		</Stack>
	);
};
export default PaymentPlans;
