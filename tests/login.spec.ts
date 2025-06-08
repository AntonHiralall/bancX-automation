import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ENV } from '../config/env';

test.describe('Login Functionality', () => {
    test('Login with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        
        await test.step('Navigate to login page', async () => {
            await loginPage.navigateToLogin();
        });

        await test.step('Login with valid credentials', async () => {
            await loginPage.login();
        });

        await test.step('Verify successful login', async () => {
            // Add assertions based on what elements are visible after successful login
            // This will need to be updated once we analyze the post-login page
            await expect(page).toHaveURL(ENV.BASE_URL);
        });
    });

    test('Verify error message with invalid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        
        await test.step('Navigate to login page', async () => {
            await loginPage.navigateToLogin();
        });

        await test.step('Login with invalid credentials', async () => {
            await loginPage.login('invalid@email.com', 'wrongpassword');
        });

        await test.step('Verify error message is displayed', async () => {
            expect(await loginPage.isErrorMessageVisible()).toBeTruthy();
        });
    });
}); 