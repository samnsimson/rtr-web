"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useCallback } from "react";
import qs from "qs";

export const useParamSearch = () => {
	const router = useRouter();
	const searchparams = useSearchParams();
	const currentParams = qs.parse(searchparams.toString());

	const search = useCallback(
		(key: string, value: any) => {
			const params = qs.parse(searchparams.toString());
			if (value !== null && value !== undefined && value !== "") params[key] = value;
			else delete params[key];
			const queryString = qs.stringify(params, { arrayFormat: "comma", encode: false, skipNulls: true });
			router.push(`?${queryString}`, { scroll: false });
		},
		[router, searchparams],
	);

	const removeParam = useCallback(
		(key: string) => {
			const params = qs.parse(searchparams.toString());
			delete params[key];
			const queryString = qs.stringify(params, { arrayFormat: "comma", encode: false, skipNulls: true });
			router.push(`?${queryString}`, { scroll: false });
		},
		[router, searchparams],
	);

	const searchDebounced = useDebouncedCallback(search, 300);
	const getParam = useCallback((key: string): any => currentParams[key] || "", [currentParams]);
	const getAllParams = useCallback((): Record<string, any> => currentParams, [currentParams]);
	const clearAllParams = useCallback(() => router.push("?", { scroll: false }), [router]);

	return {
		search,
		searchDebounced,
		getParam,
		getAllParams,
		removeParam,
		clearAllParams,
		searchParams: currentParams,
	};
};
