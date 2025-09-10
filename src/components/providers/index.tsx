"use client";
import { FC, PropsWithChildren } from "react";
import { SessionProvider } from "./session-provider";
import { ApolloProvider } from "./apollo-provider";

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
	return (
		<SessionProvider>
			<ApolloProvider>{children}</ApolloProvider>
		</SessionProvider>
	);
};
