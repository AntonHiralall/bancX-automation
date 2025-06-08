import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { ENV } from '../config/env';

export class DashboardPage extends BasePage {
    // Locators
    private createAccountButton = this.page.getByTestId('start-loan-app');
    private userMenu = this.page.getByRole('button', { name: 'icon button bars' });
    private signOutButton = this.page.getByRole('button', { name: 'Sign out' });
    private signInMessage = this.page.getByRole('heading', { name: 'Sign in to your account' });

    constructor(page: Page) {
        super(page);
    }

    /**
     * Click the create account button
     */
    async clickCreateAccount() {
        await this.createAccountButton.click();
        await this.waitForPageLoad();
    }

    /**
     * Open the user menu
     */
    async openUserMenu() {
        await this.userMenu.click();
    }

    /**
     * Sign out from the application
     */
    async signOut() {
        await this.openUserMenu();
        await this.signOutButton.click();
        await this.waitForPageLoad();
    }

    /**
     * Check if create account button is visible
     */
    async isCreateAccountButtonVisible(): Promise<boolean> {
        await this.waitForPageLoad();
        return await this.createAccountButton.isVisible();
    }

    /**
     * Check if user menu is visible
     */
    async isUserMenuVisible(): Promise<boolean> {
        return await this.userMenu.isVisible();
    }

    /**
     * Check if sign out button is visible
     */
    async isSignOutButtonVisible(): Promise<boolean> {
        return await this.signOutButton.isVisible();
    }

    /**
     * Verify we're on the login page
     */
    async verifyOnLoginPage(): Promise<boolean> {
        return await this.signInMessage.isVisible();
    }
} 