"use client";
import { DataList, Heading, GridItem } from "@chakra-ui/react";
import { JobDetailQuery } from "@/graphql/generated/graphql";
import { FC } from "react";
import { AsyncValue } from "./rtr-async-text";

interface RTRPreviewJobInfoProps {
	job?: JobDetailQuery["job"];
	loading?: boolean;
}

export const RtrPreviewJobInfo: FC<RTRPreviewJobInfoProps> = ({ job, loading = false }) => {
	return (
		<GridItem spaceY={4}>
			<Heading size={"md"}>Job Information</Heading>
			<DataList.Root orientation={"horizontal"} gap={2}>
				<DataList.Item>
					<DataList.ItemLabel>Title:</DataList.ItemLabel>
					<AsyncValue as={DataList.ItemValue} loading={loading}>
						{job?.title}
					</AsyncValue>
				</DataList.Item>
				<DataList.Item>
					<DataList.ItemLabel>Company:</DataList.ItemLabel>
					<AsyncValue as={DataList.ItemValue} loading={loading}>
						{job?.company}
					</AsyncValue>
				</DataList.Item>
				<DataList.Item>
					<DataList.ItemLabel>Type:</DataList.ItemLabel>
					<AsyncValue as={DataList.ItemValue} loading={loading}>
						{job?.workType}
					</AsyncValue>
				</DataList.Item>
			</DataList.Root>
		</GridItem>
	);
};
