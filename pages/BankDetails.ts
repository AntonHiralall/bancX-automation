import { BasePage } from "./BasePage";
import { Page, expect } from "@playwright/test";

export class BankDetailsPage extends BasePage {
    private loadBankOptions = this.page.getByTestId('bank').getByRole('button', { name: 'dropdown trigger' });
    private selectBankOption = this.page.getByRole('option', { name: 'BancX' });
    private loadBankBranch = this.page.getByTestId('branch').getByRole('button', { name: 'dropdown trigger' });
    private validateBankBranch = this.page.getByLabel('Option List').getByText('BancX branch');
    private loadAccountType = this.page.getByTestId('accountType').getByRole('button', { name: 'dropdown trigger' });
    private selectAccountType = this.page.getByRole('option', { name: 'Savings' });
    private enterAccountNumber = this.page.getByRole('spinbutton', { name: 'Account number' });
    private enterAccountHolderName = this.page.getByRole('textbox', { name: 'Account holder name' });
    private validatePageHeader = this.page.getByRole('heading', { name: 'Your bank details' });
    private validatePageDescription = this.page.getByText('This is the bank account we');
    private validateAccountNumberRequired = this.page.getByTestId('bankAccountNumber').getByTestId('validation');
    private validateAccountHolderNameRequired = this.page.getByTestId('accountHolderName').getByTestId('validation');
    private formFieldError = this.page.locator('div').filter({ hasText: '❗ Validation ErrorPlease' }).nth(1);  

    constructor(page: Page) {
        super(page);
    }

    async selectBank() {
        await this.waitForPageLoad();
        await this.loadBankOptions.click();
        await this.selectBankOption.click();
    }

    async selectBankBranch() {
        await this.waitForPageLoad();
        await this.loadBankBranch.click();
        await this.validateBankBranch.click();
    }

    async chooseAccountType() {
        await this.waitForPageLoad();
        await this.loadAccountType.click();
        await this.selectAccountType.click();
    }

    async captureAccountNumber(accountNumber: string) {
        await this.enterAccountNumber.fill(accountNumber);
    }

    async captureAccountHolderName(accountHolderName: string) {
        await this.enterAccountHolderName.fill(accountHolderName);
    }

    async assertPageHeader() {
        await this.validatePageHeader.isVisible();
    }

    async assertPageDescription() {
        await this.validatePageDescription.isVisible();
    }

    async fillBankDetails(bankDetails: any) {
        await this.waitForPageLoad();
        await this.selectBank();
        await this.selectBankBranch();
        await this.chooseAccountType();
        await this.captureAccountNumber(bankDetails.accountNumber);
        await this.captureAccountHolderName(bankDetails.accountHolderName);
    }    

    async validateRequiredFields() {
        await expect(this.validateAccountNumberRequired).toBeVisible();
        await expect(this.validateAccountHolderNameRequired).toBeVisible();
        await expect(this.formFieldError).toBeVisible();
    }

    async validateErrorMessageNotVisible() {
        await expect(this.validateAccountNumberRequired).not.toBeVisible();
        await expect(this.validateAccountHolderNameRequired).not.toBeVisible();
        await expect(this.formFieldError).not.toBeVisible();
    }

    async validateInvalidAccountNumber() {
        await expect(this.validateAccountNumberRequired).toBeVisible();
        await expect(this.formFieldError).toBeVisible();
    }
}


