"use client";
import { GridItem, SimpleGrid, Skeleton } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useMemo } from "react";

export const TemplateEditorDynamic = () => {
	const DynamicTemplateEditor = useMemo(() => {
		return dynamic(() => import("./template-editor").then((mod) => mod.TemplateEditor), {
			loading: () => (
				<SimpleGrid columns={{ base: 1, md: 4 }} gap={4}>
					<GridItem colSpan={{ base: 4, md: 1 }}>
						<Skeleton height={400} />
					</GridItem>
					<GridItem colSpan={{ base: 4, md: 3 }} spaceY={4}>
						<Skeleton height={184} />
						<Skeleton height={324} />
					</GridItem>
				</SimpleGrid>
			),
			ssr: false,
		});
	}, []);
	return <DynamicTemplateEditor />;
};
