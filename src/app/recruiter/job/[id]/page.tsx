import { JobBenefitsCard } from "@/components/dashboard/recruiter/job/job-benefits-card";
import { JobDescriptionCard } from "@/components/dashboard/recruiter/job/job-description-card";
import { JobDetailHeader } from "@/components/dashboard/recruiter/job/job-detail-header";
import { JobInfoCard } from "@/components/dashboard/recruiter/job/job-info-card";
import { JobRequirementCard } from "@/components/dashboard/recruiter/job/job-requirement-card";
import { api } from "@/lib/api";
import { GridItem, SimpleGrid, Stack } from "@chakra-ui/react";

const JobViewPage = async (props: PageProps<"/recruiter/job/[id]">) => {
	const { id } = await props.params;
	const jobData = await api.getJobDetail(id);

	return (
		<Stack padding={4} gap={4}>
			<JobDetailHeader />
			<SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
				<GridItem>
					<JobInfoCard job={jobData} />
				</GridItem>
				<GridItem>
					<JobInfoCard job={jobData} />
				</GridItem>
			</SimpleGrid>
			<JobDescriptionCard job={jobData} />
			<JobRequirementCard job={jobData} />
			<JobBenefitsCard job={jobData} />
		</Stack>
	);
};

export default JobViewPage;
