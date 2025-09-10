import { Card } from "@chakra-ui/react";
import { TableSkeleton } from "./ui/table-skeleton";
import { FC, PropsWithChildren } from "react";

interface JobListSuspenseProps extends PropsWithChildren {
	isLoading?: boolean;
}

export const JobListSuspense: FC<JobListSuspenseProps> = ({ children, isLoading }) => {
	if (!isLoading) return children;
	return (
		<Card.Root>
			<Card.Body padding={0}>
				<TableSkeleton rows={5} columns={10} />
			</Card.Body>
		</Card.Root>
	);
};
