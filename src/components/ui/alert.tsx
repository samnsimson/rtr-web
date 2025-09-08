"use client";
import { Alert as ChakraAlert } from "@chakra-ui/react";
import { ReactNode } from "react";

type AlertStatus = "info" | "warning" | "error" | "success";

interface AlertProps {
	status: AlertStatus;
	title?: string;
	description?: string | ReactNode;
	children?: ReactNode;
	onClose?: () => void;
	closable?: boolean;
}

export const AlertDialog: React.FC<AlertProps> = ({ status, title, description, children }) => {
	return (
		<ChakraAlert.Root variant={"surface"} status={status} rounded="lg">
			<ChakraAlert.Indicator />
			<ChakraAlert.Content>
				{title && <ChakraAlert.Title>{title}</ChakraAlert.Title>}
				{description && <ChakraAlert.Description>{description}</ChakraAlert.Description>}
				{children}
			</ChakraAlert.Content>
		</ChakraAlert.Root>
	);
};
