import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async navigate() {
        await this.page.goto('http://52.49.147.125:3005/');
    }

    async goToEnergyAssessment() {
        await this.page.getByText('Our Services').first().click();
        await this.page.getByText(/Home Energy Assessment/i).click();
        await this.page.getByRole('button', { name: /Book your Home Energy Assessment/i }).click();
    }
}