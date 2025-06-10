import { FinancialInfo, FinancialInfoData } from '../test-data/financialInfo.types';
import { PersonalDetailsData } from '../test-data/personalDetails.types';
import * as fs from 'fs';
import * as path from 'path';

export class TestDataLoader {
    private static instance: TestDataLoader;
    private financialInfoData: FinancialInfoData;
    private personalDetailsData: PersonalDetailsData;

    private constructor() {
        const dataPath = path.join(process.cwd(), 'test-data', 'financialInfo.json');
        const rawData = fs.readFileSync(dataPath, 'utf-8');
        this.financialInfoData = JSON.parse(rawData);
        this.personalDetailsData = require('../test-data/personalDetails.json');
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

    public getPersonalDetails(category: keyof PersonalDetailsData, scenario: string) {
        return this.personalDetailsData[category][scenario];
    }
} 