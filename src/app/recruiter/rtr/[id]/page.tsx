import { FC } from "react";
import { Button, Flex, Heading, Stack, Text, DataList, Timeline, Icon, SimpleGrid, GridItem, FormatNumber, HStack, Show, Clipboard } from "@chakra-ui/react";
import { EditIcon, DownloadIcon, ShareIcon } from "lucide-react";
import { LuCheck, LuEye, LuFileText, LuSend, LuX, LuClock, LuExternalLink } from "react-icons/lu";
import { RtrDetailQuery, RtrStatus } from "@/graphql/generated/graphql";
import { AppCard, AppCardHeadless } from "@/components/ui/app-card";
import { format } from "date-fns";
import { api } from "@/lib/api";
import Link from "next/link";

interface RtrViewPageProps {
	params: Promise<{ id: string }>;
}

interface RtrActionButtonsProps {
	rtr: RtrDetailQuery["rtr"];
}

const RtrActionButtons: FC<RtrActionButtonsProps> = ({ rtr }) => {
	return (
		<HStack gap={2} justifyContent={"stretch"}>
			<Button asChild variant={"surface"} colorPalette={"blue"} size={"sm"}>
				<Link href={`/recruiter/job/${rtr.job.id}`} target="_blank">
					<LuExternalLink /> View Job
				</Link>
			</Button>
		</HStack>
	);
};

const CopyText: FC<{ value: string | number }> = ({ value }) => {
	return (
		<Clipboard.Root value={value.toString()}>
			<Clipboard.Trigger asChild>
				<Clipboard.Indicator />
			</Clipboard.Trigger>
		</Clipboard.Root>
	);
};

