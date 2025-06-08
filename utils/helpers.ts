import { Page } from "@playwright/test";
import { BasePage } from "../pages/BasePage";

export class Helpers extends BasePage {
    constructor(page: Page) {
        super(page);
    }
    private cancelApplicationButton = this.page.getByRole('button', { name: 'Cancel' });
    private cancelReason = this.page.getByRole('option', { name: 'User Declined' });
    private confirmCancellation = this.page.getByRole('button', { name: 'Yes, cancel' });


    async cancelExistingApplication() {
        if (await this.cancelApplicationButton.isVisible()) {
            await this.cancelApplicationButton.click();
            await this.cancelReason.click();
            await this.confirmCancellation.click();
        }
    }
}