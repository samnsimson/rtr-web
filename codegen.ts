import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	overwrite: true,
	schema: "http://localhost:8000/graphql",
	documents: ["src/graphql/**/*.graphql"],
	generates: {
		"src/graphql/generated/graphql.ts": {
			plugins: ["typescript", "typescript-operations", "typed-document-node"],
		},
	},
};

export default config;
