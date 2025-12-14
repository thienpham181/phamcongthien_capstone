import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class TopBarNagivation extends BasePage {
    private readonly BtnRegisterLink = this.page.locator("//h3[text()='Đăng Ký']");
    private readonly BtnLoginLink = this.page.getByRole('link', { name: 'Đăng Nhập' });
    private readonly BtnLogoutForm = this.page.getByRole('link', { name: 'Đăng xuất' });
    private readonly Btnconfirm = this.page.getByRole('button', { name: 'Đồng ý' });
    private userProfile = "Avatar %s";
    private readonly BtnLichChieu = this.page.locator('a').filter({ hasText: 'Lịch Chiếu' });
    private readonly BtnCumRap = this.page.locator('a').filter({ hasText: 'Cụm Rạp' });
    private readonly BtnTinTuc = this.page.locator('a').filter({ hasText: 'Tin Tức' });
    private readonly BtnUngDung = this.page.locator('a').filter({ hasText: 'Ứng Dụng' });

    constructor(page: Page) {
        super(page);
    }

    getUserProfileLocator(name: string): Locator {
        let userProfileName = this.userProfile.replace("%s", name);
        return this.page.getByRole("link", { name: `${userProfileName}` });
    }

    async navigateRegisterPage() {
        await this.click(this.BtnRegisterLink);
    }

    async navigateLoginPage() {
        await this.click(this.BtnLoginLink);
    }

    async navigateLogoutPage() {
        await this.click(this.BtnLogoutForm);
    }

    async navigateConfirm() {
        await this.click(this.Btnconfirm);
    }

    async navigateLichChieu() {
        await this.click(this.BtnLichChieu);
    }

    async navigateCumRap() {
        await this.click(this.BtnCumRap);
    }

    async navigateTinTuc() {
        await this.click(this.BtnTinTuc);
    }

    async navigateUngDung() {
        await this.click(this.BtnUngDung);
    }

    async logout() {
        await this.navigateLogoutPage();
        await this.navigateConfirm();
    }

    async clickMenu(menu: 'Lịch Chiếu' | 'Cụm Rạp' | 'Tin Tức' | 'Ứng Dụng') {
        switch (menu) {
            case 'Lịch Chiếu': this.navigateLichChieu(); break;
            case 'Cụm Rạp': this.navigateCumRap(); break;
            case 'Tin Tức': this.navigateTinTuc(); break;
            case 'Ứng Dụng': this.navigateUngDung(); break;
        }
    }
}