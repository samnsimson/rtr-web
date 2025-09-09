"use client";
import { HttpLink } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client-integration-nextjs";

export const makeClient = () => {
	return new ApolloClient({
		cache: new InMemoryCache(),
		link: new HttpLink({
			uri: "http://localhost:8000/graphql",
			fetchOptions: {
				credentials: "include",
				headers: { "Content-Type": "application/json" },
			},
		}),
	});
};
