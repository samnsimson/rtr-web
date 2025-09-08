import { SearchClient } from "@/lib/search-client";
import { useCallback, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface SearchProps {
	indexName: string;
}
export const useSearch = ({ indexName }: SearchProps) => {
	const [results, setResults] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const debouncedSearch = useDebouncedCallback(async (query: string, options: Record<string, any> = {}) => {
		const index = new SearchClient({ indexName });
		const results = await index.search(query, options);
		setResults(results);
	}, 300);

	const search = useCallback(
		async (query: string, options: Record<string, any> = {}) => {
			try {
				setLoading(true);
				setError(null);
				debouncedSearch(query, options);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Search failed");
				setResults([]);
			} finally {
				setLoading(false);
			}
		},
		[debouncedSearch],
	);

	const clear = useCallback(() => {
		setResults([]);
		setError(null);
	}, []);

	return { results, loading, error, search, clear };
};
