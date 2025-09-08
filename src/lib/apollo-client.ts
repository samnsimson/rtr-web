import { HttpLink } from "@apollo/client";
import { registerApolloClient, ApolloClient, InMemoryCache } from "@apollo/client-integration-nextjs";
import { auth } from "./auth";

export const { getClient, query, PreloadQuery } = registerApolloClient(async () => {
	const session = await auth();
	const accessToken = session?.accessToken;
	return new ApolloClient({
		cache: new InMemoryCache(),
		link: new HttpLink({
			uri: process.env.GRAPHQL_ENDPOINT || "http://localhost:8000/graphql",
			fetchOptions: {
				credentials: "include",
				headers: { "Content-Type": "application/json", ...(accessToken && { Authorization: `Bearer ${accessToken}` }) },
			},
		}),
	});
});
