import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { AssessmentPage } from '../pages/AssessmentPage';

test.describe('Home Energy Assessment Booking Automation', () => {
    
    test('User successfully navigates and books an assessment', async ({ page }) => {
        const homePage = new HomePage(page);
        const assessmentPage = new AssessmentPage(page);
        
        const testUser = {
            firstName: 'Ashraf',
            lastName: 'Sharif',
            email: 'ashrafshykat1@gmail.com',
            mobile: '01340915337',
            city: 'Dublin'
        };

        await test.step('Navigate to Energy Assessment page', async () => {
            await homePage.navigate();
            await homePage.goToEnergyAssessment();
        });

        await test.step('Fill initial house details', async () => {
            await assessmentPage.fillHouseDetails();
        });

        await test.step('Upload photo and verify success text', async () => {
            await assessmentPage.handlePhotoUpload('dummy-photo.jpg');
            await assessmentPage.verifySuccessText();
        });

        await test.step('Handle popups and fill personal details', async () => {
            await assessmentPage.closePopupsIfAny();
            await assessmentPage.fillPersonalDetails(testUser.firstName, testUser.lastName, testUser.email, testUser.mobile);
        });

        await test.step('Enter property address', async () => {
            await assessmentPage.fillAddressAndSubmit(testUser.city);
        });

        await test.step('Select dynamic calendar date and time', async () => {
            await assessmentPage.selectDateAndTime();
        });

        await test.step('Assert final confirmation details', async () => {
            await assessmentPage.assertEmailOnConfirmation(testUser.email);
        });
    });
});