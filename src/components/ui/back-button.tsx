"use client";
import { Button, ButtonProps, Link, Text } from "@chakra-ui/react";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface BackButtonProps extends ButtonProps {
	label?: string;
}

export const BackButton = ({ label = undefined, ...props }: BackButtonProps) => {
	const router = useRouter();
	return (
		<Button as={Link} size={{ base: "md", md: "lg" }} onClick={() => router.back()} variant={"plain"} padding={0} {...props}>
			<ArrowLeftIcon />
			{label && <Text>{label}</Text>}
		</Button>
	);
};
