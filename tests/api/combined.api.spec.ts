import { test, expect } from '@playwright/test';
import { ApiHelpers } from '../../utils/apiHelpers';
import { AuthApi } from '../../pages/api/AuthApi';
import { LoginPage } from '../../pages/LoginPage';
import { ENV } from '../../config/env';

test.describe('Combined API + UI Tests', () => {
    let apiHelpers: ApiHelpers;
    let authApi: AuthApi;

    test.beforeEach(async ({ request }) => {
        apiHelpers = new ApiHelpers(request, ENV.BASE_URL);
        authApi = new AuthApi(apiHelpers);
    });

    test('API login then verify UI state', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await test.step('Login via API', async () => {
            const response = await authApi.login({
                email: ENV.CREDENTIALS.USERNAME,
                password: ENV.CREDENTIALS.PASSWORD
            });
            
            expect(response.token).toBeDefined();
            expect(response.user.email).toBe(ENV.CREDENTIALS.USERNAME);
        });

        await test.step('Navigate to UI and verify logged in state', async () => {
            // Set the auth token in browser storage to simulate logged in state
            await page.addInitScript((token) => {
                localStorage.setItem('authToken', token);
            }, await authApi.getCurrentUser().then(user => user.token));

            await page.goto(ENV.BASE_URL);
            
            // Verify user is logged in by checking for dashboard elements
            // This will depend on your actual UI structure
            await expect(page).toHaveURL(ENV.BASE_URL);
            
            // Add assertions based on what should be visible when logged in
            // For example, check for user profile elements, logout button, etc.
        });
    });

    test('API data setup for UI test', async ({ page }) => {
        await test.step('Setup test data via API', async () => {
            // Login via API
            await authApi.login({
                email: ENV.CREDENTIALS.USERNAME,
                password: ENV.CREDENTIALS.PASSWORD
            });

            // Create test data via API (example)
            // const testData = await apiHelpers.post('/api/test-data', {
            //     type: 'loan-application',
            //     status: 'pending'
            // });
            
            // expect(testData.status).toBe(201);
        });

        await test.step('Run UI test with pre-created data', async () => {
            // Navigate to UI and verify the data created via API
            await page.goto(ENV.BASE_URL);
            
            // Add UI assertions to verify the data created via API
            // This demonstrates how API tests can set up data for UI tests
        });
    });

    test('UI action then verify via API', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await test.step('Login via UI', async () => {
            await loginPage.navigateToLogin();
            await loginPage.login();
        });

        await test.step('Verify login state via API', async () => {
            // Extract auth token from browser storage
            const authToken = await page.evaluate(() => {
                return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
            });

            if (authToken) {
                apiHelpers.setAuthToken(authToken);
                const isAuthenticated = await authApi.isAuthenticated();
                expect(isAuthenticated).toBe(true);
            }
        });
    });
}); 