"use client";
import { Skeleton, Table } from "@chakra-ui/react";

interface TableSkeletonProps {
	rows?: number;
	columns?: number;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({ rows = 5, columns = 10 }) => {
	return (
		<Table.Root>
			<Table.Body>
				{Array.from({ length: rows }).map((_, rowIndex) => (
					<Table.Row key={rowIndex}>
						{Array.from({ length: columns }).map((_, colIndex) => (
							<Table.Cell key={colIndex}>
								<Skeleton height="24px" width={colIndex === 0 ? "150px" : "80px"} />
							</Table.Cell>
						))}
					</Table.Row>
				))}
			</Table.Body>
		</Table.Root>
	);
};
