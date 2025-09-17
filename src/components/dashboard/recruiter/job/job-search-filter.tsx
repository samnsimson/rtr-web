"use client";
import { SelectBox } from "@/components/ui/select-box";
import { useParamSearch } from "@/hooks/user-search-params";
import { Box, Card, CardRootProps, createListCollection, Field, Input, InputGroup, Stack } from "@chakra-ui/react";
import { ChangeEvent, FC } from "react";
import { BiSearch } from "react-icons/bi";
import { WorkType, JobType, CompensationType } from "@/graphql/generated/graphql";

type JobSearchFilterProps = CardRootProps;

const workTypeItems = [
	{ name: "All", value: "" },
	{ name: "Remote", value: WorkType.Remote },
	{ name: "Hybrid", value: WorkType.Hybrid },
	{ name: "On Site", value: WorkType.OnSite },
];

const jobTypeItems = [
	{ name: "All", value: "" },
	{ name: "Full Time", value: JobType.FullTime },
	{ name: "Part Time", value: JobType.PartTime },
	{ name: "Contract", value: JobType.Contract },
	{ name: "Internship", value: JobType.Internship },
	{ name: "Freelance", value: JobType.Freelance },
];

const compensationItems = [
	{ name: "All", value: "" },
	{ name: "Salary", value: CompensationType.Salary },
	{ name: "Hourly", value: CompensationType.Hourly },
	{ name: "Project Based", value: CompensationType.ProjectBased },
	{ name: "Commission", value: CompensationType.Commission },
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
						<SelectBox name="workType" label="Work Type" updateUrl={true} collection={createListCollection({ items: workTypeItems })} />
					</Box>
					<Box width={{ base: "full", md: "2/12" }}>
						<SelectBox name="jobType" label="Job Type" updateUrl={true} collection={createListCollection({ items: jobTypeItems })} />
					</Box>
					<Box width={{ base: "full", md: "2/12" }}>
						<SelectBox name="compensation" label="Compensation" updateUrl={true} collection={createListCollection({ items: compensationItems })} />
					</Box>
				</Stack>
			</Card.Body>
		</Card.Root>
	);
};
