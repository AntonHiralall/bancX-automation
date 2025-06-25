import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { Helpers } from '../utils/helpers';
import { DocumentUploadsPage } from '../pages/DocumentUploads';
import { FinancialInfoPage } from '../pages/FinancialInfoPage';
import { TestDataLoader } from '../utils/testDataLoader';

test.describe.skip('Document Upload Tests', () => {
    let documentUploadsPage: DocumentUploadsPage;
    let helpers: Helpers;
    let financialInfoPage: FinancialInfoPage;

    test.beforeEach(async ({ page }) => {
        // Login and navigate to financial info page
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLogin();
        await loginPage.login();


        // Cancel any existing application
        // Initialize helpers
        helpers = new Helpers(page);
        await helpers.cancelExistingApplication();

        // Click create account
        await helpers.clickCreateAccount();

        // Initialize test data loader
        const testDataLoader = TestDataLoader.getInstance();

        // Capture financial info page
        financialInfoPage = new FinancialInfoPage(page);
        await financialInfoPage.waitForPageLoad();

        // Fill in standard income data
        const standardIncome = testDataLoader.getFinancialInfo('validScenarios', 'standardIncome');
        await page.waitForLoadState('networkidle');
        await financialInfoPage.fillFinancialInfo(standardIncome);
        await financialInfoPage.clickNext();

        // Select test product
        await helpers.selectTestProduct();

        // Initialize document uploads page
        documentUploadsPage = new DocumentUploadsPage(page);



        // Click next on calculator screen
        await documentUploadsPage.clickNext();
        // Click next on next steps screen
        await documentUploadsPage.clickNext();
        // Click next on personal details page
        await documentUploadsPage.clickNext();
        // Click next on address details page
        await documentUploadsPage.clickNext();
        // Click next on bank details page
        await documentUploadsPage.clickNext();


    });

    test.describe('Valid Scenarios', () => {
        test('Should successfully upload documents', async () => {
            await documentUploadsPage.uploadDocument('id', 'test-data/documents/Sample ID.jpg');
            await documentUploadsPage.uploadDocument('payslip', 'test-data/documents/Sample payslip A.png');
            await expect(documentUploadsPage.identityDocumentViewLocator).toBeVisible();
            await expect(documentUploadsPage.payslipViewLocator).toBeVisible();
            await expect(documentUploadsPage.bankStatementsViewLocator).toBeVisible();
        });
    });

    test('Should successfully upload multiple bank statements', async () => {
        await documentUploadsPage.uploadMultipleBankStatements(['test-data/documents/Sample bank statement page 1.jpg', 'test-data/documents/Sample bank statement page 2.jpg', 'test-data/documents/Sample bank statement page 3.pdf']);
    });

    test('Should successfully open uploaded documents', async () => {
        await documentUploadsPage.clickIdentityDocumentView();
        await documentUploadsPage.clickIdentityDocumentOpen();
        await documentUploadsPage.clickPayslipView();
        await documentUploadsPage.clickPayslipOpen();
        await documentUploadsPage.clickBankStatementsView();
        await documentUploadsPage.clickBankStatementsOpen();
        await documentUploadsPage.clickNext();

    });
    test('Match retry snapshot', async () => {
        await documentUploadsPage.clickNext();
        await documentUploadsPage.validateRetrySnapshot();
    });
    test('Match help and support snapshot', async () => {
        await documentUploadsPage.clickNext();
        await documentUploadsPage.clickContactSupport();
        await documentUploadsPage.validateSupportPageHeader();
        await documentUploadsPage.validateHelpAndSupportSnapshot();
    });
});


// Add help and support page tests
// Add allure reporting