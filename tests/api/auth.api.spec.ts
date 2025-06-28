import { test, expect } from '@playwright/test';
import { ApiHelpers } from '../../utils/apiHelpers';
import { AuthApi, LoginCredentials } from '../../pages/api/AuthApi';
import { ENV } from '../../config/env';

test.describe('Authentication API', () => {
    let apiHelpers: ApiHelpers;
    let authApi: AuthApi;

    test.beforeEach(async ({ request }) => {
        apiHelpers = new ApiHelpers(request, ENV.BASE_URL);
        authApi = new AuthApi(apiHelpers);
    });

    test('Login with valid credentials', async () => {
        const credentials: LoginCredentials = {
            email: ENV.CREDENTIALS.USERNAME,
            password: ENV.CREDENTIALS.PASSWORD
        };

        await test.step('Login with valid credentials', async () => {
            const response = await authApi.login(credentials);
            
            expect(response.token).toBeDefined();
            expect(response.user.email).toBe(credentials.email);
            expect(response.user.id).toBeDefined();
        });

        await test.step('Verify user is authenticated', async () => {
            const isAuthenticated = await authApi.isAuthenticated();
            expect(isAuthenticated).toBe(true);
        });
    });

    test('Login with invalid credentials should fail', async () => {
        const invalidCredentials: LoginCredentials = {
            email: 'invalid@example.com',
            password: 'wrongpassword'
        };

        await test.step('Attempt login with invalid credentials', async () => {
            await expect(async () => {
                await authApi.login(invalidCredentials);
            }).rejects.toThrow('Login failed');
        });
    });

    test('Get current user profile when authenticated', async () => {
        // First login
        const credentials: LoginCredentials = {
            email: ENV.CREDENTIALS.USERNAME,
            password: ENV.CREDENTIALS.PASSWORD
        };
        await authApi.login(credentials);

        await test.step('Get current user profile', async () => {
            const userProfile = await authApi.getCurrentUser();
            
            expect(userProfile).toBeDefined();
            expect(userProfile.email).toBe(credentials.email);
            expect(userProfile.id).toBeDefined();
        });
    });

    test('Logout should clear authentication', async () => {
        // First login
        const credentials: LoginCredentials = {
            email: ENV.CREDENTIALS.USERNAME,
            password: ENV.CREDENTIALS.PASSWORD
        };
        await authApi.login(credentials);

        await test.step('Verify user is authenticated', async () => {
            const isAuthenticated = await authApi.isAuthenticated();
            expect(isAuthenticated).toBe(true);
        });

        await test.step('Logout user', async () => {
            await authApi.logout();
        });

        await test.step('Verify user is no longer authenticated', async () => {
            const isAuthenticated = await authApi.isAuthenticated();
            expect(isAuthenticated).toBe(false);
        });
    });

    test('Refresh token should work', async () => {
        // First login
        const credentials: LoginCredentials = {
            email: ENV.CREDENTIALS.USERNAME,
            password: ENV.CREDENTIALS.PASSWORD
        };
        const loginResponse = await authApi.login(credentials);

        await test.step('Refresh authentication token', async () => {
            const refreshResponse = await authApi.refreshToken();
            
            expect(refreshResponse.token).toBeDefined();
            expect(refreshResponse.token).not.toBe(loginResponse.token); // Token should be different
            expect(refreshResponse.user.email).toBe(credentials.email);
        });

        await test.step('Verify user is still authenticated', async () => {
            const isAuthenticated = await authApi.isAuthenticated();
            expect(isAuthenticated).toBe(true);
        });
    });
}); 