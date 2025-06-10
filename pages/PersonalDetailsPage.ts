import { BasePage } from "./BasePage";
import { Page, expect } from "@playwright/test";
import { PersonalDetails } from "../test-data/personalDetails.types";

export class PersonalDetailsPage extends BasePage {

    private title = this.page.getByTestId('title').getByRole('button', { name: 'dropdown trigger' });
    private selectTitle = this.page.getByRole('option', { name: 'Dr' });
    private fname = this.page.getByRole('textbox', { name: 'First name' });
    private lname = this.page.getByRole('textbox', { name: 'Last name' });
    private gender = this.page.getByTestId('gender').getByRole('button', { name: 'dropdown trigger' });
    private selectGender = this.page.getByRole('option', { name: 'Male', exact: true });
    private mobileNumber = this.page.getByRole('textbox', { name: 'Mobile number' });
    private email = this.page.getByRole('textbox', { name: 'Email' });
    private dob = this.page.getByRole('combobox', { name: 'Date of birth' });
    private selectDob = this.page.getByRole('gridcell', { name: '18' }).locator('span');
    private countyOfBirth = this.page.getByTestId('countryOfBirth').getByRole('button', { name: 'dropdown trigger' });
    private selectCountryOfBirth = this.page.getByRole('option', { name: 'South Africa' });
    private countryOfCitizenship = this.page.getByTestId('countryOfCitizenship').getByRole('button', { name: 'dropdown trigger' });
    private selectCountryOfCitizenship = this.page.getByRole('option', { name: 'South Africa' });
    private fnameRequiredErrorMessage = this.page.getByTestId('firstName').getByTestId('validation');
    private lnameRequiredErrorMessage = this.page.getByTestId('lastName').getByTestId('validation');
    private mobileNumberRequiredErrorMessage = this.page.getByTestId('mobileNumber').getByTestId('validation');
    private emailRequiredErrorMessage = this.page.getByTestId('emailAddress').getByTestId('validation');
    private requiredErrorMessage = 'This field is required';
    private invalidEmailErrorMessage = this.page.getByTestId('emailAddress').getByTestId('validation');
    private submitErroMessage = this.page.locator('div').filter({ hasText: '❗ Validation ErrorPlease' }).nth(1);


    constructor(page: Page) {
        super(page);
    }

    async fillPersonalDetails(personalDetails: PersonalDetails) {
        await this.title.click();
        await this.selectTitle.click();
        await this.fname.fill(personalDetails.fname);
        await this.lname.fill(personalDetails.lname);
        await this.gender.click();
        await this.selectGender.click();
        await this.mobileNumber.fill(personalDetails.mobileNumber);
        await this.email.fill(personalDetails.email);
        await this.dob.click();
        await this.selectDob.click();
        await this.countyOfBirth.click();
        await this.selectCountryOfBirth.click();
        await this.countryOfCitizenship.click();
        await this.selectCountryOfCitizenship.click();
        await this.clickNext();
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

