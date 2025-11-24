import { PageTitle } from "@/components/dashboard/page-title";
import { Button, GridItem, HStack, List, SimpleGrid, Stack } from "@chakra-ui/react";
import Link from "next/link";
import { FC, PropsWithChildren } from "react";
import { LuChevronRight, LuCog, LuCreditCard, LuUserRoundCog, LuUsers } from "react-icons/lu";

const RecruiterSettings: FC<PropsWithChildren & LayoutProps<"/recruiter/settings">> = async ({ children }) => {
	return (
		<Stack padding={4} gap={4}>
			<PageTitle title="Settings" description="Manage your account and subscription" />
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
									<Link href={"/recruiter/settings/account"}>
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
										<LuCreditCard /> Subscription
									</Link>
								</Button>
								<LuChevronRight />
							</HStack>
						</List.Item>
						<List.Item padding={2}>
							<HStack justify={"space-between"} alignItems={"center"}>
								<Button asChild variant={"plain"} colorPalette={"white"} paddingLeft={0} fontWeight={"semibold"} _hover={{ color: "blue.500" }}>
									<Link href={"/recruiter/settings/user-management"}>
										<LuUsers /> User Management
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
