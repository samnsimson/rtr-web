import { Card } from "@chakra-ui/react";
import { TableSkeleton } from "./ui/table-skeleton";

export const JobListSuspense = () => {
	return (
		<Card.Root>
			<Card.Body padding={0}>
				<TableSkeleton rows={5} columns={10} />
			</Card.Body>
		</Card.Root>
	);
};
