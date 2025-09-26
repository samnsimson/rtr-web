import { Button, Card, Flex, Heading, Stack, Text, DataList, Timeline, Icon, SimpleGrid, GridItem, FormatNumber } from "@chakra-ui/react";
import { EditIcon, DownloadIcon, ShareIcon } from "lucide-react";
import { format } from "date-fns";
import { LuCheck, LuEye, LuFileText, LuSend, LuX, LuClock } from "react-icons/lu";
import { RtrStatus, WorkType, CompensationType } from "@/graphql/generated/graphql";

const getRtrData = (id: string) => {
	const dataTableItems = [
		{
			id: 1,
			name: "Sam Nishanth Simson",
			email: "samnsimson@gmail.com",
			phone: "9049177058",
			position: "Senior Software Engineer",
			company: "TechCorp Inc.",
			status: RtrStatus.Signed,
			date: new Date(),
			workType: WorkType.Remote,
			jobType: "Full-time",
			compensation: CompensationType.Salary,
			pay: "$120,000 - $150,000",
			notes: "Excellent candidate with strong React skills",
		},
		{
			id: 2,
			name: "Sam Nishanth Simson",
			email: "samnsimson@gmail.com",
			phone: "9049177058",
			position: "Senior Software Engineer",
			company: "Florida Blue",
			status: RtrStatus.Signed,
			date: new Date(),
			workType: WorkType.Hybrid,
			jobType: "Full-time",
			compensation: CompensationType.Salary,
			pay: "$130,000 - $160,000",
			notes: "Great fit for healthcare technology role",
		},
		{
			id: 3,
			name: "Sam Nishanth Simson",
			email: "samnsimson@gmail.com",
			phone: "9049177058",
			position: "Senior Software Engineer",
			company: "Blue Cross Blue Shield",
			status: RtrStatus.Viewed,
			date: new Date(),
			workType: WorkType.OnSite,
			jobType: "Full-time",
			compensation: CompensationType.Salary,
			pay: "$125,000 - $155,000",
			notes: "Candidate interested in healthcare domain",
		},
		{
			id: 4,
			name: "Sam Nishanth Simson",
			email: "samnsimson@gmail.com",
			phone: "9049177058",
			position: "Senior Software Engineer",
			company: "FoodHub",
			status: RtrStatus.Pending,
			date: new Date(),
			workType: WorkType.Remote,
			jobType: "Full-time",
			compensation: CompensationType.Salary,
			pay: "$110,000 - $140,000",
			notes: "Pending candidate response",
		},
		{
			id: 5,
			name: "Sam Nishanth Simson",
			email: "samnsimson@gmail.com",
			phone: "9049177058",
			position: "Senior Software Engineer",
			company: "Matrimony.com",
			status: RtrStatus.Expired,
			date: new Date(),
			workType: WorkType.Hybrid,
			jobType: "Full-time",
			compensation: CompensationType.Salary,
			pay: "$100,000 - $130,000",
			notes: "Position expired - candidate no longer available",
		},
		{
			id: 6,
			name: "Sam Nishanth Simson",
			email: "samnsimson@gmail.com",
			phone: "9049177058",
			position: "Senior Software Engineer",
			company: "Emazzanti Technologies",
			status: RtrStatus.Signed,
			date: new Date(),
			workType: WorkType.Remote,
			jobType: "Full-time",
			compensation: CompensationType.Salary,
			pay: "$115,000 - $145,000",
			notes: "Successfully placed candidate",
		},
		{
			id: 7,
			name: "Sam Nishanth Simson",
			email: "samnsimson@gmail.com",
			phone: "9049177058",
			position: "Senior Software Engineer",
			company: "Flykart",
			status: RtrStatus.Viewed,
			date: new Date(),
			workType: WorkType.OnSite,
			jobType: "Full-time",
			compensation: CompensationType.Commission,
			pay: "$105,000 - $135,000",
			notes: "Candidate reviewed position details",
		},
	];

	return dataTableItems.find((item) => item.id.toString() === id);
};
interface RtrViewPageProps {
	params: Promise<{ id: string }>;
}

