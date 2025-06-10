export interface PersonalDetails {
    fname: string;
    lname: string;
    mobileNumber: string;
    email: string;
}

export interface PersonalDetailsData {
    validScenarios: {
        standardDetails: PersonalDetails;
        longNameDetails: PersonalDetails;
        shortNameDetails: PersonalDetails;
    };
    invalidScenarios: {
        emptyFields: PersonalDetails;
        invalidEmail: PersonalDetails;
        invalidMobile: PersonalDetails;
        specialCharacters: PersonalDetails;
    };
} 