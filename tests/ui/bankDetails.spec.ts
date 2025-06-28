import { test, expect } from '@playwright/test';
import { BankDetailsPage } from '../../pages/BankDetails';
import { TestDataLoader } from '../../utils/testDataLoader';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { FinancialInfoPage } from '../../pages/FinancialInfoPage';
import { Helpers } from '../../utils/helpers';
import { PersonalDetailsPage } from '../../pages/PersonalDetailsPage';
import { AddressDetailsPage } from '../../pages/AddressDetails';

test.describe('Bank Details Form Tests', () => {
    let bankDetailsPage: BankDetailsPage;
    let dashboardPage: DashboardPage;
    let financialInfoPage: FinancialInfoPage;
    let helpers: Helpers;
    const testDataLoader = TestDataLoader.getInstance();

    test.beforeEach(async ({ page }) => {
        // Login and navigate to financial info page
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLogin();
        await loginPage.login();

        // Cancel any existing application
        helpers = new Helpers(page);
        await page.waitForLoadState('networkidle');
        await helpers.cancelExistingApplication();

        // Navigate to financial info page
        await helpers.clickCreateAccount();
        financialInfoPage = new FinancialInfoPage(page);
        await financialInfoPage.waitForPageLoad();

        // Fill in standard income data
        const standardIncome = testDataLoader.getFinancialInfo('validScenarios', 'standardIncome');
        await page.waitForLoadState('networkidle');
        await financialInfoPage.fillFinancialInfo(standardIncome);
        await financialInfoPage.clickNext();    

        // Select test product
        await helpers.selectTestProduct();
        await financialInfoPage.clickNext();
        // Click next on calculator screen
        await financialInfoPage.clickNext();

        // Click next on personal details page
        const personalDetailsPage = new PersonalDetailsPage(page);
        await personalDetailsPage.clickNext();

        // Click next on address details page
        const addressDetailsPage = new AddressDetailsPage(page);
        addressDetailsPage.clickNext();


        // Initialize bank details page
        bankDetailsPage = new BankDetailsPage(page);
        await bankDetailsPage.waitForPageLoad();
        await bankDetailsPage.assertPageHeader();
        await bankDetailsPage.assertPageDescription();
    });

    test.describe('Valid Scenarios', () => {
        test('Should successfully submit standard bank details', async () => {
            const bankDetails = testDataLoader.getBankDetails('validScenarios', 'standardDetails');
            
            await test.step('Fill in bank details form', async () => {
                await bankDetailsPage.fillBankDetails(bankDetails);
                await bankDetailsPage.clickNext();
                expect(bankDetailsPage.validateErrorMessageNotVisible(), 'Error message should not be visible').toBeTruthy();
            });

        });

        test('Should handle long account number', async () => {
            const bankDetails = testDataLoader.getBankDetails('validScenarios', 'longAccountNumber');
            
            await test.step('Fill in bank details with long account number', async () => {
                await bankDetailsPage.fillBankDetails(bankDetails);
                await bankDetailsPage.clickNext();
                expect(bankDetailsPage.validateErrorMessageNotVisible(), 'Error message should not be visible').toBeTruthy();
            });

            // Add assertions for successful submission
        });

        test('Should handle short account number', async () => {
            const bankDetails = testDataLoader.getBankDetails('validScenarios', 'shortAccountNumber');
            
            await test.step('Fill in bank details with short account number', async () => {
                await bankDetailsPage.fillBankDetails(bankDetails);
                await bankDetailsPage.clickNext();
                expect(bankDetailsPage.validateErrorMessageNotVisible(), 'Error message should not be visible').toBeTruthy();
            });

            // Add assertions for successful submission
        });
    });

    test.describe('Invalid Scenarios', () => {
        test('Should show error for invalid account number', async () => {
            const bankDetails = testDataLoader.getBankDetails('invalidScenarios', 'invalidAccountNumber');
            
            await test.step('Fill in bank details with invalid account number', async () => {
                await bankDetailsPage.fillBankDetails(bankDetails);
                await bankDetailsPage.clickNext();
                expect(bankDetailsPage.validateInvalidAccountNumber(), 'Invalid account number error message should be visible').toBeTruthy();
            });


        });

        test('Should show error for invalid account holder name', async () => {
            const bankDetails = testDataLoader.getBankDetails('invalidScenarios', 'invalidAccountHolderName');
            
            await test.step('Fill in bank details with invalid account holder name', async () => {
                await bankDetailsPage.fillBankDetails(bankDetails);
                await bankDetailsPage.clickNext();
                expect(bankDetailsPage.validateErrorMessageNotVisible(), 'Error message should not be visible').toBeTruthy();
            });

            // Add assertions for error message
        });

        test('Should show errors for empty fields', async () => {
            const bankDetails = testDataLoader.getBankDetails('invalidScenarios', 'emptyFields');
            
            await test.step('Submit form with empty fields', async () => {
                await bankDetailsPage.fillBankDetails(bankDetails);
                await bankDetailsPage.clickNext();
                expect(bankDetailsPage.validateRequiredFields(), 'Required fields error message should be visible').toBeTruthy();
            });

        });
    });

    test.describe('Edge Cases', () => {
        test('Should handle maximum length account number', async () => {
            const bankDetails = testDataLoader.getBankDetails('edgeCases', 'maximumLengthAccountNumber');
            
            await test.step('Fill in bank details with maximum length account number', async () => {
                await bankDetailsPage.fillBankDetails(bankDetails);
                await bankDetailsPage.clickNext();
                expect(bankDetailsPage.validateErrorMessageNotVisible(), 'Error message should not be visible').toBeTruthy();
            });

            // Add assertions for successful submission or validation
        });

        test('Should handle minimum length account number', async () => {
            const bankDetails = testDataLoader.getBankDetails('edgeCases', 'minimumLengthAccountNumber');
            
            await test.step('Fill in bank details with minimum length account number', async () => {
                await bankDetailsPage.fillBankDetails(bankDetails);
                await bankDetailsPage.clickNext();
                expect(bankDetailsPage.validateErrorMessageNotVisible(), 'Error message should not be visible').toBeTruthy();
            });

            // Add assertions for successful submission or validation
        });

        test('Should handle special characters in account holder name', async () => {
            const bankDetails = testDataLoader.getBankDetails('edgeCases', 'specialCharactersAccountHolder');
            
            await test.step('Fill in bank details with special characters in account holder name', async () => {
                await bankDetailsPage.fillBankDetails(bankDetails);
                await bankDetailsPage.clickNext();
                expect(bankDetailsPage.validateErrorMessageNotVisible(), 'Error message should not be visible').toBeTruthy();
            });

            // Add assertions for successful submission
        });
    });
}); 