export interface FinancialInfo {
    grossMonthlyIncome: string;
    monthlyNetIncome: string;
    monthlyExpenses: string;
    payDay: string;
    loanReason: string;
    termsAndConditions: boolean;
}

export interface FinancialInfoData {
    validScenarios: {
        standardIncome: FinancialInfo;
        highIncome: FinancialInfo;
        lowIncome: FinancialInfo;
    };
    invalidScenarios: {
        emptyFields: FinancialInfo;
        specialCharacters: FinancialInfo;
        invalidAmounts: FinancialInfo;
        negativeAmounts: FinancialInfo;
    };
    edgeCases: {
        maximumAmounts: FinancialInfo;
        minimumAmounts: FinancialInfo;
        zeroAmounts: FinancialInfo;
    };
} 