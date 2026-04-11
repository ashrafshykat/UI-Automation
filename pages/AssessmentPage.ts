import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import * as path from 'path';

export class AssessmentPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async fillHouseDetails() {
        await this.page.getByLabel(/Semi-datached|Semi-detached/i).check(); 
        await this.page.getByLabel('2', { exact: true }).check();
        await this.page.getByLabel('Yes', { exact: true }).first().check(); 
        await this.page.getByLabel('No', { exact: true }).last().check();  
    }

    async handlePhotoUpload(fileName: string) {
        const noPhotoCheckbox = this.page.getByLabel(/I don‘t have a photo to hand/i);
        if (await noPhotoCheckbox.isChecked()) {
            await noPhotoCheckbox.uncheck();
        }
        const filePath = path.resolve(__dirname, `../assets/${fileName}`);
        await this.page.locator('input[type="file"]').setInputFiles(filePath);
        await this.page.getByRole('button', { name: 'Next' }).click();
    }

    async verifySuccessText() {
        const successMessage = this.page.getByText('Your first step to a warm, comfortable, and healthy home');
        await expect(successMessage).toBeVisible();
    }

    async closePopupsIfAny() {
        const closeBtn = this.page.locator('.close-button'); 
        if (await closeBtn.isVisible({ timeout: 3000 })) {
            await closeBtn.click();
        }
    }

    async fillPersonalDetails(firstName: string, lastName: string, email: string, mobile: string) {
        await this.page.getByRole('button', { name: 'Next' }).click();
        await this.page.getByPlaceholder(/First Name/i).fill(firstName);
        await this.page.getByPlaceholder(/Last Name/i).fill(lastName);
        await this.page.getByPlaceholder(/Email/i).fill(email);
        await this.page.getByPlaceholder(/Mobile/i).fill(mobile);
    }

    async fillAddressAndSubmit(city: string) {
        await this.page.getByPlaceholder(/Property Address/i).fill(city);
        const dropdownOption = this.page.locator('.address-dropdown-option').first(); 
        await dropdownOption.waitFor({ state: 'visible' });
        await dropdownOption.click();
        await this.page.getByRole('button', { name: 'Next' }).click();
    }

    async selectDateAndTime() {
        const availableDates = this.page.locator('.calendar-day:not(.disabled)'); 
        if (await availableDates.count() === 0) {
            await this.page.locator('.next-month-button').click(); 
            await this.page.waitForTimeout(1000); 
        }
        await this.page.locator('.calendar-day:not(.disabled)').first().click(); 
        await this.page.getByText(/Morning|Afternoon/i).first().click();
        await this.page.getByRole('button', { name: 'Later' }).click();
    }

    async assertEmailOnConfirmation(expectedEmail: string) {
        const modal = this.page.locator('.confirmation-modal'); 
        await expect(modal).toContainText(expectedEmail);
    }
}