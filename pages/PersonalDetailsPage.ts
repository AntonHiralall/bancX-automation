import { BasePage } from "./BasePage";
import { Page } from "@playwright/test";
import { PersonalDetails } from "../test-data/personalDetails.types";

export class PersonalDetailsPage extends BasePage {

    private title = this.page.getByTestId('title').getByRole('button', { name: 'dropdown trigger' });
    private selectTitle = this.page.getByRole('option', { name: 'Dr' });
    private fname = this.page.getByRole('textbox', { name: 'First name' });
    private lname = this.page.getByRole('textbox', { name: 'Last name' });
    private gender = this.page.getByRole('combobox', { name: 'Male' });
    private selectGender = this.page.getByRole('option', { name: 'Male', exact: true });
    private mobileNumber = this.page.getByRole('textbox', { name: 'Mobile number' });
    private email = this.page.getByRole('textbox', { name: 'Email' });
    private dob = this.page.getByRole('combobox', { name: 'Date of birth' });
    private selectDob = this.page.getByRole('gridcell', { name: '18' }).locator('span');
    private countyOfBirth = this.page.getByTestId('countryOfBirth').getByRole('button', { name: 'dropdown trigger' });
    private selectCountryOfBirth = this.page.getByRole('option', { name: 'South Africa' });
    private countryOfCitizenship = this.page.getByTestId('countryOfCitizenship').getByRole('button', { name: 'dropdown trigger' });
    private selectCountryOfCitizenship = this.page.getByTestId('countryOfCitizenship').getByRole('option', { name: 'South Africa' });
    private fnameRequiredErrorMessage = this.page.getByTestId('firstName').getByTestId('validation');
    private lnameRequiredErrorMessage = this.page.getByTestId('lastName').getByTestId('validation');
    private mobileNumberRequiredErrorMessage = this.page.getByTestId('mobileNumber').getByTestId('validation');
    private emailRequiredErrorMessage = this.page.getByTestId('emailAddress').getByTestId('validation');
    private invalidEmailErrorMessage = this.page.getByTestId('emailAddress').getByTestId('validation');
    private submitErroMessage = this.page.locator('div').filter({ hasText: '❗ Validation ErrorPlease' }).nth(1);


    constructor(page: Page) {
        super(page);
    }

    async fillPersonalDetails(personalDetails: PersonalDetails) {
        // Wait for the page to be fully loaded
        await this.waitForPageLoad();

        // Click title dropdown with retry
        await this.page.waitForSelector('[data-testid="title"]');
        await this.title.waitFor({ state: 'visible' });
        await this.title.click({ force: true });

        // Wait for dropdown to be visible and click option
        await this.selectTitle.waitFor({ state: 'visible' });
        await this.selectTitle.click({ force: true });

        await this.fname.fill(personalDetails.fname);
        await this.lname.fill(personalDetails.lname);

        // Click gender dropdown and wait for options to appear
        await this.gender.waitFor({ state: 'visible', timeout: 3000 });
        await this.gender.click();
        await this.selectGender.click();

        await this.mobileNumber.fill(personalDetails.mobileNumber);
        await this.email.fill(personalDetails.email);

        // Click DOB with retry
        await this.dob.waitFor({ state: 'visible' });
        await this.dob.click({ force: true });
        await this.selectDob.waitFor({ state: 'visible' });
        await this.selectDob.click({ force: true });

        // Click country of birth with retry
        await this.countyOfBirth.waitFor({ state: 'visible' });
        await this.countyOfBirth.click({ force: true });
        await this.selectCountryOfBirth.waitFor({ state: 'visible' });
        await this.selectCountryOfBirth.click({ force: true });

        // Click country of citizenship with retry
        await this.countryOfCitizenship.waitFor({ state: 'visible' });
        await this.countryOfCitizenship.click({ force: true });
        await this.selectCountryOfCitizenship.waitFor({ state: 'visible' });
        await this.selectCountryOfCitizenship.click({ force: true });
    }

    async validateFnameRequiredErrorMessage() {
        return await this.fnameRequiredErrorMessage.isVisible();
    }
    async validateLnameRequiredErrorMessage() {
        return await this.lnameRequiredErrorMessage.isVisible();
    }
    async validateMobileNumberRequiredErrorMessage() {
        return await this.mobileNumberRequiredErrorMessage.isVisible();
    }
    async validateEmailRequiredErrorMessage() {
        return await this.emailRequiredErrorMessage.isVisible();
    }
    async validateInvalidEmailErrorMessage() {
        return await this.invalidEmailErrorMessage.isVisible();
    }
    async validateSubmitErrorMessage() {
        return await this.submitErroMessage.isVisible();
    }
}

