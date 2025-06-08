import { Page } from "@playwright/test";
import { BasePage } from "../pages/BasePage";

export class Helpers extends BasePage {
    constructor(page: Page) {
        super(page);
    }
    private cancelApplicationButton = this.page.getByRole('button', { name: 'Cancel' });
    private cancelDropdown = this.page.getByRole('button', { name: 'dropdown trigger' });
    private cancelReason = this.page.getByRole('option', { name: 'User Declined' });
    private confirmCancellation = this.page.getByRole('button', { name: 'Yes, cancel' });
    private selectProduct = this.page.getByTestId('product-1020001');


    async cancelExistingApplication() {
        if (await this.cancelApplicationButton.isVisible()) {
            await this.cancelApplicationButton.click();
            await this.cancelDropdown.click();
            await this.cancelReason.click();
            await this.confirmCancellation.click();
            await this.waitForPageLoad();
        }
        else {
            console.log('No application to cancel');
            
        }
    }

    async selectTestProduct() {
        await this.page.waitForLoadState('networkidle');
        await this.selectProduct.click();
    }
}