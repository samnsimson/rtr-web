"use client";
import { SelectBox } from "@/components/ui/select-box";
import { useParamSearch } from "@/hooks/user-search-params";
import { Box, Card, CardRootProps, Field, Input, InputGroup, Stack } from "@chakra-ui/react";
import { ChangeEvent, FC } from "react";
import { BiSearch } from "react-icons/bi";
import { WorkType, JobType, CompensationType } from "@/graphql/generated/graphql";

type JobSearchFilterProps = CardRootProps;

const workTypeItems = [
	{ label: "All", value: "" },
	{ label: "Remote", value: WorkType.Remote },
	{ label: "Hybrid", value: WorkType.Hybrid },
	{ label: "On Site", value: WorkType.OnSite },
];

const jobTypeItems = [
	{ label: "All", value: "" },
	{ label: "Full Time", value: JobType.FullTime },
	{ label: "Part Time", value: JobType.PartTime },
	{ label: "Contract", value: JobType.Contract },
	{ label: "Internship", value: JobType.Internship },
	{ label: "Freelance", value: JobType.Freelance },
];

const compensationItems = [
	{ label: "All", value: "" },
	{ label: "Salary", value: CompensationType.Salary },
	{ label: "Hourly", value: CompensationType.Hourly },
	{ label: "Project Based", value: CompensationType.ProjectBased },
	{ label: "Commission", value: CompensationType.Commission },
];

export const JobSearchFilter: FC<JobSearchFilterProps> = ({ ...props }) => {
	const { searchDebounced } = useParamSearch();

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
						<SelectBox name="workType" label="Work Type" updateUrl={true} items={workTypeItems} />
					</Box>
					<Box width={{ base: "full", md: "2/12" }}>
						<SelectBox name="jobType" label="Job Type" updateUrl={true} items={jobTypeItems} />
					</Box>
					<Box width={{ base: "full", md: "2/12" }}>
						<SelectBox name="compensation" label="Compensation" updateUrl={true} items={compensationItems} />
					</Box>
				</Stack>
			</Card.Body>
		</Card.Root>
	);
};
