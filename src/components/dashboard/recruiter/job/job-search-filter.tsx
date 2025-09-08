"use client";
import { SelectBox } from "@/components/ui/select-box";
import { useParamSearch } from "@/hooks/user-search-params";
import { Box, Card, CardRootProps, Field, Input, InputGroup, Stack } from "@chakra-ui/react";
import { ChangeEvent, FC } from "react";
import { BiSearch } from "react-icons/bi";
import { WorkType, JobType, CompensationType } from "@prisma/client";

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
						<SelectBox
							label="Work Type"
							items={[
								{ label: "All", value: "" },
								{ label: "Remote", value: WorkType.REMOTE },
								{ label: "Hybrid", value: WorkType.HYBRID },
								{ label: "On Site", value: WorkType.ON_SITE },
							]}
							onValueChange={(e) => search("workType", e.value)}
						/>
					</Box>
					<Box width={{ base: "full", md: "2/12" }}>
						<SelectBox
							label="Job Type"
							items={[
								{ label: "All", value: "" },
								{ label: "Full Time", value: JobType.FULL_TIME },
								{ label: "Part Time", value: JobType.PART_TIME },
								{ label: "Contract", value: JobType.CONTRACT },
								{ label: "Internship", value: JobType.INTERNSHIP },
								{ label: "Freelance", value: JobType.FREELANCE },
							]}
							onValueChange={(e) => search("jobType", e.value)}
						/>
					</Box>
					<Box width={{ base: "full", md: "2/12" }}>
						<SelectBox
							label="Compensation"
							items={[
								{ label: "All", value: "" },
								{ label: "Salary", value: CompensationType.SALARY },
								{ label: "Hourly", value: CompensationType.HOURLY },
								{ label: "Project Based", value: CompensationType.PROJECT_BASED },
								{ label: "Commission", value: CompensationType.COMMISSION },
							]}
							onValueChange={(e) => search("compensation", e.value)}
						/>
					</Box>
				</Stack>
			</Card.Body>
		</Card.Root>
	);
};
