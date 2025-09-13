"use client";
import { SelectBox } from "@/components/ui/select-box";
import { useParamSearch } from "@/hooks/user-search-params";
import { Box, Card, CardRootProps, Field, Input, InputGroup, Stack } from "@chakra-ui/react";
import { ChangeEvent, FC, Suspense } from "react";
import { BiSearch } from "react-icons/bi";
import { WorkType, JobType, CompensationType } from "@/graphql/generated/graphql";

type JobSearchFilterProps = CardRootProps;

export const JobSearchFilter: FC<JobSearchFilterProps> = ({ ...props }) => {
	const { searchDebounced, search } = useParamSearch();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => searchDebounced("query", e.target.value);

	return (
		<Card.Root bgColor={"bg"} divideY={"1px"} divideColor={"border"} {...props}>
			<Card.Header padding={4} gap={0}>
				<Card.Title>Filter</Card.Title>
				<Card.Description>Filter jobs by various criteria</Card.Description>
			</Card.Header>
			<Card.Body>
				<Stack direction={{ base: "column", md: "row" }} gap={4}>
					<Field.Root id="job-search">
						<Field.Label>Search</Field.Label>
						<InputGroup startElement={<BiSearch size={16} />}>
							<Input type="text" placeholder="Search for jobs..." size={"lg"} bgColor={"bg.card"} onChange={handleChange} />
						</InputGroup>
					</Field.Root>
					<Box width={{ base: "full", md: "2/12" }}>
						<Suspense>
							<SelectBox
								label="Work Type"
								items={[
									{ label: "All", value: "" },
									{ label: "Remote", value: WorkType.Remote },
									{ label: "Hybrid", value: WorkType.Hybrid },
									{ label: "On Site", value: WorkType.OnSite },
								]}
								onValueChange={(e) => search("workType", e.value)}
							/>
						</Suspense>
					</Box>
					<Box width={{ base: "full", md: "2/12" }}>
						<Suspense>
							<SelectBox
								label="Job Type"
								items={[
									{ label: "All", value: "" },
									{ label: "Full Time", value: JobType.FullTime },
									{ label: "Part Time", value: JobType.PartTime },
									{ label: "Contract", value: JobType.Contract },
									{ label: "Internship", value: JobType.Internship },
									{ label: "Freelance", value: JobType.Freelance },
								]}
								onValueChange={(e) => search("jobType", e.value)}
							/>
						</Suspense>
					</Box>
					<Box width={{ base: "full", md: "2/12" }}>
						<Suspense>
							<SelectBox
								label="Compensation"
								items={[
									{ label: "All", value: "" },
									{ label: "Salary", value: CompensationType.Salary },
									{ label: "Hourly", value: CompensationType.Hourly },
									{ label: "Project Based", value: CompensationType.ProjectBased },
									{ label: "Commission", value: CompensationType.Commission },
								]}
								onValueChange={(e) => search("compensation", e.value)}
							/>
						</Suspense>
					</Box>
				</Stack>
			</Card.Body>
		</Card.Root>
	);
};
