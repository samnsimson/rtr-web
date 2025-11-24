"use client";
import { HttpLink } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client-integration-nextjs";
import { SetContextLink } from "@apollo/client/link/context";
import { getSession } from "next-auth/react";

export const makeClient = () => {
	const authLink = new SetContextLink(async ({ headers }) => {
		const clientSession = await getSession();
		const accessToken = clientSession?.accessToken;
		const authorization = accessToken ? `Bearer ${accessToken}` : "";
		return { headers: { ...headers, authorization } };
	});
	return new ApolloClient({
		cache: new InMemoryCache(),
		link: authLink.concat(new HttpLink({ uri: `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}/graphql` })),
	});
};
