import { FC, PropsWithChildren } from "react";
import { SessionProvider } from "./session-provider";
import { ApolloProvider } from "./apollo-provider";

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div>
			<ApolloProvider>
				<SessionProvider>{children}</SessionProvider>
			</ApolloProvider>
		</div>
	);
};
