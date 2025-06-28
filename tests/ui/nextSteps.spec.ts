import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { FinancialInfoPage } from '../../pages/FinancialInfoPage';
import { NextSteps } from '../../pages/NextSteps';
import { TestDataLoader } from '../../utils/testDataLoader';
import { Helpers } from '../../utils/helpers';

test.describe('Next Steps Form Tests', () => {
    let dashboardPage: DashboardPage;
    let financialInfoPage: FinancialInfoPage;
    let nextStepsPage: NextSteps;
    let helpers: Helpers;
    const testDataLoader = TestDataLoader.getInstance();

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
        await helpers.clickCreateAccount();
        financialInfoPage = new FinancialInfoPage(page);
        await financialInfoPage.waitForPageLoad();

        // Fill in standard income data
        const standardIncome = testDataLoader.getFinancialInfo('validScenarios', 'standardIncome');
        await financialInfoPage.fillFinancialInfo(standardIncome);
        await financialInfoPage.clickNext();    

        // Select test product
        await helpers.selectTestProduct();
        await financialInfoPage.clickNext();
        // Click next on calculator screen
        await financialInfoPage.clickNext();

        // Initialize next steps page
        nextStepsPage = new NextSteps(page);
    });

    test('Validate Next Steps Screen', async ({ page }) => {
        expect(nextStepsPage.validateNextStepsScreen(), 'Next steps screen should be visible').toBeTruthy();
    });
});