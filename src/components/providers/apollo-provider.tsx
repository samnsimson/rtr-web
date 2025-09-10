"use client";
import { FC, PropsWithChildren } from "react";
import { ApolloNextAppProvider } from "@apollo/client-integration-nextjs";
import { makeClient } from "@/lib/apollo-wrapper";
import { useSession } from "next-auth/react";

export const ApolloProvider: FC<PropsWithChildren> = ({ children }) => {
	const { data: session } = useSession({ required: true });
	return <ApolloNextAppProvider makeClient={makeClient(session)}>{children}</ApolloNextAppProvider>;
};
