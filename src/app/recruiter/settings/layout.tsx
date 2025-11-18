import { Button, GridItem, Heading, HStack, List, SimpleGrid, Stack, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { FC, PropsWithChildren } from "react";
import { LuChevronRight, LuCog, LuCreditCard, LuUserRoundCog } from "react-icons/lu";

const RecruiterSettings: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Stack padding={4} gap={4}>
			<VStack gap={0} alignItems={"start"}>
				<Heading fontSize={"2xl"}>Settings</Heading>
				<Text>Manage your account and subscription</Text>
			</VStack>
			<SimpleGrid columns={{ base: 1, md: 4 }} gap={4}>
				<GridItem colSpan={{ base: 1, md: 1 }} spaceY={4}>
					<List.Root listStyleType={"none"} divideY={"1px"} divideColor={"border"}>
						<List.Item padding={2}>
							<HStack justify={"space-between"} alignItems={"center"}>
								<Button asChild variant={"plain"} colorPalette={"white"} paddingLeft={0} fontWeight={"semibold"} _hover={{ color: "blue.500" }}>
									<Link href={"/recruiter/settings/plans"}>
										<LuUserRoundCog />
										Profile Settings
									</Link>
								</Button>
								<LuChevronRight />
							</HStack>
						</List.Item>
						<List.Item padding={2}>
							<HStack justify={"space-between"} alignItems={"center"}>
								<Button asChild variant={"plain"} colorPalette={"white"} paddingLeft={0} fontWeight={"semibold"} _hover={{ color: "blue.500" }}>
									<Link href={"/recruiter/settings/plans"}>
										<LuCog /> Account Settings
									</Link>
								</Button>
								<LuChevronRight />
							</HStack>
						</List.Item>
						<List.Item padding={2}>
							<HStack justify={"space-between"} alignItems={"center"}>
								<Button asChild variant={"plain"} colorPalette={"white"} paddingLeft={0} fontWeight={"semibold"} _hover={{ color: "blue.500" }}>
									<Link href={"/recruiter/settings/plans"}>
										{" "}
										<LuCreditCard /> Subscription
									</Link>
								</Button>
								<LuChevronRight />
							</HStack>
						</List.Item>
					</List.Root>
				</GridItem>
				<GridItem colSpan={{ base: 1, md: 3 }} spaceY={4}>
					{children}
				</GridItem>
			</SimpleGrid>
		</Stack>
	);
};
export default RecruiterSettings;
