export interface AddressDetails {
    addressLine1: string;
    addressLine2?: string;
    suburb: string;
    city: string;
    province: string;
    country: string;
    postalCode: string;
}

export interface AddressDetailsTestData {
    validScenarios: {
        standardAddress: AddressDetails;
        addressWithLine2: AddressDetails;
        longAddress: AddressDetails;
        shortAddress: AddressDetails;
    };
    invalidScenarios: {
        emptyFields: AddressDetails;
        invalidPostalCode: AddressDetails;
        invalidCity: AddressDetails;
        specialCharacters: AddressDetails;
    };
    edgeCases: {
        maximumLengthAddress: AddressDetails;
        minimumLengthAddress: AddressDetails;
        internationalAddress: AddressDetails;
    };
} 