import { expect, test } from '../fixtures/custom-fixtures';

test.describe('Login Test Future', () => {

    test.beforeEach(async ({ homePage }) => {
        console.log('Trang Home - Nhấn đăng nhập')
        await homePage.navigateTo('https://demo1.cybersoft.edu.vn/'); //Step 1: Navigate to https://demo1.cybersoft.edu.vn/
        await homePage.topBarNagivation.navigateLoginPage(); //Step 2: Click 'Dang nhap' lick Button
    })

    test('Verify Login Successfully', async ({ homePage, loginPage }) => {
        console.log('Verify Login Successfully');
        await loginPage.login('thienpc14112025', 'thienpc@12345');//Step 3: Enter account, password Click 'Dang nhap' Button
        //Step 4: Verify Valid Login Successfully
        await expect(loginPage.getLblLoginMsgLocator()).toBeVisible(); //VP1: 'Dang nhap thanh cong' message display
        await expect(homePage.topBarNagivation.getUserProfileLocator('phamcongthien')).toBeVisible();//VP2: user profile displays on the stop right
    })

    test('Login with invalid password', async ({ loginPage }) => {
        console.log('Login with invalid password');
        await loginPage.login('thienpc14112025', 'password');//Step 3: Enter account, with invalid password Click 'Dang nhap' Button
        //Step 4: Verify invalid password
        await expect(loginPage.getlblMsgInvalid()).toBeVisible(); //VP: message 'Tài khoản hoặc mật khẩu không' 
    })

    test('Login with non-existent account', async ({ loginPage }) => {
        console.log('Login with non-existent account');
        await loginPage.login('account', 'password');//Step 3: Enter non-existent account, password Click 'Dang nhap' Button
        //Step 4: Verify non-existent account
        await expect(loginPage.getlblMsgInvalid()).toBeVisible(); //VP: message 'Tài khoản hoặc mật khẩu không'
    })

    test('Login with empty account and password', async ({ loginPage }) => {
        console.log('Login with empty account and password');
        await loginPage.login('', '');//Step 3: empty account and password Click 'Dang nhap' Button
        //Step 4: Verify empty account and password
        await expect(loginPage.gettxterrorAccount()).toBeVisible();
        await expect(loginPage.gettxterrorPassword()).toBeVisible();
    })

    test('Login with leading spaces in account', async ({ loginPage }) => {
        console.log('Login with leading spaces in account');
        await loginPage.login(' thienpc14112025', 'thienpc@12345');//Step 3: leading spaces in account and password Click 'Dang nhap' Button
        //Step 4: Verify leading spaces in account
        await expect(loginPage.getlblMsgInvalid()).toBeVisible();
    })

    test('Login with trailing spaces in account', async ({ homePage, loginPage }) => {
        console.log('Login with trailing spaces in account');
        await loginPage.login('thienpc14112025   ', 'thienpc@12345');//Step 3: trailing spaces in account and password Click 'Dang nhap' Button
        //Step 4: Verify trailing spaces in account
        await expect(loginPage.getLblLoginMsgLocator()).toBeVisible(); //VP1: 'Dang nhap thanh cong' message display
        await expect(homePage.topBarNagivation.getUserProfileLocator('phamcongthien')).toBeVisible();//VP2: user profile displays on the stop right
    })

    test('Verify remember account enabled', async ({ homePage, loginPage }) => {
        console.log('Verify Remember account enabled');
        await loginPage.loginRemember('thienpc14112025', 'thienpc@12345');//Step 3: trailing spaces in account and password Click 'Dang nhap' Button
        await homePage.topBarNagivation.logout(); //Step 4: Logout
        await homePage.topBarNagivation.navigateLoginPage();//Step 5:Đăng nhập lại
        //Step 6: Verify Account and pass have value
        await loginPage.verifyFieldsHaveValue();
    })

    test('Verify "Bạn chưa có tài khoản? Đăng ký" link', async ({ loginPage, registerPage }) => {
        console.log('Verify "Bạn chưa có tài khoản? Đăng ký" link');
        await loginPage.clickregist();//Step 3: 'Click Bạn chưa có tài khoản? Đăng ký'
        //Step 4: Verify Navigate to registration screen
        await registerPage.verifyPopupRegisterVisible();
    })

    test.afterEach(async ({ page }) => {
        console.log('Kết thúc testcase')
    })

})