const RtrViewPage = async ({ params }: RtrViewPageProps) => {
	const { id } = await params;
	const rtrData = getRtrData(id);

	if (!rtrData) {
		return (
			<Stack padding={4} gap={4}>
				<Card.Root>
					<Card.Body>
						<Text>RTR not found</Text>
					</Card.Body>
				</Card.Root>
			</Stack>
		);
	}

	return (
		<Stack paddingX={4} gap={4}>
			<Stack gap={2}>
				<Stack direction={{ base: "column", md: "row" }} gap={4} justifyContent={"space-between"}>
					<Stack gap={0}>
						<Heading fontSize={{ base: "xl", md: "2xl" }}>RTR #{rtrData.id}</Heading>
						<Text fontSize={{ base: "sm", md: "md" }}>Right to Represent for {rtrData.name}</Text>
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
					<Card.Root bgColor={"bg"} divideY={"1px"} divideColor={"border"}>
						<Card.Header padding={4} gap={0}>
							<Card.Title>Candidate Information</Card.Title>
							<Card.Description>Personal details of the candidate</Card.Description>
						</Card.Header>
						<Card.Body>
							<DataList.Root orientation={"horizontal"} gap={4}>
								<DataList.Item>
									<DataList.ItemLabel>Full Name:</DataList.ItemLabel>
									<DataList.ItemValue>{rtrData.name}</DataList.ItemValue>
								</DataList.Item>
								<DataList.Item>
									<DataList.ItemLabel>Email:</DataList.ItemLabel>
									<DataList.ItemValue>{rtrData.email}</DataList.ItemValue>
								</DataList.Item>
								<DataList.Item>
									<DataList.ItemLabel>Phone:</DataList.ItemLabel>
									<DataList.ItemValue>{rtrData.phone}</DataList.ItemValue>
								</DataList.Item>
							</DataList.Root>
						</Card.Body>
					</Card.Root>

					{/* Position Information */}
					<Card.Root bgColor={"bg"} divideY={"1px"} divideColor={"border"}>
						<Card.Header padding={4} gap={0}>
							<Card.Title>Position Information</Card.Title>
							<Card.Description>Details about the role and company</Card.Description>
						</Card.Header>
						<Card.Body>
							<DataList.Root orientation={"horizontal"} gap={4}>
								<DataList.Item>
									<DataList.ItemLabel>Job Title:</DataList.ItemLabel>
									<DataList.ItemValue>{rtrData.position}</DataList.ItemValue>
								</DataList.Item>
								<DataList.Item>
									<DataList.ItemLabel>Company:</DataList.ItemLabel>
									<DataList.ItemValue>{rtrData.company}</DataList.ItemValue>
								</DataList.Item>
								<DataList.Item>
									<DataList.ItemLabel>Work Type:</DataList.ItemLabel>
									<DataList.ItemValue>{rtrData.workType}</DataList.ItemValue>
								</DataList.Item>
								<DataList.Item>
									<DataList.ItemLabel>Job Type:</DataList.ItemLabel>
									<DataList.ItemValue>{rtrData.jobType}</DataList.ItemValue>
								</DataList.Item>
								<DataList.Item>
									<DataList.ItemLabel>Compensation:</DataList.ItemLabel>
									<DataList.ItemValue>{rtrData.compensation}</DataList.ItemValue>
								</DataList.Item>
								<DataList.Item>
									<DataList.ItemLabel>Pay Range:</DataList.ItemLabel>
									<DataList.ItemValue>
										<FormatNumber value={parseInt(rtrData.pay)} style="currency" currency="USD" />
									</DataList.ItemValue>
								</DataList.Item>
							</DataList.Root>
						</Card.Body>
					</Card.Root>

					{/* RTR Content */}
					<Card.Root bgColor={"bg"} divideY={"1px"} divideColor={"border"}>
						<Card.Header padding={4} gap={0}>
							<Card.Title>Right to Represent Content</Card.Title>
							<Card.Description>The RTR agreement text</Card.Description>
						</Card.Header>
						<Card.Body>
							<Card.Root bgColor={"bg.card"}>
								<Card.Body>
									<Text fontSize={"sm"}>
										I give exclusive permission to VYSystems to represent {rtrData.name}&apos;s profile and qualifications to {rtrData.company} for the below
										requirement. I confirm that I have not submitted my resume or application for this specific position to any other recruitment agency or
										directly with this client within the last 30-60 days. By granting us the Right to Represent, you allow us to present your resume and
										credentials to our client for their consideration.
									</Text>
								</Card.Body>
							</Card.Root>
						</Card.Body>
					</Card.Root>

					{/* Notes */}
					<Card.Root bgColor={"bg"} divideY={"1px"} divideColor={"border"}>
						<Card.Header padding={4} gap={0}>
							<Card.Title>Notes</Card.Title>
							<Card.Description>Additional information about this RTR</Card.Description>
						</Card.Header>
						<Card.Body>
							<Text>{rtrData.notes}</Text>
						</Card.Body>
					</Card.Root>
				</GridItem>
				<GridItem colSpan={{ base: 1, md: 1 }} spaceY={4}>
					{/* Timeline */}
					<Card.Root bgColor={"bg"} divideY={"1px"} divideColor={"border"}>
						<Card.Header padding={4} gap={0}>
							<Card.Title>Timeline</Card.Title>
							<Card.Description>RTR lifecycle and important events</Card.Description>
						</Card.Header>
						<Card.Body>
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
										<Timeline.Description>{format(rtrData.date, "PPP")}</Timeline.Description>
										<Text textStyle="sm">
											Right to Represent form was created for {rtrData.name} at {rtrData.company}
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
										<Timeline.Description>{format(new Date(rtrData.date.getTime() + 24 * 60 * 60 * 1000), "PPP")}</Timeline.Description>
										<Text textStyle="sm">RTR form was sent to {rtrData.name} for review and signature</Text>
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
											<Timeline.Description>{format(new Date(rtrData.date.getTime() + 2 * 24 * 60 * 60 * 1000), "PPP")}</Timeline.Description>
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
											<Timeline.Description>{format(new Date(rtrData.date.getTime() + 3 * 24 * 60 * 60 * 1000), "PPP")}</Timeline.Description>
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
											<Timeline.Description>{format(new Date(rtrData.date.getTime() + 30 * 24 * 60 * 60 * 1000), "PPP")}</Timeline.Description>
											<Text textStyle="sm">RTR form has expired and is no longer valid</Text>
										</Timeline.Content>
									</Timeline.Item>
								)}
							</Timeline.Root>
						</Card.Body>
					</Card.Root>
				</GridItem>
			</SimpleGrid>
		</Stack>
	);
};

export default RtrViewPage;
