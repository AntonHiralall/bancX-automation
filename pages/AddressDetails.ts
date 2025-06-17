import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { AddressDetails } from "../test-data/addressDetails.types";

export class AddressDetailsPage extends BasePage {
    private addressLine1 = this.page.getByTestId('addressLine1').getByRole('textbox', { name: 'Address line' });
    private addressLine2 = this.page.getByRole('textbox', { name: 'Address line 2 (optional)' });
    private suburb = this.page.getByRole('textbox', { name: 'Suburb' });
    private city = this.page.getByRole('textbox', { name: 'City' }); 
    private province = this.page.getByRole('textbox', { name: 'Province' });
    private country = this.page.getByRole('textbox', { name: 'Country' });
    private postalCode = this.page.getByRole('textbox', { name: 'Postal code' });
    private validateAddressLine1Required = this.page.getByTestId('addressLine1').getByTestId('validation');
    private validateSuburbRequired = this.page.getByTestId('suburb').getByTestId('validation');
    private validateCityRequired = this.page.getByTestId('city').getByTestId('validation');
    private validateProvinceRequired = this.page.getByTestId('region').getByTestId('validation');
    private validateCountryRequired = this.page.getByTestId('country').getByTestId('validation');
    private validatePostalCodeRequired = this.page.getByTestId('postalCode').getByTestId('validation');
    private formFieldError = this.page.locator('div').filter({ hasText: '❗ Validation ErrorPlease' }).nth(1);

    constructor(page: Page) {
        super(page);
    }

    async fillAddressDetails(addressDetails: AddressDetails) {
        await this.addressLine1.fill(addressDetails.addressLine1);
        if (addressDetails.addressLine2) {
            await this.addressLine2.fill(addressDetails.addressLine2);
        }
        await this.suburb.fill(addressDetails.suburb);
        await this.city.fill(addressDetails.city);
        await this.province.fill(addressDetails.province);
        await this.country.fill(addressDetails.country);
        await this.postalCode.fill(addressDetails.postalCode);
        await this.clickNext();
    }

    async validateRequiredFields() {
        await expect(this.validateAddressLine1Required).toBeVisible();
        await expect(this.validateSuburbRequired).toBeVisible();
        await expect(this.validateCityRequired).toBeVisible();
        await expect(this.validateProvinceRequired).toBeVisible();
        await expect(this.validateCountryRequired).toBeVisible();
        await expect(this.validatePostalCodeRequired).toBeVisible();
        await expect(this.formFieldError).toBeVisible();
    }

    async validateErrorMessageNotVisible() {
        await expect(this.validateAddressLine1Required).not.toBeVisible();
        await expect(this.validateSuburbRequired).not.toBeVisible();
        await expect(this.validateCityRequired).not.toBeVisible();
        await expect(this.validateProvinceRequired).not.toBeVisible();
        await expect(this.validateCountryRequired).not.toBeVisible();
        await expect(this.validatePostalCodeRequired).not.toBeVisible();
    }
    
}