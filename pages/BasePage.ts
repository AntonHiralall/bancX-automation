import { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { time } from 'console';

export class BasePage {
    protected page: Page;
    private nextButton;
    private affordabilityTextVisible;
    private loanAmountText;
    private loanTermText;
    private loanInstalmentText;
    private indicativeAmountText;
    private retrySnapshot;
    private helpAndSupportSnapShot;
    private contactSupport;
    private supportPageHeader;


    constructor(page: Page) {
        this.page = page; 
        this.nextButton = this.page.getByTestId('next').getByRole('button', { name: 'Next' });
        this.affordabilityTextVisible = this.page.getByText('Choose your loan amountYou’ve');
        this.loanAmountText = this.page.getByText('I would like to borrow');
        this.loanTermText = this.page.getByText('And repay it over');
        this.loanInstalmentText = this.page.getByTestId('label');
        this.indicativeAmountText = this.page.getByText('The amounts reflected in this');
        this.contactSupport = this.page.getByRole('button', { name: 'Contact Support' });

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
        // Wait for the next button to be visible (max 3 seconds), then click
        await this.nextButton.waitFor({ state: "visible", timeout: 3000 });
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

    async validateAffordabilityText() {
        await this.affordabilityTextVisible.isVisible();
    }

    async validateLoanAmountText() {
        await this.loanAmountText.isVisible();
    }
    async validateLoanTermText() {
        await this.loanTermText.isVisible();
    }
    async validateLoanInstalmentText() {
        await this.loanInstalmentText.isVisible();
    }
    async validateIndicativeAmountText() {
        await this.indicativeAmountText.isVisible();
    }

    async clickContactSupport() {
        await this.contactSupport.click();
    }
    async validateSupportPageHeader() {
        await expect(this.page.getByText('Help & support')).toBeVisible();
    }

    async validateRetrySnapshot() {
        await expect(this.page.locator('page-card')).toMatchAriaSnapshot(`
        - heading "Verifying" [level=1]
        - paragraph
        - paragraph: "We're still waiting for the results of your:"
        - list:
          - listitem: Identity verification
          - listitem: Credit check
        - paragraph: This usually takes a few moments. We’ll notify you by email soon as your results are ready.
        - paragraph: Alternatively, you can contact support.
        `);
    }

    async validateHelpAndSupportSnapshot() {
        await expect(this.page.locator('avbob-global-help')).toMatchAriaSnapshot(`
            - paragraph: If you need assistance, please contact AVBOB Personal Loans using the options below or visit one of our branches listed below.
            - paragraph:
              - text: Email
              - link "loans@avbob.co.za":
                - /url: mailto:loans@avbob.co.za
            - paragraph:
              - text: Phone
              - link /\\+\\d+ \\d+ \\d+ \\d+/:
                - /url: tel:+27123031000
              - text: 08H00 - 16H30 Weekdays 08H00 - 13H00 Saturdays (Closed on Public Holidays and Sundays)
            - paragraph: /Head office address 5 Impala Avenue, Irene Link Office Park, Building D, Doringkloof, \\d+ Centurion, South Africa\\. PO BOX \\d+, Pretoria, \\d+/
            `);
    }
} 