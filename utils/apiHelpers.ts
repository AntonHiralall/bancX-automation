import { APIRequestContext, APIResponse } from '@playwright/test';
import { ENV } from '../config/env';

export interface ApiRequestOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: Record<string, string>;
    data?: any;
    params?: Record<string, string>;
    timeout?: number;
}

export interface ApiResponse {
    status: number;
    headers: Record<string, string>;
    body: any;
    ok: boolean;
}

export class ApiHelpers {
    private request: APIRequestContext;
    private baseUrl: string;
    private defaultHeaders: Record<string, string>;

    constructor(request: APIRequestContext, baseUrl: string = ENV.BASE_URL) {
        this.request = request;
        this.baseUrl = baseUrl;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
    }

    /**
     * Make an API request with standardized error handling
     */
    async makeRequest(endpoint: string, options: ApiRequestOptions = {}): Promise<ApiResponse> {
        const url = this.buildUrl(endpoint, options.params);
        const headers = { ...this.defaultHeaders, ...options.headers };
        
        try {
            const response = await this.request[options.method?.toLowerCase() || 'get'](url, {
                headers,
                data: options.data,
                timeout: options.timeout || 30000,
            });

            return this.formatResponse(response);
        } catch (error) {
            console.error(`API request failed: ${error.message}`);
            throw error;
        }
    }

    /**
     * GET request helper
     */
    async get(endpoint: string, options: Omit<ApiRequestOptions, 'method'> = {}): Promise<ApiResponse> {
        return this.makeRequest(endpoint, { ...options, method: 'GET' });
    }

    /**
     * POST request helper
     */
    async post(endpoint: string, data: any, options: Omit<ApiRequestOptions, 'method' | 'data'> = {}): Promise<ApiResponse> {
        return this.makeRequest(endpoint, { ...options, method: 'POST', data });
    }

    /**
     * PUT request helper
     */
    async put(endpoint: string, data: any, options: Omit<ApiRequestOptions, 'method' | 'data'> = {}): Promise<ApiResponse> {
        return this.makeRequest(endpoint, { ...options, method: 'PUT', data });
    }

    /**
     * DELETE request helper
     */
    async delete(endpoint: string, options: Omit<ApiRequestOptions, 'method'> = {}): Promise<ApiResponse> {
        return this.makeRequest(endpoint, { ...options, method: 'DELETE' });
    }

    /**
     * PATCH request helper
     */
    async patch(endpoint: string, data: any, options: Omit<ApiRequestOptions, 'method' | 'data'> = {}): Promise<ApiResponse> {
        return this.makeRequest(endpoint, { ...options, method: 'PATCH', data });
    }

    /**
     * Build URL with query parameters
     */
    private buildUrl(endpoint: string, params?: Record<string, string>): string {
        const url = new URL(endpoint, this.baseUrl);
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                url.searchParams.append(key, value);
            });
        }
        return url.toString();
    }

    /**
     * Format Playwright API response to our standard format
     */
    private async formatResponse(response: APIResponse): Promise<ApiResponse> {
        let body;
        try {
            body = await response.json();
        } catch {
            body = await response.text();
        }

        return {
            status: response.status(),
            headers: response.headers(),
            body,
            ok: response.ok(),
        };
    }

    /**
     * Set authentication token for subsequent requests
     */
    setAuthToken(token: string): void {
        this.defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    /**
     * Clear authentication token
     */
    clearAuthToken(): void {
        delete this.defaultHeaders['Authorization'];
    }

    /**
     * Add custom header
     */
    addHeader(key: string, value: string): void {
        this.defaultHeaders[key] = value;
    }

    /**
     * Remove custom header
     */
    removeHeader(key: string): void {
        delete this.defaultHeaders[key];
    }
} 