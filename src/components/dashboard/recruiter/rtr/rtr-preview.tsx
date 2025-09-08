import { Card, DataList, Heading, List, Separator, Stack, Text } from "@chakra-ui/react";

export const RtrPreview = () => {
	return (
		<Card.Root bgColor={"bg"} divideY={"1px"} divideColor={"border"}>
			<Card.Header padding={4} gap={0}>
				<Card.Title>RTR Preview</Card.Title>
				<Card.Description>A preview of the RTR you created</Card.Description>
			</Card.Header>
			<Card.Body>
				<Stack>
					<Stack direction={{ base: "column", md: "row" }} gap={4}>
						<Stack>
							<Heading size={"md"}>Candidate Infomation</Heading>
							<DataList.Root orientation={"horizontal"} gap={2}>
								<DataList.Item>
									<DataList.ItemLabel>Name:</DataList.ItemLabel>
									<DataList.ItemValue>Sam Nishanth Simson</DataList.ItemValue>
								</DataList.Item>
								<DataList.Item>
									<DataList.ItemLabel>Email:</DataList.ItemLabel>
									<DataList.ItemValue>samnsimson@gmail.com</DataList.ItemValue>
								</DataList.Item>
								<DataList.Item>
									<DataList.ItemLabel>Phone:</DataList.ItemLabel>
									<DataList.ItemValue>9049177058</DataList.ItemValue>
								</DataList.Item>
							</DataList.Root>
						</Stack>
						<Stack>
							<Heading size={"md"}>Job Information</Heading>
							<DataList.Root orientation={"horizontal"} gap={2}>
								<DataList.Item>
									<DataList.ItemLabel>Title:</DataList.ItemLabel>
									<DataList.ItemValue>Senior Software Engineer</DataList.ItemValue>
								</DataList.Item>
								<DataList.Item>
									<DataList.ItemLabel>Company:</DataList.ItemLabel>
									<DataList.ItemValue>Florida Blue (Blue Cross Blue Sheild)</DataList.ItemValue>
								</DataList.Item>
								<DataList.Item>
									<DataList.ItemLabel>Type:</DataList.ItemLabel>
									<DataList.ItemValue>Remote</DataList.ItemValue>
								</DataList.Item>
							</DataList.Root>
						</Stack>
					</Stack>
					<Separator marginY={4} />
					<Stack>
						<Stack>
							<Heading size={"md"}>Candidate RTR</Heading>
							<Card.Root bgColor={"bg.card"}>
								<Card.Body>
									<Text fontSize={"sm"}>
										I give exclusive permission to VYSystems to represent Sam Nishanth Simson profile and qualifications to Mphasis for the below requirement. I
										confirm that I have not submitted my resume or application for this specific position to any other recruitment agency or directly with this
										client within the last 30-60 days. By granting us the Right to Represent, you allow us to present your resume and credentials to our client
										for their consideration.
									</Text>
								</Card.Body>
							</Card.Root>
						</Stack>
						<Separator marginY={4} />
						<Stack>
							<Heading size={"md"}>Job Description</Heading>
							<Card.Root bgColor={"bg.card"}>
								<Card.Body>
									<Stack>
										<Text fontSize={"sm"}>
											3 years of relevant coding/audit experience. The Coding Quality Auditor will be responsible for validating and reviewing Hierarchical
											Condition Category (HCC) risk adjustable charts through retrospective chart reviews. The role focuses on ensuring accurate, complete,
											and compliant ICD-10 coding for risk adjustment submission to CMS. Candidates must apply clinical documentation standards and industry
											guidelines to support coding decisions. This role contributes to audit accuracy, process improvements, and helps maintain compliance
											with state/federal regulations and internal policies.
										</Text>
										<Stack>
											<Heading size={"md"}>Job Duties</Heading>
											<Text fontSize={"sm"}>
												The Coding Quality Auditor will be responsible for validating and reviewing Hierarchical Condition Category (HCC) risk adjustable
												charts through retrospective chart reviews. The role focuses on ensuring accurate, complete, and compliant ICD-10 coding for risk
												adjustment submission to CMS. Candidates must apply clinical documentation standards and industry guidelines to support coding
												decisions. This role contributes to audit accuracy, process improvements, and helps maintain compliance with state/federal
												regulations and internal policies.
											</Text>
										</Stack>
										<Stack>
											<Heading size={"md"}>Qualifications Required</Heading>
											<List.Root paddingStart={4}>
												<List.Item>
													Bachelor&apos;s degree in Computer Science, Software Engineering, or a related field, or equivalent practical experience.
												</List.Item>
												<List.Item>Proven professional experience with both React.js and React Native.</List.Item>
												<List.Item>Strong proficiency in JavaScript (ES6+), HTML5, and CSS3.</List.Item>
												<List.Item>Experience with state management libraries like Redux, MobX, or the React Context API.</List.Item>
												<List.Item>Familiarity with modern front-end build pipelines and tools.</List.Item>
												<List.Item>Knowledge of mobile application development for iOS and Android platforms.</List.Item>
												<List.Item>Excellent problem-solving skills and the ability to work independently or as part of a team.</List.Item>
											</List.Root>
										</Stack>
										<Stack>
											<Heading size={"md"}>Preffered Qualifications</Heading>
											<List.Root paddingStart={4}>
												<List.Item>Experience with a major retail or e-commerce client.</List.Item>
												<List.Item>Familiarity with cloud platforms (e.g., AWS, Azure, GCP).</List.Item>
												<List.Item>Experience with automated testing and continuous integration/continuous deployment (CI/CD).</List.Item>
												<List.Item>Knowledge of TypeScript.</List.Item>
												<List.Item>Experience with GraphQL.</List.Item>
											</List.Root>
										</Stack>
									</Stack>
								</Card.Body>
							</Card.Root>
						</Stack>
					</Stack>
				</Stack>
			</Card.Body>
		</Card.Root>
	);
};
