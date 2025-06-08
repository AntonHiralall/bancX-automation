import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { ENV } from '../config/env';
import { DashboardPage } from './DashboardPage';

export class LoginPage extends BasePage {
    // Locators
    private usernameInput = this.page.getByRole('textbox', { name: 'Email' });
    private passwordInput = this.page.getByRole('textbox', { name: 'Password' });
    private loginButton = this.page.getByRole('button', { name: 'Sign In' });
    private errorMessage = this.page.getByText('Invalid username or password.');

    constructor(page: Page) {
        super(page);
    }

    /**
     * Navigate to the login page
     */
    async navigateToLogin() {
        await this.goto(ENV.BASE_URL);
        await this.waitForPageLoad();
    }

    /**
     * Login with provided credentials
     * @param username The username to login with
     * @param password The password to login with
     * @returns DashboardPage instance after successful login
     */
    async login(username: string = ENV.CREDENTIALS.USERNAME, password: string = ENV.CREDENTIALS.PASSWORD): Promise<DashboardPage> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await this.waitForPageLoad();
        return new DashboardPage(this.page);
    }

    /**
     * Get the error message if login fails
     */
    async getErrorMessage(): Promise<string> {
        return await this.errorMessage.textContent() || '';
    }

    /**
     * Check if error message is visible
     */
    async isErrorMessageVisible(): Promise<boolean> {
        return await this.errorMessage.isVisible();
    }
} 