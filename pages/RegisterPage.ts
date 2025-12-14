import { Page, Locator, expect } from '@playwright/test';
import { CommonPage } from './CommonPage';
import { generateAccount } from './utils';

export class RegisterPage extends CommonPage {
    private readonly lblregister = this.page.getByRole('heading', { name: 'Đăng ký', exact: true });
    private readonly txtAccount = this.page.getByRole('textbox', { name: 'Tài Khoản' });
    private readonly txtPassword = this.page.getByRole('textbox', { name: 'Mật Khẩu', exact: true });
    private readonly txtConfirmPassword = this.page.getByRole('textbox', { name: 'Nhập lại mật khẩu' });
    private readonly txtName = this.page.getByRole('textbox', { name: 'Họ Tên' });
    private readonly txtEmail = this.page.getByRole('textbox', { name: 'Email' });
    private readonly btnRegisterNewAcc = this.page.getByRole('button', { name: 'Đăng ký' });
    private readonly lblRegisterMsg = this.page.getByRole('heading', { name: 'Đăng ký thành công' });
    private readonly loginLink = this.page.getByRole('link', { name: 'Bạn đã có tài khoản? Đăng nhập' });
    private readonly lblMsgInvalidAccount = this.page.getByText('Tài khoản đã tồn tại!');
    private readonly lblMsgIncorrtRePass = this.page.getByText('Mật khẩu không khớp !');
    private readonly lblMsgShortPass = this.page.getByText('Mật khẩu phải có ít nhất 6 k');
    private readonly lblMsgInvalidEmail = this.page.getByText('Email đã tồn tại!');
    private readonly lblMsgInvalidName = this.page.getByText('Họ và tên không chứa số !');
    private readonly lblMsgEmptyAccount = this.page.locator('#taiKhoan-helper-text');
    private readonly lblMsgEmptyPassword = this.page.locator('#matKhau-helper-text');
    private readonly lblMsgEmptyConfirmPass = this.page.locator('#confirmPassWord-helper-text');
    private readonly lblMsgEmptyName = this.page.locator('#hoTen-helper-text');
    private readonly lblMsgEmptyEmail = this.page.locator('#email-helper-text');



    constructor(page: Page) {
        super(page);
    }

    getlblMsgInvalidAccount(): Locator {
        return this.lblMsgInvalidAccount;
    }

    getlblMsgInvalidEmail(): Locator {
        return this.lblMsgInvalidEmail;
    }

    getlblMsgInvalidName(): Locator {
        return this.lblMsgInvalidName;
    }

    getlblMsgEmptyAccount(): Locator {
        return this.lblMsgEmptyAccount;
    }

    getlblMsgEmptyPassword(): Locator {
        return this.lblMsgEmptyPassword;
    }

    getlblMsgShortPass(): Locator {
        return this.lblMsgShortPass;
    }

    getlblMsgEmptyConfirmPass(): Locator {
        return this.lblMsgEmptyConfirmPass;
    }

    getlblMsgEmptyName(): Locator {
        return this.lblMsgEmptyName;
    }

    getlblMsgEmptyEmail(): Locator {
        return this.lblMsgEmptyEmail;
    }

    getlblMsgIncorrtRePass(): Locator {
        return this.lblMsgIncorrtRePass;
    }

    getlblRegisterMsg(): Locator {
        return this.lblRegisterMsg;
    }

    async verifyPopupRegisterVisible() {
        await expect(this.lblregister).toBeVisible();
    }

    async enterAccount(account: string) {
        await this.fill(this.txtAccount, account);
    }

    async enterPassword(password: string) {
        await this.fill(this.txtPassword, password);
    }

    async enterConfirmPassword(confirmpassword: string) {
        await this.fill(this.txtConfirmPassword, confirmpassword);
    }

    async enterName(name: string) {
        await this.fill(this.txtName, name);
    }

    async enteremail(email: string) {
        await this.fill(this.txtEmail, email);
    }

    async clickRegister() {
        await this.click(this.btnRegisterNewAcc);
    }

    async clickLoginLink() {
        await this.click(this.loginLink);
    }

    async register(account: string, password: string, confirmpassword: string, name: string, email: string) {
        await this.enterAccount(account);
        await this.enterPassword(password);
        await this.enterConfirmPassword(confirmpassword);
        await this.enterName(name);
        await this.enteremail(email);
        await this.clickRegister();
    }

    async verifyFullEmty() {
        expect(this.getlblMsgEmptyAccount());
        expect(this.getlblMsgEmptyPassword());
        expect(this.getlblMsgEmptyConfirmPass());
        expect(this.getlblMsgEmptyName());
        expect(this.getlblMsgEmptyEmail());
    }

}