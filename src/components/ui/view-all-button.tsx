"use client";
import { Button, ButtonProps } from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";
import { LuArrowRight } from "react-icons/lu";

interface ViewAllButtonProps extends ButtonProps {
	href: string;
}

export const ViewAllButton: FC<ViewAllButtonProps> = ({ href, ...props }) => {
	return (
		<Button variant={"plain"} colorPalette={"blue"} asChild {...props}>
			<Link href={href as any}>
				View All <LuArrowRight />
			</Link>
		</Button>
	);
};
