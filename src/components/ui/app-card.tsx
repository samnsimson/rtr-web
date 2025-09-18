import { Card, CardRootProps } from "@chakra-ui/react";
import { FC } from "react";

interface AppCardProps extends CardRootProps {
	title: string;
	description?: string;
	children: React.ReactNode;
	noPadding?: boolean;
}

export const AppCard: FC<AppCardProps> = ({ title, description, children, noPadding, ...props }) => {
	return (
		<Card.Root bgColor={"bg"} divideY={"1px"} divideColor={"border"} {...props}>
			<Card.Header padding={4} gap={0}>
				<Card.Title>{title}</Card.Title>
				{description && <Card.Description>{description}</Card.Description>}
			</Card.Header>
			<Card.Body padding={noPadding ? 0 : 4}>{children}</Card.Body>
		</Card.Root>
	);
};

export const AppCardHeadless: FC<CardRootProps> = ({ children, ...props }) => {
	return (
		<Card.Root bgColor={"bg"} divideY={"1px"} divideColor={"border"} {...props}>
			<Card.Body>{children}</Card.Body>
		</Card.Root>
	);
};
