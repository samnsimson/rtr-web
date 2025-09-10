"use client";
import { FC, PropsWithChildren, useId } from "react";
import { ApolloNextAppProvider } from "@apollo/client-integration-nextjs";
import { makeClient } from "@/lib/apollo-wrapper";

export const ApolloProvider: FC<PropsWithChildren> = ({ children }) => {
	const clientKey = useId();
	return (
		<ApolloNextAppProvider key={clientKey} makeClient={makeClient}>
			{children}
		</ApolloNextAppProvider>
	);
};
