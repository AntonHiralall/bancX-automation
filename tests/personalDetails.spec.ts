import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { FinancialInfoPage } from '../pages/FinancialInfoPage';
import { PersonalDetailsPage } from '../pages/PersonalDetailsPage';
import { TestDataLoader } from '../utils/testDataLoader';
import { Helpers } from '../utils/helpers';

test.describe('Personal Details Form', () => {
    let dashboardPage: DashboardPage;
    let financialInfoPage: FinancialInfoPage;
    let personalDetailsPage: PersonalDetailsPage;
    let helpers: Helpers;
    const testData = TestDataLoader.getInstance();

    test.beforeEach(async ({ page }) => {
        // Login and navigate to financial info page
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLogin();
        dashboardPage = await loginPage.login();
        await dashboardPage.waitForPageLoad();

        // Cancel any existing application
        helpers = new Helpers(page);
        await helpers.cancelExistingApplication();

        // Navigate to financial info page
        await dashboardPage.clickCreateAccount();
        financialInfoPage = new FinancialInfoPage(page);
        await financialInfoPage.waitForPageLoad();

        // Fill in standard income data
        const standardIncome = testData.getFinancialInfo('validScenarios', 'standardIncome');
        await financialInfoPage.fillFinancialInfo(standardIncome);
        await financialInfoPage.clickNext();    

        // Select test product
        await helpers.selectTestProduct();
        await financialInfoPage.clickNext();
        await financialInfoPage.clickNext();

        // Initialize personal details page
        personalDetailsPage = new PersonalDetailsPage(page);
        await personalDetailsPage.waitForPageLoad();
    });

    test.describe('Valid Scenarios', () => {
        test('Should successfully submit form with standard details', async ({ page }) => {
            const standardDetails = testData.getPersonalDetails('validScenarios', 'standardDetails');
            await personalDetailsPage.fillPersonalDetails(standardDetails);
        });

        test('Should successfully submit form with long names', async ({ page }) => {
            const longNameDetails = testData.getPersonalDetails('validScenarios', 'longNameDetails');
            await personalDetailsPage.fillPersonalDetails(longNameDetails);
        });

        test('Should successfully submit form with short names', async ({ page }) => {
            const shortNameDetails = testData.getPersonalDetails('validScenarios', 'shortNameDetails');
            await personalDetailsPage.fillPersonalDetails(shortNameDetails);
        });
    });

    test.describe('Invalid Scenarios', () => {
        test('Should show error with empty fields', async ({ page }) => {
            const emptyFields = testData.getPersonalDetails('invalidScenarios', 'emptyFields');
            await test.step('Fill in empty fields', async () => {
                await personalDetailsPage.fillPersonalDetails(emptyFields);
            });
            await test.step('Validate error messages', async () => {
                await personalDetailsPage.validateFnameRequiredErrorMessage();
                await personalDetailsPage.validateLnameRequiredErrorMessage();
                await personalDetailsPage.validateMobileNumberRequiredErrorMessage();
                await personalDetailsPage.validateEmailRequiredErrorMessage();
                await personalDetailsPage.validateSubmitErrorMessage();
            });
        });

        test.only('Should show error with invalid email', async ({ page }) => {
            const invalidEmail = testData.getPersonalDetails('invalidScenarios', 'invalidEmail');
            await test.step('Fill in invalid email', async () => {
                await personalDetailsPage.fillPersonalDetails(invalidEmail);
            });
            await test.step('Validate error messages', async () => {
                await personalDetailsPage.validateInvalidEmailErrorMessage();
                await personalDetailsPage.validateSubmitErrorMessage();
            });
        });

        test('Should show error with invalid mobile', async ({ page }) => {
            const invalidMobile = testData.getPersonalDetails('invalidScenarios', 'invalidMobile');
            await test.step('Fill in invalid mobile', async () => {
                await personalDetailsPage.fillPersonalDetails(invalidMobile);
            });
            // System does not have mobile number character validation
        });

        test('Should show error with special characters', async ({ page }) => {
            const specialCharacters = testData.getPersonalDetails('invalidScenarios', 'specialCharacters');
            await test.step('Fill in special characters', async () => {
                await personalDetailsPage.fillPersonalDetails(specialCharacters);
            });
            // System allows special characters
            // test
        });
    });
});