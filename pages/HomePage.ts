import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async navigate() {
        // Navigate to the base URL
        await this.page.goto('http://52.49.147.125:3005/');
    }

    async goToEnergyAssessment() {
        await this.page.goto('http://52.49.147.125:3005/one-stop-shop-service/home-energy-assessment');
        
        const bookingBtn = this.page.getByRole('button', { name: /Book your Home Energy Assessment/i });
        await bookingBtn.waitFor({ state: 'visible' });
        await bookingBtn.click();
    }
}