import { HttpLink } from "@apollo/client";
import { registerApolloClient, ApolloClient, InMemoryCache } from "@apollo/client-integration-nextjs";
import { SetContextLink } from "@apollo/client/link/context";
import { auth } from "./auth";

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
	const authLink = new SetContextLink(async ({ headers }) => {
		const session = await auth();
		const accessToken = session?.accessToken;
		const authorization = accessToken ? `Bearer ${accessToken}` : undefined;
		return { headers: { ...headers, authorization } };
	});
	return new ApolloClient({
		cache: new InMemoryCache(),
		link: authLink.concat(
			new HttpLink({
				uri: process.env.GRAPHQL_ENDPOINT || "http://localhost:8000/graphql",
				fetchOptions: { credentials: "include", headers: { "Content-Type": "application/json" } },
			}),
		),
	});
});

// Public client for unauthenticated requests
export const { getClient: getPublicClient } = registerApolloClient(() => {
	const authLink = new SetContextLink(({ headers }) => ({ headers: { ...headers } }));
	return new ApolloClient({
		cache: new InMemoryCache(),
		link: authLink.concat(
			new HttpLink({
				uri: process.env.GRAPHQL_ENDPOINT || "http://localhost:8000/graphql",
				fetchOptions: { credentials: "include", headers: { "Content-Type": "application/json" } },
			}),
		),
	});
});
