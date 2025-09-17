import { Box, Skeleton } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

interface AsyncValueProps extends PropsWithChildren {
	loading: boolean;
	as: React.ElementType;
	height?: string | number;
	width?: string | number;
	skeletonLines?: number;
}

export const AsyncValue: FC<AsyncValueProps> = ({ children, loading = false, as: Component, skeletonLines = 1, height = "4", width = "full" }) => {
	if (loading)
		return (
			<Box spaceY={2} width={width}>
				{Array.from({ length: skeletonLines }).map((_, index) => (
					<Skeleton key={index} height={height} width={"full"} />
				))}
			</Box>
		);
	if (children) return <Component>{children}</Component>;
	return <Component>No data!</Component>;
};
