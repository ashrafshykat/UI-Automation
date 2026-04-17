import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { AssessmentPage } from '../pages/AssessmentPage';

test.describe('Home Energy Assessment Booking Automation', () => {
    
    test('User successfully navigates and books an assessment', async ({ page }) => {
        const homePage = new HomePage(page);
        const assessmentPage = new AssessmentPage(page);

        await test.step('Navigate to Energy Assessment page', async () => {
            await homePage.navigate();
            await homePage.goToEnergyAssessment();
        });

        await test.step('Fill initial house details', async () => {
            await assessmentPage.fillHouseDetails();
        });
    });
});