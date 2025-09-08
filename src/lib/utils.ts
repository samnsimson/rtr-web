/**
 * Removes undefined values from an object
 * @param obj - The object to clean
 * @returns A new object with undefined values removed
 */
export function removeUndefinedValues<T extends Record<string, any>>(obj: T): Partial<T> {
	const cleaned: Partial<T> = {};
	Object.keys(obj).forEach((key) => {
		if (obj[key as keyof T] !== undefined) {
			cleaned[key as keyof T] = obj[key as keyof T];
		}
	});
	return cleaned;
}
