"use client";
import { HttpLink } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client-integration-nextjs";
import { SetContextLink } from "@apollo/client/link/context";
import { Session } from "next-auth";

export const makeClient = (session: Session | null) => {
	return () => {
		const authLink = new SetContextLink(({ headers }) => {
			const accessToken = session?.accessToken;
			return { headers: { ...headers, authorization: accessToken ? `Bearer ${accessToken}` : "" } };
		});
		return new ApolloClient({
			cache: new InMemoryCache(),
			link: authLink.concat(new HttpLink({ uri: "http://localhost:8000/graphql" })),
		});
	};
};
