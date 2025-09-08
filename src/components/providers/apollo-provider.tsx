"use client";
import { FC, PropsWithChildren } from "react";
import { ApolloNextAppProvider } from "@apollo/client-integration-nextjs";
import { makeClient } from "@/lib/apollo-wrapper";

export const ApolloProvider: FC<PropsWithChildren> = ({ children }) => {
	return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
};
