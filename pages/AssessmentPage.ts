import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import * as path from 'path';

export class AssessmentPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async fillHouseDetails() {
    await this.page.getByText('Semi-Detached', { exact: true }).click();
    }

    async handlePhotoUpload(fileName: string) {
        const checkboxLabel = this.page.locator('p.app-form--checkbox-text', { hasText: /I don.t have a photo/i });
        const input = this.page.locator('input[name="noPhotoChecked"]');
        
        if (await input.isChecked()) {
            await checkboxLabel.click();
        }
        const filePath = path.resolve(__dirname, `../assets/${fileName}`);
        const fileInput = this.page.locator('#image-upload');
        await expect(fileInput).toBeEnabled({ timeout: 5000 });
        await fileInput.setInputFiles(filePath);   
    }
}