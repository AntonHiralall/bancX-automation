import { FinancialInfo, FinancialInfoData } from '../test-data/financialInfo.types';
import { PersonalDetailsData } from '../test-data/personalDetails.types';
import { BankDetails, BankDetailsTestData } from '../test-data/bankDetails.types';
import { AddressDetails, AddressDetailsTestData } from '../test-data/addressDetails.types';
import * as fs from 'fs';
import * as path from 'path';

export class TestDataLoader {
    private static instance: TestDataLoader;
    private financialInfoData: FinancialInfoData;
    private personalDetailsData: PersonalDetailsData;
    private bankDetailsData: BankDetailsTestData;
    private addressDetailsData: AddressDetailsTestData;

    private constructor() {
        const financialInfoPath = path.join(process.cwd(), 'test-data', 'financialInfo.json');
        const rawFinancialData = fs.readFileSync(financialInfoPath, 'utf-8');
        this.financialInfoData = JSON.parse(rawFinancialData);
        
        this.personalDetailsData = require('../test-data/personalDetails.json');
        this.bankDetailsData = require('../test-data/bankDetails.json');
        this.addressDetailsData = require('../test-data/addressDetails.json');
    }

    public static getInstance(): TestDataLoader {
        if (!TestDataLoader.instance) {
            TestDataLoader.instance = new TestDataLoader();
        }
        return TestDataLoader.instance;
    }

    /**
     * Get a specific financial info scenario
     * @param category The category of the scenario (validScenarios, invalidScenarios, etc.)
     * @param scenario The specific scenario name
     * @returns The financial info data for the specified scenario
     */
    public getFinancialInfo(category: keyof FinancialInfoData, scenario: string): FinancialInfo {
        return this.financialInfoData[category][scenario as keyof typeof this.financialInfoData[typeof category]];
    }

    /**
     * Get all scenarios from a specific category
     * @param category The category of scenarios to get
     * @returns An array of all scenarios in the specified category
     */
    public getAllScenarios(category: keyof FinancialInfoData): FinancialInfo[] {
        return Object.values(this.financialInfoData[category]);
    }

    /**
     * Get all valid scenarios
     * @returns An array of all valid scenarios
     */
    public getValidScenarios(): FinancialInfo[] {
        return this.getAllScenarios('validScenarios');
    }

    /**
     * Get all invalid scenarios
     * @returns An array of all invalid scenarios
     */
    public getInvalidScenarios(): FinancialInfo[] {
        return this.getAllScenarios('invalidScenarios');
    }

    /**
     * Get all edge cases
     * @returns An array of all edge cases
     */
    public getEdgeCases(): FinancialInfo[] {
        return this.getAllScenarios('edgeCases');
    }

    /**
     * Get personal details for a specific scenario
     * @param category The category of the scenario
     * @param scenario The specific scenario name
     * @returns The personal details data for the specified scenario
     */
    public getPersonalDetails(category: keyof PersonalDetailsData, scenario: string) {
        return this.personalDetailsData[category][scenario];
    }

    /**
     * Get bank details for a specific scenario
     * @param category The category of the scenario
     * @param scenario The specific scenario name
     * @returns The bank details data for the specified scenario
     */
    public getBankDetails(category: keyof BankDetailsTestData, scenario: string): BankDetails {
        return this.bankDetailsData[category][scenario as keyof typeof this.bankDetailsData[typeof category]];
    }

    /**
     * Get all bank details scenarios from a specific category
     * @param category The category of scenarios to get
     * @returns An array of all bank details scenarios in the specified category
     */
    public getAllBankDetailsScenarios(category: keyof BankDetailsTestData): BankDetails[] {
        return Object.values(this.bankDetailsData[category]);
    }

    /**
     * Get address details for a specific scenario
     * @param category The category of the scenario
     * @param scenario The specific scenario name
     * @returns The address details data for the specified scenario
     */
    public getAddressDetails(category: keyof AddressDetailsTestData, scenario: string): AddressDetails {
        return this.addressDetailsData[category][scenario as keyof typeof this.addressDetailsData[typeof category]];
    }

    /**
     * Get all address details scenarios from a specific category
     * @param category The category of scenarios to get
     * @returns An array of all address details scenarios in the specified category
     */
    public getAllAddressDetailsScenarios(category: keyof AddressDetailsTestData): AddressDetails[] {
        return Object.values(this.addressDetailsData[category]);
    }
} 