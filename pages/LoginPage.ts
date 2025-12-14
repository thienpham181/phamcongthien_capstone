import { expect, Locator, Page } from "@playwright/test";
import { CommonPage } from "./CommonPage";

export class LoginPage extends CommonPage {
    private readonly lblLogin = this.page.getByRole('heading', { name: 'Đăng nhập', exact: true });
    private readonly txtAccountLogin = this.page.getByRole('textbox', { name: 'Tài Khoản' });
    private readonly txtPasswordLogin = this.page.getByRole('textbox', { name: 'Mật Khẩu' });
    private readonly btnLoginForm = this.page.getByRole('button', { name: 'Đăng nhập' });
    private readonly lblLoginMsg = this.page.getByRole('heading', { name: 'Đăng nhập thành công' });
    private readonly lblMsgInvalid = this.page.getByText('Tài khoản hoặc mật khẩu không');
    private readonly txterrorAccount = this.page.locator('#taiKhoan-helper-text');
    private readonly txterrorPassword = this.page.locator('#matKhau-helper-text');
    private readonly Remember = this.page.getByRole('checkbox', { name: 'Nhớ tài khoản' });
    private readonly signupLink = this.page.getByRole('link', { name: 'Bạn chưa có tài khoản? Đăng ký' })
    private readonly btnDong_Thanhcong = this.page.getByRole('button', { name: 'Đóng' })

    constructor(page: Page) {
        super(page);
    }

    async verifyPopupLoginVisible() {
        await expect(this.lblLogin).toBeVisible();
    }

    getlblMsgInvalid(): Locator {
        return this.lblMsgInvalid;
    }
    
    getLblLoginMsgLocator(): Locator {
        return this.lblLoginMsg;
    }

    gettxterrorAccount(): Locator {
        return this.txterrorAccount;
    }

    gettxterrorPassword(): Locator {
        return this.txterrorPassword;
    }

    async enterAccount(account: string) {
        await this.fill(this.txtAccountLogin, account);
    }

    async enterPassword(password: string) {
        await this.fill(this.txtPasswordLogin, password);
    }

    async clickDong_Thanhcong() {
        await this.click(this.btnDong_Thanhcong);
    }

    async clickregist() {
        await this.click(this.signupLink);
    }

    async clickLogin() {
        await this.click(this.btnLoginForm);
    }

    async CheckRemember() {
        await this.click(this.Remember);
    }

    async login(account: string, password: string) {
        await this.enterAccount(account);
        await this.enterPassword(password);
        await this.clickLogin();
    }
   
    async loginRemember(account: string, password: string) {
        await this.enterAccount(account);
        await this.enterPassword(password);
        await this.CheckRemember();
        await this.clickLogin();
    }

    async verifyFieldsHaveValue() {
        expect(await this.txtAccountLogin.inputValue()).not.toBe('');
        expect(await this.txtPasswordLogin.inputValue()).not.toBe('');
    }


}