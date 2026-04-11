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
        // 1. Hover over the menu instead of clicking
        await this.page.getByText('Our Services').first().hover();
        
        // 2. Wait half a second for the CSS dropdown animation to finish
        await this.page.waitForTimeout(500);
        
        // 3. Target the exact link path that Playwright found in the error logs
        await this.page.locator('a[href="/one-stop-shop-service/home-energy-assessment"]').first().click({ force: true });
        
        // 4. Click the final booking button
        await this.page.getByRole('button', { name: /Book your Home Energy Assessment/i }).click();
    }
}