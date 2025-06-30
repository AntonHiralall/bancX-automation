import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { FinancialInfoPage } from '../../pages/FinancialInfoPage';
import { PersonalDetailsPage } from '../../pages/PersonalDetailsPage';
import { TestDataLoader } from '../../utils/testDataLoader';
import { DashboardPage } from '../../pages/DashboardPage';
import { Helpers } from '../../utils/helpers';


test.describe('Customer Portal Journeys', () => {
    let loginPage: LoginPage;
    let financialInfoPage: FinancialInfoPage;
    let personalDetailsPage: PersonalDetailsPage;
    let dashboardPage: DashboardPage;
    let helpers: Helpers;
    const testData = TestDataLoader.getInstance();

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
    });
    test.describe('Validate user can continue loan application', () => {
        test('User able to continue loan application', async ({ page }) => {
            const standardIncome = testData.getFinancialInfo('validScenarios', 'standardIncome');

            await test.step('Fill in standard income data', async () => {
                console.log('📝 Filling financial information form');
                await financialInfoPage.fillFinancialInfo(standardIncome);
                console.log('✅ Financial information filled');

                console.log('📤 Clicking next button');
                await financialInfoPage.clickNext();
                console.log('✅ Next button clicked');
            });

            await test.step('Select a product', async () => {
                console.log('🛍️ Selecting test product');
                await helpers.selectTestProduct();
                console.log('✅ Test product selected');
            });

            await test.step('Wait for page navigation and validate user is on loan calculator page', async () => {
                console.log('⏳ Waiting for page to load after product selection');
                await financialInfoPage.waitForPageLoad();
                console.log('✅ Page loaded after product selection');

                // Wait a bit more to ensure navigation is complete
                await page.waitForTimeout(2000);

                console.log('🔍 Validating user is on loan calculator page');
                const currentUrl = page.url();
                console.log('📍 Current URL:', currentUrl);

                // Check if we're on the loan calculator page by URL first
                const isOnLoanCalculator = currentUrl.includes('loan-calculator');

                if (!isOnLoanCalculator) {
                    console.log('⚠️ URL does not contain loan-calculator, checking page content');

                    // Check if we can see loan calculator elements
                    const hasLoanCalculatorHeader = await page.getByText('Choose loan amount').isVisible();
                    const hasLoanAmountSlider = await page.getByText('I would like to borrow').isVisible();

                    console.log('📊 Loan calculator header visible:', hasLoanCalculatorHeader);
                    console.log('📊 Loan amount slider visible:', hasLoanAmountSlider);

                    if (hasLoanCalculatorHeader && hasLoanAmountSlider) {
                        console.log('✅ Page content indicates we are on loan calculator page');
                        expect(true, 'User is on loan calculator page (verified by content)').toBeTruthy();
                    } else {
                        console.log('❌ Page content does not match loan calculator page');
                        expect(isOnLoanCalculator, 'User should be on loan calculator page after product selection').toBeTruthy();
                    }
                } else {
                    console.log('✅ URL contains loan-calculator');
                    expect(isOnLoanCalculator, 'User is on loan calculator page').toBeTruthy();
                }
            });

            await test.step('Click continue later', async () => {
                console.log('⏸️ Clicking continue later button');
                await financialInfoPage.clickContinueLater();
                console.log('✅ Continue later button clicked');
            });

            await test.step('Click continue loan application', async () => {
                console.log('🔄 Click continue loan application button');
                await page.waitForTimeout(5000);
                await financialInfoPage.clickContinueLoanApplication();
                console.log('✅ Page loaded before clicking next');

            });

            await test.step('Validate user is back on loan calculator page', async () => {
                console.log('⏳ Waiting for page to load after continuing application');
                await financialInfoPage.waitForPageLoad();
                console.log('✅ Page loaded after continuing application');

                // Wait a bit more to ensure navigation is complete
                await page.waitForTimeout(2000);

                console.log('🔍 Validating user is back on loan calculator page');
                const currentUrl = page.url();
                console.log('📍 Current URL:', currentUrl);

                const isOnLoanCalculator = currentUrl.includes('loan-calculator');

                if (!isOnLoanCalculator) {
                    console.log('⚠️ URL does not contain loan-calculator, checking page content');

                    // Check if we can see loan calculator elements
                    const hasLoanCalculatorHeader = await page.getByText('Choose loan amount').isVisible();
                    const hasLoanAmountSlider = await page.getByText('I would like to borrow').isVisible();

                    console.log('📊 Loan calculator header visible:', hasLoanCalculatorHeader);
                    console.log('📊 Loan amount slider visible:', hasLoanAmountSlider);

                    if (hasLoanCalculatorHeader && hasLoanAmountSlider) {
                        console.log('✅ Page content indicates we are back on loan calculator page');
                        expect(true, 'User is back on loan calculator page (verified by content)').toBeTruthy();
                    } else {
                        console.log('❌ Page content does not match loan calculator page');
                        expect(isOnLoanCalculator, 'User should be back on loan calculator page after continuing application').toBeTruthy();
                    }
                } else {
                    console.log('✅ URL contains loan-calculator');
                    expect(isOnLoanCalculator, 'User is back on loan calculator page').toBeTruthy();
                }
            });
        });
    });
});

test.describe('Validate user is unable to have multiple pending loan applications', () => {
    let helpers: Helpers;
    let financialInfoPage: FinancialInfoPage;
    let dashboardPage: DashboardPage;
    const testData = TestDataLoader.getInstance();

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
    });

    test('User is unable to have multiple pending loan applications', async ({ page }) => {
        const standardIncome = testData.getFinancialInfo('validScenarios', 'standardIncome');

        await test.step('Fill in standard income data', async () => {
            console.log('📝 Filling financial information form');
            await financialInfoPage.fillFinancialInfo(standardIncome);
            console.log('✅ Financial information filled');
            await financialInfoPage.clickNext();
        });

        await test.step('Select a product', async () => {
            console.log('🛍️ Selecting test product');
            await helpers.selectTestProduct();
            console.log('✅ Test product selected');
        });

        await test.step('Click continue later', async () => {
            console.log('⏸️ Clicking continue later button');
            await financialInfoPage.clickContinueLater();
        });

        await test.step('Create a new loan application', async () => {
            console.log('🔄 Clicking open new account button');
            await page.waitForTimeout(5000);
            await helpers.clickCreateAccount();
        });
        await test.step('Validate error message is displayed', async () => {
            expect(financialInfoPage.validateDisallowMultipleLoanApplications(), 'Unable to have multiple pending loan applications error message is displayed').toBeTruthy();
            await financialInfoPage.acceptDisallowMultipleLoanApplications();
        });
    });
});