const RtrViewPage = async ({ params }: RtrViewPageProps) => {
	const { id } = await params;
	const rtrData = await api.getRtrDetail(id);

	const fullName = (rtr: RtrDetailQuery["rtr"]) => `${rtr.candidateFirstName} ${rtr.candidateLastName ?? ""}`;

	return (
		<Stack paddingX={4} gap={4}>
			<Stack gap={2}>
				<Stack direction={{ base: "column", md: "row" }} gap={4} justifyContent={"space-between"}>
					<Stack gap={0}>
						<Heading fontSize={{ base: "xl", md: "2xl" }}>RTR #{rtrData.rtrId}</Heading>
						<Text fontSize={{ base: "sm", md: "md" }}>Right to Represent for {fullName(rtrData)}</Text>
					</Stack>
					<Flex gap={2} alignItems={"center"} justifyContent={"stretch"}>
						<Button flex={1} variant={"outline"} size={{ base: "sm", md: "md" }} justifyContent="center">
							<EditIcon size={16} />
							Edit RTR
						</Button>
						<Button flex={1} variant={"outline"} size={{ base: "sm", md: "md" }} justifyContent="center">
							<DownloadIcon size={16} />
							Download
						</Button>
						<Button flex={1} variant={"solid"} colorPalette={"blue"} size={{ base: "sm", md: "md" }} justifyContent="center">
							<ShareIcon size={16} />
							Share
						</Button>
					</Flex>
				</Stack>
			</Stack>

			<SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
				<GridItem colSpan={{ base: 1, md: 2 }} spaceY={4}>
					{/* Candidate Information */}
					<AppCard title="Candidate Information" description="Personal details of the candidate" bgColor={"bg"}>
						<DataList.Root orientation={"horizontal"} gap={4}>
							<DataList.Item>
								<DataList.ItemLabel>Full Name:</DataList.ItemLabel>
								<DataList.ItemValue>{fullName(rtrData)}</DataList.ItemValue>
							</DataList.Item>
							<DataList.Item>
								<DataList.ItemLabel>Email:</DataList.ItemLabel>
								<DataList.ItemValue>
									<HStack gap={2} alignItems={"center"}>
										<Text asChild>
											<Link href={`mailto:${rtrData.candidateEmail}`} target="_blank">
												{rtrData.candidateEmail}
											</Link>
										</Text>
										<CopyText value={rtrData.candidateEmail} />
									</HStack>
								</DataList.ItemValue>
							</DataList.Item>
							<DataList.Item>
								<DataList.ItemLabel>Phone:</DataList.ItemLabel>
								<DataList.ItemValue>
									<HStack gap={2} alignItems={"center"}>
										<Text asChild>
											<Link href={`tel:${rtrData.candidatePhone}`} target="_blank">
												{rtrData.candidatePhone}
											</Link>
										</Text>
										<CopyText value={rtrData.candidatePhone} />
									</HStack>
								</DataList.ItemValue>
							</DataList.Item>
						</DataList.Root>
					</AppCard>

					{/* Position Information */}
					<AppCard title="Position Information" description="Details about the role and company" bgColor={"bg"} action={<RtrActionButtons rtr={rtrData} />}>
						<DataList.Root orientation={"horizontal"} gap={4}>
							<DataList.Item>
								<DataList.ItemLabel>Job Title:</DataList.ItemLabel>
								<DataList.ItemValue>{rtrData.job.title}</DataList.ItemValue>
							</DataList.Item>
							<DataList.Item>
								<DataList.ItemLabel>Company:</DataList.ItemLabel>
								<DataList.ItemValue>{rtrData.job.company}</DataList.ItemValue>
							</DataList.Item>
							<DataList.Item>
								<DataList.ItemLabel>Work Type:</DataList.ItemLabel>
								<DataList.ItemValue>{rtrData.job.workType}</DataList.ItemValue>
							</DataList.Item>
							<DataList.Item>
								<DataList.ItemLabel>Job Type:</DataList.ItemLabel>
								<DataList.ItemValue>{rtrData.job.jobType}</DataList.ItemValue>
							</DataList.Item>
							<DataList.Item>
								<DataList.ItemLabel>Compensation:</DataList.ItemLabel>
								<DataList.ItemValue>
									<FormatNumber value={rtrData.job.salaryMin || 0} style="currency" currency="USD" /> -
									<FormatNumber value={rtrData.job.salaryMax || 0} style="currency" currency="USD" />
								</DataList.ItemValue>
							</DataList.Item>
						</DataList.Root>
					</AppCard>

					{/* RTR Content */}
					<AppCard title="Right to Represent Content" description="The RTR agreement text" bgColor={"bg"}>
						<AppCardHeadless bgColor={"bg.card"}>
							<Text fontSize={"sm"}>
								I give exclusive permission to VYSystems to represent {fullName(rtrData)}&apos;s profile and qualifications to {rtrData.job.company} for the below
								requirement. I confirm that I have not submitted my resume or application for this specific position to any other recruitment agency or directly
								with this client within the last 30-60 days. By granting us the Right to Represent, you allow us to present your resume and credentials to our
								client for their consideration.
							</Text>
						</AppCardHeadless>
					</AppCard>

					{/* Notes */}
					<AppCard title="Notes" description="Additional information about this RTR" bgColor={"bg"}>
						<Show when={rtrData.notes}>
							<AppCardHeadless>
								<Text>{rtrData.notes}</Text>
							</AppCardHeadless>
						</Show>
					</AppCard>
				</GridItem>
				<GridItem colSpan={{ base: 1, md: 1 }} spaceY={4}>
					{/* Timeline */}
					<AppCard title="Timeline" description="RTR lifecycle and important events" bgColor={"bg"}>
						<Timeline.Root size="md" variant="subtle">
							<Timeline.Item>
								<Timeline.Connector>
									<Timeline.Separator />
									<Timeline.Indicator>
										<Icon fontSize="xs">
											<LuFileText />
										</Icon>
									</Timeline.Indicator>
								</Timeline.Connector>
								<Timeline.Content>
									<Timeline.Title>RTR Created</Timeline.Title>
									<Timeline.Description>{format(rtrData.createdAt, "PPP")}</Timeline.Description>
									<Text textStyle="sm">
										Right to Represent form was created for {fullName(rtrData)} at {rtrData.job.company}
									</Text>
								</Timeline.Content>
							</Timeline.Item>

							<Timeline.Item>
								<Timeline.Connector>
									<Timeline.Separator />
									<Timeline.Indicator>
										<Icon fontSize="xs">
											<LuSend />
										</Icon>
									</Timeline.Indicator>
								</Timeline.Connector>
								<Timeline.Content>
									<Timeline.Title>RTR Sent to Candidate</Timeline.Title>
									<Timeline.Description>{format(rtrData.signedAt, "PPP")}</Timeline.Description>
									<Text textStyle="sm">RTR form was sent to {fullName(rtrData)} for review and signature</Text>
								</Timeline.Content>
							</Timeline.Item>

							{rtrData.status === RtrStatus.Viewed && (
								<Timeline.Item>
									<Timeline.Connector>
										<Timeline.Separator />
										<Timeline.Indicator>
											<Icon fontSize="xs">
												<LuEye />
											</Icon>
										</Timeline.Indicator>
									</Timeline.Connector>
									<Timeline.Content>
										<Timeline.Title>RTR Viewed by Candidate</Timeline.Title>
										<Timeline.Description>{format(rtrData.viewedAt, "PPP")}</Timeline.Description>
										<Text textStyle="sm">Candidate has reviewed the RTR form and position details</Text>
									</Timeline.Content>
								</Timeline.Item>
							)}

							{rtrData.status === RtrStatus.Signed && (
								<Timeline.Item>
									<Timeline.Connector>
										<Timeline.Separator />
										<Timeline.Indicator bg="green.solid" color="green.contrast">
											<Icon fontSize="xs">
												<LuCheck />
											</Icon>
										</Timeline.Indicator>
									</Timeline.Connector>
									<Timeline.Content>
										<Timeline.Title>RTR Signed by Candidate</Timeline.Title>
										<Timeline.Description>{format(rtrData.signedAt, "PPP")}</Timeline.Description>
										<Text textStyle="sm">Candidate has signed the Right to Represent agreement</Text>
									</Timeline.Content>
								</Timeline.Item>
							)}

							{rtrData.status === RtrStatus.Pending && (
								<Timeline.Item>
									<Timeline.Connector>
										<Timeline.Separator />
										<Timeline.Indicator bg="yellow.solid" color="yellow.contrast">
											<Icon fontSize="xs">
												<LuClock />
											</Icon>
										</Timeline.Indicator>
									</Timeline.Connector>
									<Timeline.Content>
										<Timeline.Title>Awaiting Candidate Response</Timeline.Title>
										<Timeline.Description>Pending</Timeline.Description>
										<Text textStyle="sm">Waiting for candidate to review and respond to the RTR</Text>
									</Timeline.Content>
								</Timeline.Item>
							)}

							{rtrData.status === RtrStatus.Expired && (
								<Timeline.Item>
									<Timeline.Connector>
										<Timeline.Separator />
										<Timeline.Indicator bg="red.solid" color="yellow.contrast">
											<Icon fontSize="xs">
												<LuX />
											</Icon>
										</Timeline.Indicator>
									</Timeline.Connector>
									<Timeline.Content>
										<Timeline.Title>RTR Expired</Timeline.Title>
										<Timeline.Description>{format(rtrData.expiresAt, "PPP")}</Timeline.Description>
										<Text textStyle="sm">RTR form has expired and is no longer valid</Text>
									</Timeline.Content>
								</Timeline.Item>
							)}
						</Timeline.Root>
					</AppCard>
				</GridItem>
			</SimpleGrid>
		</Stack>
	);
};

export default RtrViewPage;
