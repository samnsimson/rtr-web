"use client";
import { FC, PropsWithChildren } from "react";
import { ApolloNextAppProvider } from "@apollo/client-integration-nextjs";
import { makeClient } from "@/lib/apollo-wrapper";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

interface ApolloProviderProps extends PropsWithChildren {
	session: Session | null;
}

export const ApolloProvider: FC<ApolloProviderProps> = ({ children, session }) => {
	const { data: clientSession } = useSession();
	session = session || clientSession;
	return <ApolloNextAppProvider makeClient={makeClient(session)}>{children}</ApolloNextAppProvider>;
};
