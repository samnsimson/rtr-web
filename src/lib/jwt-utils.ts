/**
 * JWT utility functions for handling token expiry
 */

interface JWTPayload {
	exp?: number;
	iat?: number;
	sub?: string;
	[key: string]: any;
}

/**
 * Decode JWT token without verification (client-side only)
 * @param token JWT token string
 * @returns Decoded payload or null if invalid
 */
export function decodeJWT(token: string): JWTPayload | null {
	try {
		const parts = token.split(".");
		if (parts.length !== 3) return null;
		const payload = parts[1];
		const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
		return JSON.parse(decoded);
	} catch (error) {
		console.error("Failed to decode JWT:", error);
		return null;
	}
}

/**
 * Check if a JWT token is expired
 * @param token JWT token string
 * @returns true if expired, false if valid
 */
export function isTokenExpired(token: string): boolean {
	const payload = decodeJWT(token);
	if (!payload || !payload.exp) return true;
	const currentTime = Math.floor(Date.now() / 1000);
	return payload.exp < currentTime;
}

/**
 * Check if a token will expire within the next N minutes
 * @param token JWT token string
 * @param minutes Number of minutes to check ahead (default: 5)
 * @returns true if token expires within the specified time
 */
export function isTokenExpiringSoon(token: string, minutes: number = 5): boolean {
	const payload = decodeJWT(token);
	if (!payload || !payload.exp) return true;
	const currentTime = Math.floor(Date.now() / 1000);
	const expiryTime = payload.exp;
	const bufferTime = minutes * 60; // Convert minutes to seconds
	return expiryTime - currentTime <= bufferTime;
}

/**
 * Get time until token expires in seconds
 * @param token JWT token string
 * @returns Seconds until expiry or 0 if expired/invalid
 */
export function getTimeUntilExpiry(token: string): number {
	const payload = decodeJWT(token);
	if (!payload || !payload.exp) return 0;
	const currentTime = Math.floor(Date.now() / 1000);
	const timeUntilExpiry = payload.exp - currentTime;
	return Math.max(0, timeUntilExpiry);
}
