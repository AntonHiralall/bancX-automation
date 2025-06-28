import { ApiHelpers, ApiResponse } from '../../utils/apiHelpers';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: {
        id: string;
        email: string;
        name: string;
    };
}

export class AuthApi {
    private api: ApiHelpers;

    constructor(api: ApiHelpers) {
        this.api = api;
    }

    /**
     * Login user and return authentication token
     */
    async login(credentials: LoginCredentials): Promise<LoginResponse> {
        const response = await this.api.post('/api/auth/login', credentials);
        
        if (!response.ok) {
            throw new Error(`Login failed: ${response.status} - ${JSON.stringify(response.body)}`);
        }

        // Set the auth token for subsequent requests
        this.api.setAuthToken(response.body.token);
        
        return response.body;
    }

    /**
     * Logout user
     */
    async logout(): Promise<void> {
        try {
            await this.api.post('/api/auth/logout', {});
        } finally {
            // Always clear the auth token
            this.api.clearAuthToken();
        }
    }

    /**
     * Refresh authentication token
     */
    async refreshToken(): Promise<LoginResponse> {
        const response = await this.api.post('/api/auth/refresh', {});
        
        if (!response.ok) {
            throw new Error(`Token refresh failed: ${response.status}`);
        }

        this.api.setAuthToken(response.body.token);
        return response.body;
    }

    /**
     * Get current user profile
     */
    async getCurrentUser(): Promise<any> {
        const response = await this.api.get('/api/auth/me');
        
        if (!response.ok) {
            throw new Error(`Failed to get user profile: ${response.status}`);
        }

        return response.body;
    }

    /**
     * Check if user is authenticated
     */
    async isAuthenticated(): Promise<boolean> {
        try {
            await this.getCurrentUser();
            return true;
        } catch {
            return false;
        }
    }
} 