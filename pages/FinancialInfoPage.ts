import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { FinancialInfo } from '../test-data/financialInfo.types';

export class FinancialInfoPage extends BasePage {
    // Locators
    private grossMonthlyIncome = this.page.getByRole('spinbutton', { name: 'Monthly gross income' });
    private monthlyNetIncome = this.page.getByRole('spinbutton', { name: 'Monthly net income' });
    private monthlyExpenses = this.page.getByRole('spinbutton', { name: 'Monthly total expenses' });
    private payDaySelect = this.page.getByTestId('monthlyPayDate');
    private loanReasonSelect = this.page.getByTestId('loanReason');
    private termsAndConditionsCheckbox = this.page.getByRole('checkbox', { name: 'I give AVBOB Personal Loans' });
    // private nextButton = this.page.getByRole('button', { name: 'Next' });
    private expensesEqualsIncomeValidationMessage = this.page.getByTestId('validation');
    private financialInfoErrorMessage = this.page.locator('div').filter({ hasText: '❗ Validation ErrorPlease' }).nth(1);

    constructor(page: Page) {
        super(page);
    }

    /**
     * Fill in all financial information using the provided data
     * @param data The financial information data to fill in
     */
    async fillFinancialInfo(data: FinancialInfo) {
        await this.fillGrossMonthlyIncome(data.grossMonthlyIncome);
        await this.fillMonthlyNetIncome(data.monthlyNetIncome);
        await this.fillMonthlyExpenses(data.monthlyExpenses);
        await this.selectPayDay(data.payDay);
        await this.selectLoanReason(data.loanReason);
        if (data.termsAndConditions) {
            await this.checkTermsAndConditions();
        }
    }

    /**
     * Fill in the gross monthly income
     * @param amount The gross monthly income amount
     */
    async fillGrossMonthlyIncome(amount: string) {
        await this.grossMonthlyIncome.fill(amount);
    }

    /**
     * Fill in the monthly net income
     * @param amount The monthly net income amount
     */
    async fillMonthlyNetIncome(amount: string) {
        await this.monthlyNetIncome.fill(amount);
    }

    /**
     * Fill in the monthly expenses
     * @param amount The monthly expenses amount
     */
    async fillMonthlyExpenses(amount: string) {
        await this.monthlyExpenses.fill(amount);
    }

    /**
     * Select the pay day
     * @param payDay The pay day to select (e.g., "15th")
     */
    async selectPayDay(payDay: string) {
        await this.payDaySelect.click();
        await this.page.getByRole('option', { name: payDay }).click();
    }

    /**
     * Select the loan reason
     * @param reason The loan reason to select (e.g., "Capex")
     */
    async selectLoanReason(reason: string) {
        await this.loanReasonSelect.click();
        await this.page.getByRole('option', { name: reason }).click();
    }

    /**
     * Check the terms and conditions checkbox
     */
    async checkTermsAndConditions() {
        await this.termsAndConditionsCheckbox.check();
    }

    /**
     * Uncheck the terms and conditions checkbox
     */
    async uncheckTermsAndConditions() {
        await this.termsAndConditionsCheckbox.uncheck();
    }

    /**
     * Click the next button
     */
    // async clickNext() {
    //     await this.clickNext();
    //     await this.waitForPageLoad();
    // }

    /**
     * Check if error message is visible
     */
    async isErrorMessageVisible(): Promise<boolean> {
        return await this.financialInfoErrorMessage.isVisible();
    }

    async isExpensesEqualsIncomeValidationMessageVisible(): Promise<boolean> {
        return await this.expensesEqualsIncomeValidationMessage.isVisible();
    }

    /**
     * Get error message text
     */
    // async getErrorMessage(): Promise<string> {
    //     return await this.errorMessage.textContent() || '';
    // }

    /**
     * Verify if all required fields are filled
     */
    async areRequiredFieldsFilled(): Promise<boolean> {
        const grossIncomeValue = await this.grossMonthlyIncome.inputValue();
        const netIncomeValue = await this.monthlyNetIncome.inputValue();
        const expensesValue = await this.monthlyExpenses.inputValue();
        const isTermsChecked = await this.termsAndConditionsCheckbox.isChecked();

        return grossIncomeValue !== '' && 
               netIncomeValue !== '' && 
               expensesValue !== '' && 
               isTermsChecked;
    }

    /**
     * Clear all form fields
     */
    async clearAllFields() {
        await this.grossMonthlyIncome.clear();
        await this.monthlyNetIncome.clear();
        await this.monthlyExpenses.clear();
        await this.uncheckTermsAndConditions();
    }
}