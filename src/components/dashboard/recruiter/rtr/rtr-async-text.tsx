import { Box, Skeleton } from "@chakra-ui/react";
import { FC } from "react";

type AsyncValuePropsBase = {
	loading: boolean;
	as: React.ElementType;
	height?: string | number;
	width?: string | number;
	skeletonLines?: number;
};

type AsyncValuePropsWithHtml = AsyncValuePropsBase & {
	html: string;
	children?: never;
};

type AsyncValuePropsWithChildren = AsyncValuePropsBase & {
	html?: undefined;
	children: React.ReactNode;
};

type AsyncValueProps = AsyncValuePropsWithHtml | AsyncValuePropsWithChildren;

export const AsyncValue: FC<AsyncValueProps> = ({ children, loading = false, as: Component, skeletonLines = 1, height = "4", width = "full", html }) => {
	if (loading)
		return (
			<Box spaceY={2} width={width}>
				{Array.from({ length: skeletonLines }).map((_, index) => (
					<Skeleton key={index} height={height} width={"full"} />
				))}
			</Box>
		);
	if (html) return <Component dangerouslySetInnerHTML={{ __html: html }} />;
	else if (children) return <Component>{children}</Component>;
	else return <Component>No data!</Component>;
};
