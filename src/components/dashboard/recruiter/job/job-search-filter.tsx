"use client";
import { SelectBox } from "@/components/ui/select-box";
import { useParamSearch } from "@/hooks/user-search-params";
import { CardRootProps, createListCollection, Field, Input, InputGroup, Stack } from "@chakra-ui/react";
import { ChangeEvent, FC } from "react";
import { BiSearch } from "react-icons/bi";
import { WorkType, JobType, CompensationType } from "@/graphql/generated/graphql";
import { AppCard } from "@/components/ui/app-card";

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
		<AppCard title="Filter" description="Filter jobs by various criteria" {...props}>
			<Stack gap={4}>
				<Field.Root id="job-search">
					<Field.Label>Search</Field.Label>
					<InputGroup startElement={<BiSearch size={16} />}>
						<Input type="text" placeholder="Search for jobs..." size={"lg"} bgColor={"bg.card"} onChange={handleChange} />
					</InputGroup>
				</Field.Root>
				<SelectBox name="workType" label="Work Type" updateUrl={true} collection={createListCollection({ items: workTypeItems })} />
				<SelectBox name="jobType" label="Job Type" updateUrl={true} collection={createListCollection({ items: jobTypeItems })} />
				<SelectBox name="compensation" label="Compensation" updateUrl={true} collection={createListCollection({ items: compensationItems })} />
			</Stack>
		</AppCard>
	);
};
