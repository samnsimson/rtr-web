module.exports = {
	overwrite: true,
	schema: "http://localhost:8000/graphql",
	documents: ["src/graphql/**/*.graphql"],
	generates: {
		"src/graphql/generated/graphql.ts": {
			plugins: ["typescript", "typescript-operations", "typescript-react-apollo"],
		},
	},
};
