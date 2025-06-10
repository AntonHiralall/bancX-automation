import { Page } from "@playwright/test";
import { BasePage } from "../pages/BasePage";

export class Helpers extends BasePage {
    constructor(page: Page) {
        super(page);
    }
    private cancelFirstApplicationButton = this.page.getByRole('button', { name: 'Cancel' }).first();
    private cancelApplicationButton = this.page.getByRole('button', { name: 'Cancel' });
    private cancelDropdown = this.page.getByRole('button', { name: 'dropdown trigger' });
    private cancelReason = this.page.getByRole('option', { name: 'User Declined' });
    private confirmCancellation = this.page.getByRole('button', { name: 'Yes, cancel' });
    private selectProduct = this.page.getByTestId('product-1020001');

    async cancelExistingApplication() {
        let i = 0;
        let totalCancelled = 0;

        try {
            while (true) {
                const cancelBtn = this.cancelApplicationButton.nth(i);

                // Wait for the button to be visible and enabled
                const isVisible = await cancelBtn.isVisible().catch(() => false);
                if (!isVisible) break;

                // Wait for the button to be enabled
                await cancelBtn.waitFor({ state: 'visible', timeout: 5000 }).catch(() => null);

                // Click the cancel button and handle the cancellation flow
                try {
                    await cancelBtn.click({ timeout: 5000 });
                    await this.cancelDropdown.waitFor({ state: 'visible', timeout: 5000 });
                    await this.cancelDropdown.click();

                    await this.cancelReason.waitFor({ state: 'visible', timeout: 5000 });
                    await this.cancelReason.click();

                    await this.confirmCancellation.waitFor({ state: 'visible', timeout: 5000 });
                    await this.confirmCancellation.click();

                    // Wait for the page to stabilize after cancellation
                    await this.waitForPageLoad();
                    await this.page.waitForTimeout(1000); // Additional wait for UI to stabilize

                    totalCancelled++;
                } catch (error) {
                    console.log(`Error cancelling application at index ${i}: ${error.message}`);
                    break;
                }

                i++;
            }
        } catch (error) {
            console.log(`Error in cancelExistingApplication: ${error.message}`);
        }

        if (totalCancelled === 0) {
            console.log('No applications to cancel');
        } else {
            console.log(`Cancelled ${totalCancelled} application(s)`);
        }
    }




    async selectTestProduct() {
        await this.page.waitForLoadState('networkidle');
        await this.selectProduct.click();
    }
}