import { Card, CardRootProps, Stack, HStack } from "@chakra-ui/react";
import { FC } from "react";

interface AppCardProps extends CardRootProps {
	title: string;
	description?: string;
	children: React.ReactNode;
	noPadding?: boolean;
	action?: React.ReactNode;
}

interface AppCardHeadlessProps extends CardRootProps {
	noPadding?: boolean;
	children: React.ReactNode;
}

export const AppCard: FC<AppCardProps> = ({ title, description, children, noPadding, action, ...props }) => {
	return (
		<Card.Root bgColor={"bg"} divideY={"1px"} divideColor={"border"} {...props}>
			<Card.Header padding={4} gap={0}>
				<HStack justify={"space-between"}>
					<Stack gap={0}>
						<Card.Title>{title}</Card.Title>
						{description && <Card.Description>{description}</Card.Description>}
					</Stack>
					{action}
				</HStack>
			</Card.Header>
			<Card.Body padding={noPadding ? 0 : 4}>{children}</Card.Body>
		</Card.Root>
	);
};

export const AppCardHeadless: FC<AppCardHeadlessProps> = ({ children, noPadding, ...props }) => {
	return (
		<Card.Root bgColor={"bg"} divideY={"1px"} divideColor={"border"} {...props}>
			<Card.Body padding={noPadding ? 0 : 4}>{children}</Card.Body>
		</Card.Root>
	);
};
