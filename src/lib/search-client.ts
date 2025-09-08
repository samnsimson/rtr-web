import { Index, MeiliSearch, RecordAny } from "meilisearch";

export interface SearchClientProps {
	indexName: string;
}

export class SearchClient {
	private readonly index: Index<RecordAny>;

	constructor({ indexName }: SearchClientProps) {
		this.index = this.getIndex(indexName);
	}

	private readonly getSearchClient = () => {
		if (typeof window === "undefined") throw new Error("cannot access search client in server component");
		const host = process.env.NEXT_PUBLIC_MEILISEARCH_HOST;
		const apiKey = process.env.NEXT_PUBLIC_MEILISEARCH_SEARCH_KEY;
		if (!host) throw new Error("Meilisearch host is not defined");
		return new MeiliSearch({ host, apiKey });
	};

	private readonly getIndex = (indexName: string) => {
		const client = this.getSearchClient();
		if (!client) throw new Error("Unable to access search client");
		return client.index(indexName);
	};

	public readonly search = async (query: string, options: Record<string, any>) => {
		try {
			const searchResults = await this.index.search(query.trim(), { limit: 20, attributesToRetrieve: ["*"], attributesToHighlight: ["*"], ...options });
			return searchResults.hits;
		} catch (error: any) {
			console.log("🚀 ~ SearchClient ~ error:", error);
			throw new Error(error);
		}
	};
}
