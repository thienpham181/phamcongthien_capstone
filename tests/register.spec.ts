import { expect, test } from '../fixtures/custom-fixtures';
import { LoginPage } from '../pages/LoginPage';
import { generateAccount } from '../pages/utils';

test.describe('Register Test Future', () => {

    test.beforeEach(async ({ homePage }) => {
        console.log('Trang Home')
        await homePage.navigateTo('https://demo1.cybersoft.edu.vn/'); //Step 1: Navigate to https://demo1.cybersoft.edu.vn/
        await homePage.topBarNagivation.navigateRegisterPage(); //Step 2: Click 'Dang ký' lick Button
    })

    test('Verify Register Successfully', async ({ registerPage }) => {
        console.log('Verify Register Successfully');
        const account = generateAccount();
        const email = `${account}@gmail.com`;
        //Step 3: Enter account, password, confirmpassword,name,email và  Click 'Dang ky' Button
        await registerPage.register(account, 'thienpc@12345', 'thienpc@12345', 'thienpc', email);
        //Step 4: Verify Valid Register Successfully
        await expect(registerPage.getlblRegisterMsg()).toBeVisible(); //VP: 'Dang ký thanh cong' message display
    })

    test('Verify Register with existing account', async ({ registerPage }) => {
        console.log('Verify Register with existing account');
        const account = 'thienpc14112025';
        const email = `${account}@gmail.com`;
        //Step 3: Enter account, password, confirmpassword,name,email và  Click 'Dang ky' Button
        await registerPage.register(account, 'thienpc@12345', 'thienpc@12345', 'thienpc', email);
        //Step 4: Verify invalid password
        await expect(registerPage.getlblMsgInvalidAccount()).toBeVisible(); //message 'Tài khoản đã tồn tại' 
    })

    test('Verify Register with Incorrect confirm password', async ({ registerPage }) => {
        console.log('Verify Register with Incorrect confirm password');
        const account = generateAccount();
        const email = `${account}@gmail.com`;
        //Step 3: Enter account, password, Incorrect confirmpassword,name,email và  Click 'Dang ky' Button
        await registerPage.register(account, 'thienpc@12345', 'password', 'thienpc', email);
        //Step 4: Verify Incorrect confirmpassword
        await expect(registerPage.getlblMsgIncorrtRePass()).toBeVisible(); //message Mật khẩu không khớp! 
    })

    test('Verify Register with empty account', async ({ registerPage }) => {
        console.log('Verify Register with empty account');
        const account = generateAccount();
        const email = `${account}@gmail.com`;
        //Step 3: Enter password, confirmpassword,name,email và  Click 'Dang ky' Button
        await registerPage.register('', 'thienpc@12345', 'thienpc@12345', 'thienpc', email);
        //Step 4: Verify empty account
        await expect(registerPage.getlblMsgEmptyAccount()).toBeVisible(); //message Đây là trường bắt buộc !
    })

    test('Verify Register with empty password', async ({ registerPage }) => {
        console.log('Verify Register with empty password');
        const account = generateAccount();
        const email = `${account}@gmail.com`;
        //Step 3: Enter account, confirmpassword,name,email và  Click 'Dang ky' Button
        await registerPage.register(account, '', 'thienpc@12345', 'thienpc', email);
        //Step 4: Verify empty password
        await expect(registerPage.getlblMsgEmptyPassword()).toBeVisible(); //message Đây là trường bắt buộc !
    })

    test('Verify Register with empty confirm password', async ({ registerPage }) => {
        console.log('Verify Register with empty confirm password');
        const account = generateAccount();
        const email = `${account}@gmail.com`;
        //Step 3: Enter account, password,name,email và  Click 'Dang ky' Button
        await registerPage.register(account, 'thienpc@12345', '', 'thienpc', email);
        //Step 4: Verify empty confirm password
        await expect(registerPage.getlblMsgEmptyConfirmPass()).toBeVisible(); //message Đây là trường bắt buộc !
    })

    test('Verify Register with empty name', async ({ registerPage }) => {
        console.log('Verify Register with empty name');
        const account = generateAccount();
        const email = `${account}@gmail.com`;
        //Step 3: Enter account, password,name,email và  Click 'Dang ky' Button
        await registerPage.register(account, 'thienpc@12345', 'thienpc@12345', '', email);
        //Step 4: Verify empty name
        await expect(registerPage.getlblMsgEmptyName()).toBeVisible(); //message Đây là trường bắt buộc !
    })

    test('Verify Register with empty email', async ({ registerPage }) => {
        console.log('Verify Register with empty email');
        const account = generateAccount();
        const email = `${account}@gmail.com`;
        //Step 3: Enter account, password,name,email và  Click 'Dang ky' Button
        await registerPage.register(account, 'thienpc@12345', 'thienpc@12345', 'thienpc', '');
        //Step 4: Verify empty email
        await expect(registerPage.getlblMsgEmptyEmail()).toBeVisible(); //message Đây là trường bắt buộc !
    })

    test('Verify Register with empty all fields', async ({ registerPage }) => {
        console.log('Verify Register with with empty all fields');
        //Step 3: Enter account, password, Incorrect confirmpassword,name,email và  Click 'Dang ky' Button
        await registerPage.clickRegister();
        //Step 4: Verify empty fields
        await registerPage.verifyFullEmty(); //message Đây là trường bắt buộc !
    })

    test('Verify Register with existing email', async ({ registerPage }) => {
        console.log('Verify Register with existing email');
        const account = generateAccount();
        const email = `${account}@gmail.com`;
        //Step 3: Enter account, password,name,email và  Click 'Dang ky' Button
        await registerPage.register(account, 'thienpc@12345', 'thienpc@12345', 'thienpc', 'thienpc@gmail.com');
        //Step 4: Verify existing email
        await expect(registerPage.getlblMsgInvalidEmail()).toBeVisible(); //message Email đã tồn tại!
    })

    test('Verify Register with short password', async ({ registerPage }) => {
        console.log('Verify Register with short password');
        const account = generateAccount();
        const email = `${account}@gmail.com`;
        //Step 3: Enter account, password,name,email và  Click 'Dang ky' Button
        await registerPage.register(account, '12345', '12345', 'thienpc', email);
        //Step 4: Verify short password
        await expect(registerPage.getlblMsgShortPass()).toBeVisible(); //message Email đã tồn tại!
    })

    test('Verify Register with invalid name', async ({ registerPage }) => {
        console.log('Verify Register with invalid name');
        const account = generateAccount();
        const email = `${account}@gmail.com`;
        //Step 3: Enter account, password,name,email và  Click 'Dang ky' Button
        await registerPage.register(account, 'thienpc@12345', 'thienpc@12345', '123456', email);
        //Step 4: Verify invalid name
        await expect(registerPage.getlblMsgInvalidName()).toBeVisible(); //message Email đã tồn tại!
    })

    test('Verify "Bạn đã có tài khoản? Đăng nhập" link', async ({ loginPage, registerPage }) => {
        console.log('Verify "Bạn đã có tài khoản? Đăng nhập" link');
        await registerPage.clickLoginLink();//Step 3: Click "Bạn đã có tài khoản? Đăng nhập"
        //Step 4: Verify Navigate to login screen
        await loginPage.verifyPopupLoginVisible();
    })

    test.afterEach(async ({ page }) => {
        console.log('Kết thúc testcase')
    })

})



