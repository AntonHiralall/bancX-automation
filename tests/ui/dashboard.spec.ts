import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { Helpers } from '../../utils/helpers';

test.describe('Dashboard Tests', () => {
    let dashboardPage: DashboardPage;
    let helpers: Helpers;

    test.beforeEach(async ({ page }) => {
        // Login and navigate to financial info page
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLogin();
        dashboardPage = await loginPage.login();
        await dashboardPage.waitForPageLoad();
    });

    test('User can click create account button', async ({ page }) => {
        await test.step('Verify create account button is visible', async () => {
            // This test is failing because the UI returns a bad connection error
            expect(await dashboardPage.isCreateAccountButtonVisible(), 'Create account button should be visible').toBeTruthy();
        });

        await test.step('Click create account button', async () => {
            helpers = new Helpers(page);            
            await helpers.clickCreateAccount();
            // Add assertions based on what happens after clicking the button
            // This will need to be updated once we know the expected behavior
        });
    });

    test('User can open the user menu', async ({ page }) => {
        await test.step('Verify user menu is visible', async () => {
            expect(await dashboardPage.isUserMenuVisible(), 'User menu should be visible').toBeTruthy();
        });

        await test.step('Open user menu', async () => {
            await dashboardPage.openUserMenu();
            expect(await dashboardPage.isSignOutButtonVisible(), 'Sign out button should be visible').toBeTruthy();
        });
    });

    test('User can sign out and is redirected to login page', async ({ page }) => {
        await test.step('Sign out from the application', async () => {
            await dashboardPage.signOut();
        });

        await test.step('Verify redirection to login page', async () => {
            expect(await dashboardPage.verifyOnLoginPage(), 'User should be redirected to login page').toBeTruthy();
        });
    });
}); 