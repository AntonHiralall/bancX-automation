import { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class BasePage {
    protected page: Page;
    private nextButton;

    constructor(page: Page) {
        this.page = page;
        this.nextButton = this.page.getByRole('button', { name: 'Next' });
    }
    

    /**
     * Navigate to a specific URL
     * @param url The URL to navigate to
     */
    async goto(url: string) {
        await this.page.goto(url);
    }

    /**
     * Wait for the page to be loaded
     */
    async waitForPageLoad() {
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Get the current page title
     */
    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    async clickNext() {
        await this.nextButton.click();
        await this.waitForPageLoad();
    }

    /**
     * Validate that an element is not visible
     * @param element The element to check
     */
    async validateElementNotVisible(element: any) {
        await expect(element).not.toBeVisible();
    }
} 