import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { FinancialInfoPage } from '../pages/FinancialInfoPage';
import { TestDataLoader } from '../utils/testDataLoader';
import { Helpers } from '../utils/helpers';
import { NextSteps } from '../pages/NextSteps';

test.describe('Next Steps Tests', () => {
    let dashboardPage: DashboardPage;
    let financialInfoPage: FinancialInfoPage;
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

        // Click next on loan calculator screen
        await financialInfoPage.clickNext();
    });

    test('Validate Next Steps Screen', async ({ page }) => {
        const nextStepsPage = new NextSteps(page);
        await nextStepsPage.validateNextStepsScreen();
    });
});