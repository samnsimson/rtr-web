import { ZodSchema, ZodError } from "zod";

export type ValidationResult<T> = {
	data: T | null;
	error: string | null;
};

/**
 * Validates data against a Zod schema
 * @param schema - The Zod schema to validate against
 * @param data - The data to validate
 * @returns ValidationResult with either validated data or error message
 */
export function validateZod<T>(schema: ZodSchema<T>, data: unknown): ValidationResult<T> {
	try {
		const result = schema.parse(data);
		return { data: result, error: null };
	} catch (error) {
		console.log("🚀 ~ validateZod ~ error:", error);
		if (error instanceof ZodError) {
			const errorMessages = error.issues.map((issue) => {
				const path = issue.path.length > 0 ? issue.path.join(".") : "root";
				return `${path}: ${issue.message}`;
			});
			return { data: null, error: errorMessages.join("; ") };
		}

		// Handle unexpected errors
		return {
			data: null,
			error: "Validation failed with unexpected error",
		};
	}
}

/**
 * Validates data against a Zod schema using safeParse (non-throwing)
 * @param schema - The Zod schema to validate against
 * @param data - The data to validate
 * @returns ValidationResult with either validated data or error message
 */
export function validateZodSafe<T>(schema: ZodSchema<T>, data: unknown): ValidationResult<T> {
	const result = schema.safeParse(data);

	if (result.success) {
		return {
			data: result.data,
			error: null,
		};
	} else {
		// Format Zod validation errors into a readable message
		const errorMessages = result.error.issues.map((issue) => {
			const path = issue.path.length > 0 ? issue.path.join(".") : "root";
			return `${path}: ${issue.message}`;
		});

		return {
			data: null,
			error: errorMessages.join("; "),
		};
	}
}

/**
 * Creates a validation error response for Next.js API routes
 * @param error - The validation error message
 * @param status - HTTP status code (default: 400)
 * @returns NextResponse with validation error
 */
export function createValidationErrorResponse(error: string, status: number = 400) {
	// Parse the error string to create a structured response
	const errorParts = error.split("; ");
	const errors: Record<string, string> = {};

	errorParts.forEach((part) => {
		const [field, message] = part.split(": ");
		if (field && message) {
			errors[field] = message;
		}
	});

	return {
		error: "Validation failed",
		errors,
		status,
	};
}

/**
 * Validates and transforms data with custom error handling
 * @param schema - The Zod schema to validate against
 * @param data - The data to validate
 * @param transformFn - Optional function to transform the validated data
 * @returns ValidationResult with either transformed data or error message
 */
export function validateAndTransform<T, R = T>(schema: ZodSchema<T>, data: unknown, transformFn?: (data: T) => R): ValidationResult<R> {
	const validation = validateZod(schema, data);

	if (validation.error) {
		return {
			data: null,
			error: validation.error,
		};
	}

	if (transformFn && validation.data) {
		try {
			const transformed = transformFn(validation.data);
			return {
				data: transformed,
				error: null,
			};
		} catch (error) {
			return {
				data: null,
				error: `Transformation failed: ${error instanceof Error ? error.message : "Unknown error"}`,
			};
		}
	}

	return validation as unknown as ValidationResult<R>;
}
