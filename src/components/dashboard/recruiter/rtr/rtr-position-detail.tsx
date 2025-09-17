"use client";
import { SelectBox, SelectBoxItem } from "@/components/ui/select-box";
import { ListJobsDocument } from "@/graphql/generated/graphql";
import { useRtrForm } from "@/store/useRtrForm";
import { useQuery } from "@apollo/client/react";
import { Link, Card, HStack, useListCollection } from "@chakra-ui/react";
import { ArrowRightIcon } from "lucide-react";
import NextLink from "next/link";
import { Suspense, useEffect } from "react";

export const RtrPositionDetails = () => {
	const { updateField } = useRtrForm();
	const { data, loading } = useQuery(ListJobsDocument, { variables: { filters: { page: 1, limit: 10 } } });
	const { collection, set } = useListCollection<SelectBoxItem>({ initialItems: [], itemToString: (item) => item.name, itemToValue: (item) => item.value });

	useEffect(() => {
		if (data?.jobs?.data) set(data.jobs.data.map((job) => ({ name: job.title, value: job.id })));
	}, [data, set]);

	return (
		<Card.Root bgColor={"bg"} divideY={"1px"} divideColor={"border"}>
			<Card.Header padding={4} gap={0}>
				<HStack justify={"space-between"}>
					<Card.Title>Position Information</Card.Title>
					<Link asChild colorPalette={"yellow"} fontSize={"sm"}>
						<NextLink href={"/recruiter/job/create"}>
							Create a new job
							<ArrowRightIcon size={16} />
						</NextLink>
					</Link>
				</HStack>
				<Card.Description>Details about the role and company</Card.Description>
			</Card.Header>
			<Card.Body gap={6}>
				<Suspense>
					<SelectBox
						name="jobId"
						label="Choose a job from the list"
						collection={collection}
						loading={loading}
						onValueChange={(e) => updateField("jobId", e.value.pop() ?? "")}
					/>
				</Suspense>
			</Card.Body>
		</Card.Root>
	);
};
