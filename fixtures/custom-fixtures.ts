import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { BookingPage } from '../pages/BookingPage';
import { DetailPage } from '../pages/DetailPage';

type MyFixtures = {
    homePage: HomePage;
    loginPage: LoginPage;
    registerPage: RegisterPage;
    authenticatedPage: LoginPage;
    bookingPage : BookingPage;
    detailPage : DetailPage;
};

export const test = base.extend<MyFixtures>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },

    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    registerPage: async ({ page }, use) => {
        const registerPage = new RegisterPage(page);
        await use(registerPage);
    },

    detailPage: async ({ page }, use) => {
        const detailPage = new DetailPage(page);
        await use(detailPage);
    },

    bookingPage: async ({ page }, use) => {
        const bookingPage = new BookingPage(page);
        await use(bookingPage);
    },

    authenticatedPage: async ({ page, homePage }, use) => {
        const loginPage = new LoginPage(page);
        await homePage.navigateTo('https://demo1.cybersoft.edu.vn/');
        await homePage.topBarNagivation.navigateLoginPage();
        await loginPage.login("thienpc14112025", "thienpc@12345");
        await use(loginPage);
    },
});
export { expect } from '@playwright/test';