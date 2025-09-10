"use client";
import { ButtonGroup, IconButton, Pagination, PaginationRootProps } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

interface PaginationComponentProps extends PaginationRootProps {
	limit: number;
}

export const PaginationComponent: FC<PaginationComponentProps> = ({ count, limit = 10, page = 1, ...props }) => {
	const router = useRouter();

	const handlePageChange = (page: number) => {
		router.push(`?page=${page}`);
	};

	return (
		<Pagination.Root count={count} pageSize={limit} page={page} {...props}>
			<ButtonGroup variant="ghost" size="sm" wrap="wrap">
				<Pagination.PrevTrigger asChild>
					<IconButton rounded={"full"} colorPalette={"white"}>
						<LuChevronLeft />
					</IconButton>
				</Pagination.PrevTrigger>

				<Pagination.Items
					render={(page) => (
						<IconButton variant={{ base: "ghost", _selected: "solid" }} colorPalette={"white"} rounded={"full"} onClick={() => handlePageChange(page.value)}>
							{page.value}
						</IconButton>
					)}
				/>

				<Pagination.NextTrigger asChild>
					<IconButton rounded={"full"} colorPalette={"white"}>
						<LuChevronRight />
					</IconButton>
				</Pagination.NextTrigger>
			</ButtonGroup>
		</Pagination.Root>
	);
};
