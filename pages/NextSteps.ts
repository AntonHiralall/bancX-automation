import { BasePage } from "./BasePage";
import { Page, expect } from "@playwright/test";

export class NextSteps extends BasePage {
    private validateNextStepsHeader = this.page.getByRole('heading', { name: 'Next steps' });
    private validateNextStepsScreenVisible = this.page.getByTitle('Next steps').locator('div').first();
    private matchNextStepsScreenToSnapshot = this.page.locator('page-card');

    constructor(page: Page) {
        super(page);
    }

    async validateNextStepsScreen() {
        await expect(this.validateNextStepsHeader).toBeVisible();
        await expect(this.validateNextStepsScreenVisible).toBeVisible();
        await expect(this.matchNextStepsScreenToSnapshot).toMatchAriaSnapshot(`
            - heading "Next steps" [level=1]
            - paragraph: You will need these documents
            - list:
              - listitem: Identity Document
              - listitem: Latest Customer Payslip
              - listitem: Last 3 Months Bank Statements
            - paragraph: To secure your loan we need the documents listed above and some more of your personal information.
            `);
    }
}
