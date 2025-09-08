import { Badge, Button, CardBody, CardDescription, CardHeader, CardRoot, CardTitle, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

const rtrList = [
	{ name: "John Smith", role: "Senior Software Engineer", company: "TechCorp Inc.", sent: "2024-01-15", signed: "2024-01-15" },
	{ name: "Sarah Johnson", role: "Product Manager", company: "StartupXYZ", sent: "2024-01-15", signed: "2024-01-15" },
	{ name: "Mike Chen", role: "Data Scientist", company: "DataFlow Ltd", sent: "2024-01-15", signed: "2024-01-15" },
	{ name: "Emily Davis", role: "UX Designer", company: "DesignStudio", sent: "2024-01-15", signed: "2024-01-15" },
];

export const RecentRtrList = () => {
	return (
		<CardRoot border={0} bgColor={"bg"}>
			<CardHeader>
				<HStack justify={"space-between"}>
					<Stack gap={0}>
						<CardTitle>Recent RTR&apos;s</CardTitle>
						<CardDescription>Your latest RTR activity and status updates</CardDescription>
					</Stack>
					<Button variant={"solid"} colorPalette={"blue"} asChild>
						<Link href={"/recruiter/rtr"}>
							View All <ArrowRightIcon />
						</Link>
					</Button>
				</HStack>
			</CardHeader>
			<CardBody spaceY={4}>
				{rtrList.map((rtr, idx) => (
					<CardRoot key={idx} bg={"transparent"} borderColor={"gray.700"}>
						<CardBody p={4}>
							<HStack justify={"space-between"}>
								<Stack gap={0}>
									<Heading fontSize={"md"}>{rtr.name}</Heading>
									<Text fontSize={"sm"}>
										{rtr.role} at {rtr.company}
									</Text>
									<HStack>
										<Text fontSize={"sm"}>Sent: {rtr.sent}</Text>
										<Text fontSize={"sm"}>Signed: {rtr.signed}</Text>
									</HStack>
								</Stack>
								<Badge colorPalette={"green"}>signed</Badge>
							</HStack>
						</CardBody>
					</CardRoot>
				))}
			</CardBody>
		</CardRoot>
	);
};
