"use client";
import { Show, For, Alert, Stack } from "@chakra-ui/react";
import { FC } from "react";

interface RtrFileUploadErrorProps {
	errors: Record<string, string>;
}

export const RtrFileUploadError: FC<RtrFileUploadErrorProps> = ({ errors = {} }) => {
	return (
		<Show when={Object.keys(errors).length > 0}>
			<Stack gap={2} width={"full"}>
				<For each={Object.entries(errors)}>
					{([field, message]) => (
						<Alert.Root key={field} variant={"surface"} status="error" rounded={"none"} borderBottomWidth={3} borderBottomColor={"red.600"}>
							<Alert.Indicator />
							<Alert.Content>
								<Alert.Title>{field}</Alert.Title>
								<Alert.Description>{message}</Alert.Description>
							</Alert.Content>
						</Alert.Root>
					)}
				</For>
			</Stack>
		</Show>
	);
};
