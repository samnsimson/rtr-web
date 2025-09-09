"use client";
import { FC, PropsWithChildren } from "react";
import { SessionProvider } from "./session-provider";
import { ApolloProvider } from "./apollo-provider";
import { Session } from "next-auth";

interface AppProvidersProps extends PropsWithChildren {
	session: Session | null;
}

export const AppProviders: FC<AppProvidersProps> = ({ children, session }) => {
	return (
		<SessionProvider>
			<ApolloProvider session={session}>{children}</ApolloProvider>
		</SessionProvider>
	);
};
