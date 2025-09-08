"use client";
import { Alert, For, List, Text } from "@chakra-ui/react";

interface ValidationAlertProps {
	errors: Record<string, string>;
	title?: string;
}

export const ValidationAlert: React.FC<ValidationAlertProps> = ({ errors, title = "Please fix the following errors:" }) => {
	if (Object.keys(errors).length === 0) return null;

	return (
		<Alert.Root variant={"surface"} status="error" rounded="lg">
			<Alert.Indicator />
			<Alert.Content>
				<Alert.Title>{title}</Alert.Title>
				<Alert.Description>
					<List.Root listStyle={"none"}>
						<For each={Object.entries(errors)}>
							{([field, message]) => (
								<List.Item key={field}>
									<Text fontSize="sm" color={"text"}>
										<strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong> {message}
									</Text>
								</List.Item>
							)}
						</For>
					</List.Root>
				</Alert.Description>
			</Alert.Content>
		</Alert.Root>
	);
};
