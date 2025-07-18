import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import * as path from 'path';

export class DocumentUploadsPage extends BasePage {
    private uploadIdDocument = this.page.locator('document-uploader').filter({ hasText: 'Identity Document Upload' }).getByLabel('icon button plus-circle');
    private uploadPayslip = this.page.locator('document-uploader').filter({ hasText: 'Latest Customer Payslip' }).getByLabel('icon button plus-circle');
    private uploadBankStatements = this.page.locator('document-uploader').filter({ hasText: 'Last 3 Months Bank Statements' }).getByRole('button', { name: 'icon button plus-circle' });
    // Identity Document section
    private readonly identityDocumentViewButton = this.page.locator('div').filter({ hasText: /^301c650e-a222-42e1-9cce-0e6d58bfd775View$/ }).getByTestId('empty');
    private readonly identityDocumentOpenButton = this.page.locator('document-uploader').filter({ hasText: 'Identity Document Upload' }).getByTestId('loaded');

    // Latest Customer Payslip section
    private readonly payslipViewButton = this.page.locator('div').filter({ hasText: /^a12f1216-f531-4f66-be6d-4a9578bed57fView$/ }).getByTestId('empty');
    private readonly payslipOpenButton = this.page.locator('document-uploader').filter({ hasText: 'Latest Customer Payslip' }).getByTestId('loaded');

    // Bank Statements section
    private readonly bankStatementsViewButton = this.page.locator('div').filter({ hasText: /^887005e3-fbbf-4f3a-ba81-427b2f9456afView$/ }).getByTestId('empty');
    private readonly bankStatementsOpenButton = this.page.locator('document-uploader').filter({ hasText: 'Last 3 Months Bank Statements' }).getByTestId('loaded');

    constructor(page: Page) {
        super(page);
    }

    /**
     * Upload a document by its type
     * @param documentType The type of document to upload ('id', 'payslip', or 'bankStatements')
     * @param filePath The path to the file to upload
     */
    async uploadDocument(documentType: 'id' | 'payslip' | 'bankStatements', filePath: string) {
        // Convert relative path to absolute path
        const absolutePath = path.resolve(process.cwd(), filePath);
        
        // Click the appropriate upload button based on document type
        switch (documentType) {
            case 'id':
                await this.uploadIdDocument.click();
                await this.page.locator('document-uploader').filter({ hasText: 'Identity Document Upload' }).getByTestId('upload-input').setInputFiles(absolutePath);
                break;
            case 'payslip':
                await this.uploadPayslip.click();
                await this.page.locator('document-uploader').filter({ hasText: 'Latest Customer Payslip' }).getByTestId('upload-input').setInputFiles(absolutePath);
                break;
            case 'bankStatements':
                await this.uploadBankStatements.click();
                await this.page.locator('document-uploader').filter({ hasText: 'Last 3 Months Bank Statements' }).getByTestId('upload-input').setInputFiles(absolutePath);
                break;
        }

        // Wait for upload to complete
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Upload multiple bank statements
     * @param filePaths Array of paths to the bank statement files
     */
    async uploadMultipleBankStatements(filePaths: string[]) {
        for (const filePath of filePaths) {
            const absolutePath = path.resolve(process.cwd(), filePath);
            await this.uploadBankStatements.click();
            await this.page.locator('document-uploader').filter({ hasText: 'Last 3 Months Bank Statements' }).getByTestId('upload-input').setInputFiles(absolutePath);
            await this.page.waitForLoadState('networkidle');
        }
    }

    // Methods for document interactions
    async clickIdentityDocumentView() {
        this.identityDocumentViewButton.waitFor({state: "visible", timeout: 5000})
        await this.identityDocumentViewButton.click();
    }

    async clickIdentityDocumentOpen() {
        await this.identityDocumentOpenButton.waitFor({ state: 'visible', timeout: 5000 });
        await this.identityDocumentOpenButton.click();
    }

    async clickPayslipView() {
        this.payslipViewButton.waitFor({state: "visible", timeout: 5000})
        await this.payslipViewButton.click();
    }

    async clickPayslipOpen() {
        await this.payslipOpenButton.waitFor({ state: 'visible', timeout: 5000 });
        await this.payslipOpenButton.click();
    }

    async clickBankStatementsView() {
        this.bankStatementsViewButton.waitFor({state: "visible", timeout: 5000})
        await this.bankStatementsViewButton.click();
    }

    async clickBankStatementsOpen() {
        await this.bankStatementsOpenButton.waitFor({ state: 'visible', timeout: 5000 });
        await this.bankStatementsOpenButton.click();
    }

    // Getters for assertions
    get identityDocumentViewLocator() {
        return this.identityDocumentViewButton;
    }

    get payslipViewLocator() {
        return this.payslipViewButton;
    }

    get bankStatementsViewLocator() {
        return this.bankStatementsViewButton;
    }
}