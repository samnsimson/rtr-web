interface ApiResponse<T = any> {
	data?: T;
	error?: string;
	message?: string;
	status?: number;
	errors?: Record<string, string>; // Add this for validation errors
}

interface ApiOptions {
	method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
	headers?: Record<string, string>;
	body?: any;
	params?: Record<string, string | number | boolean | undefined>;
}

class ApiService {
	private baseUrl: string;

	constructor() {
		this.baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
	}

	private async request<T>(endpoint: string, options: ApiOptions = {}): Promise<ApiResponse<T>> {
		const { method = "GET", headers = {}, body, params } = options;

		// Build URL with query parameters
		let url = `${this.baseUrl}${endpoint}`;
		if (params && Object.keys(params).length > 0) {
			const searchParams = new URLSearchParams();
			Object.entries(params).forEach(([key, value]) => {
				if (value !== undefined && value !== null) {
					searchParams.append(key, String(value));
				}
			});
			url += `?${searchParams.toString()}`;
		}

		// Prepare request options
		const requestOptions: RequestInit = {
			method,
			headers: {
				"Content-Type": "application/json",
				...headers,
			},
		};

		// Add body for non-GET requests
		if (body && method !== "GET") {
			requestOptions.body = JSON.stringify(body);
		}

		try {
			const response = await fetch(url, requestOptions);
			const responseData = await response.json();

			if (!response.ok) {
				return {
					error: responseData.error || responseData.message || "Request failed",
					status: response.status,
					errors: responseData.errors, // Explicitly preserve errors
					message: responseData.message,
				};
			}

			return {
				data: responseData,
				status: response.status,
			};
		} catch (error) {
			return {
				error: error instanceof Error ? error.message : "Network error",
				status: 500,
			};
		}
	}

	// Job-related API methods
	async createJob(jobData: any): Promise<ApiResponse<{ job: any; message: string }>> {
		return this.request("/api/recruiter/jobs", {
			method: "POST",
			body: jobData,
		});
	}

	async getJobs(params?: {
		page?: number;
		limit?: number;
		query?: string;
		workType?: string;
		jobType?: string;
		compensation?: string;
	}): Promise<ApiResponse<{ jobs: any[]; total: number; page: number; limit: number }>> {
		return this.request("/api/recruiter/jobs", {
			method: "GET",
			params,
		});
	}

	// RTR-related API methods
	async createRTR(rtrData: any): Promise<ApiResponse<{ rtr: any; message: string }>> {
		return this.request("/api/recruiter/rtr", {
			method: "POST",
			body: rtrData,
		});
	}

	async getRTRs(params?: { page?: number; limit?: number; query?: string; status?: string }): Promise<ApiResponse<{ rtrs: any[]; total: number; page: number; limit: number }>> {
		return this.request("/api/recruiter/rtr", {
			method: "GET",
			params,
		});
	}

	// Generic methods for other endpoints
	async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
		return this.request(endpoint, { method: "GET", params });
	}

	async post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
		return this.request(endpoint, { method: "POST", body });
	}

	async put<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
		return this.request(endpoint, { method: "PUT", body });
	}

	async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
		return this.request(endpoint, { method: "DELETE" });
	}

	async patch<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
		return this.request(endpoint, { method: "PATCH", body });
	}
}

// Export a singleton instance
export const api = new ApiService();

// Export the class for testing or custom instances
export { ApiService };
