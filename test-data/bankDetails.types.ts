export interface BankDetails {
    bank: string;
    branch: string;
    accountType: string;
    accountNumber: string;
    accountHolderName: string;
}

export interface BankDetailsTestData {
    validScenarios: {
        standardDetails: BankDetails;
        longAccountNumber: BankDetails;
        shortAccountNumber: BankDetails;
    };
    invalidScenarios: {
        invalidAccountNumber: BankDetails;
        invalidAccountHolderName: BankDetails;
        emptyFields: BankDetails;
    };
    edgeCases: {
        maximumLengthAccountNumber: BankDetails;
        minimumLengthAccountNumber: BankDetails;
        specialCharactersAccountHolder: BankDetails;
    };
} 