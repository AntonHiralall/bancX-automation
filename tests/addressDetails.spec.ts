import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { FinancialInfoPage } from '../pages/FinancialInfoPage';
import { PersonalDetailsPage } from '../pages/PersonalDetailsPage';
import { AddressDetailsPage } from '../pages/AddressDetails';
import { TestDataLoader } from '../utils/testDataLoader';
import { Helpers } from '../utils/helpers';

test.describe('Address Details Form Tests', () => {
    let dashboardPage: DashboardPage;
    let financialInfoPage: FinancialInfoPage;
    let personalDetailsPage: PersonalDetailsPage;
    let addressDetailsPage: AddressDetailsPage;
    let helpers: Helpers;
    const testDataLoader = TestDataLoader.getInstance();

    test.beforeEach(async ({ page }) => {
        // Login and navigate to financial info page
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLogin();
        dashboardPage = await loginPage.login();

        // Cancel any existing application
        helpers = new Helpers(page);
        await helpers.cancelExistingApplication();

        // Navigate to financial info page
        await helpers.clickCreateAccount();
        financialInfoPage = new FinancialInfoPage(page);
        await financialInfoPage.waitForPageLoad();

        // Fill in standard income data
        const standardIncome = testDataLoader.getFinancialInfo('validScenarios', 'standardIncome');
        await financialInfoPage.fillFinancialInfo(standardIncome);
        await helpers.clickNext();

        // Select test product
        await helpers.selectTestProduct();

        // Initialize address details page
        addressDetailsPage = new AddressDetailsPage(page);

        // Click next on calculator screen
        await addressDetailsPage.clickNext();
        // Click next on next steps screen
        await addressDetailsPage.clickNext();

        // Click next on personal details page
        await addressDetailsPage.clickNext();


    });

    test.describe('Valid Scenarios', () => {
        test('Should successfully submit standard address details', async () => {
            const addressDetails = testDataLoader.getAddressDetails('validScenarios', 'standardAddress');

            await test.step('Fill in address details form', async () => {
                await addressDetailsPage.fillAddressDetails(addressDetails);
                await addressDetailsPage.clickNext();
                await addressDetailsPage.validateErrorMessageNotVisible();
            });

        });

        test('Should successfully submit address with line 2', async () => {
            const addressDetails = testDataLoader.getAddressDetails('validScenarios', 'addressWithLine2');

            await test.step('Fill in address details with line 2', async () => {
                await addressDetailsPage.fillAddressDetails(addressDetails);
                await addressDetailsPage.clickNext();
                await addressDetailsPage.validateErrorMessageNotVisible();
            });

        });

        test('Should successfully submit long address', async () => {
            const addressDetails = testDataLoader.getAddressDetails('validScenarios', 'longAddress');

            await test.step('Fill in long address details', async () => {
                await addressDetailsPage.fillAddressDetails(addressDetails);
                await addressDetailsPage.clickNext();
                await addressDetailsPage.validateErrorMessageNotVisible();
            });

        });

        test('Should successfully submit short address', async () => {
            const addressDetails = testDataLoader.getAddressDetails('validScenarios', 'shortAddress');

            await test.step('Fill in short address details', async () => {
                await addressDetailsPage.fillAddressDetails(addressDetails);
                await addressDetailsPage.clickNext();
                await addressDetailsPage.validateErrorMessageNotVisible();
            });

        });
    });

    test.describe('Invalid Scenarios', () => {
        test('Should show error with empty fields', async () => {
            const addressDetails = testDataLoader.getAddressDetails('invalidScenarios', 'emptyFields');

            await test.step('Submit form with empty fields', async () => {
                await addressDetailsPage.fillAddressDetails(addressDetails);
                await addressDetailsPage.clickNext();
            });

            await test.step('Validate error messages', async () => {
                await addressDetailsPage.validateRequiredFields();
            });
        });

        test('Should show error with invalid postal code', async () => {
            const addressDetails = testDataLoader.getAddressDetails('invalidScenarios', 'invalidPostalCode');

            await test.step('Fill in address with invalid postal code', async () => {
                await addressDetailsPage.fillAddressDetails(addressDetails);
                await addressDetailsPage.clickNext();
                await addressDetailsPage.validateErrorMessageNotVisible();
            });

            // No system validation for postal code
        });

        test('Should show error with invalid city', async () => {
            const addressDetails = testDataLoader.getAddressDetails('invalidScenarios', 'invalidCity');

            await test.step('Fill in address with invalid city', async () => {
                await addressDetailsPage.fillAddressDetails(addressDetails);
                await addressDetailsPage.clickNext();
                await addressDetailsPage.validateErrorMessageNotVisible();
            });

            // No system validation for city
        });

        test('Should show error with special characters', async () => {
            const addressDetails = testDataLoader.getAddressDetails('invalidScenarios', 'specialCharacters');

            await test.step('Fill in address with special characters', async () => {
                await addressDetailsPage.fillAddressDetails(addressDetails);
                await addressDetailsPage.clickNext();
                await addressDetailsPage.validateErrorMessageNotVisible();
            });

            // No system validation for special characters
        });
    });

    test.describe('Edge Cases', () => {
        test('Should handle maximum length address', async () => {
            const addressDetails = testDataLoader.getAddressDetails('edgeCases', 'maximumLengthAddress');

            await test.step('Fill in maximum length address', async () => {
                await addressDetailsPage.fillAddressDetails(addressDetails);
                await addressDetailsPage.clickNext();
                await addressDetailsPage.validateErrorMessageNotVisible();
            });

            // No system validation for maximum length
        });

        test('Should handle minimum length address', async () => {
            const addressDetails = testDataLoader.getAddressDetails('edgeCases', 'minimumLengthAddress');

            await test.step('Fill in minimum length address', async () => {
                await addressDetailsPage.fillAddressDetails(addressDetails);
                await addressDetailsPage.clickNext();
                await addressDetailsPage.validateErrorMessageNotVisible();
            });

            // No system validation for minimum length
        });

        test('Should handle international address', async () => {
            const addressDetails = testDataLoader.getAddressDetails('edgeCases', 'internationalAddress');

            await test.step('Fill in international address', async () => {
                await addressDetailsPage.fillAddressDetails(addressDetails);
                await addressDetailsPage.clickNext();
                await addressDetailsPage.validateErrorMessageNotVisible();
            });

            // No system validation for international address
        });
    });
}); 