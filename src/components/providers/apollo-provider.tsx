"use client";
import { FC, PropsWithChildren } from "react";
import { ApolloNextAppProvider } from "@apollo/client-integration-nextjs";
import { makeClient } from "@/lib/apollo-wrapper";
import { Session } from "next-auth";

interface ApolloProviderProps extends PropsWithChildren {
	session: Session | null;
}

export const ApolloProvider: FC<ApolloProviderProps> = ({ children, session }) => {
	return <ApolloNextAppProvider makeClient={makeClient(session)}>{children}</ApolloNextAppProvider>;
};
