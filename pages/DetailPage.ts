import { expect, Locator, Page } from "@playwright/test";
import { CommonPage } from "./CommonPage";

export class DetailPage extends CommonPage {
    private readonly ContainCumRap = this.page.locator('#cinemaList');
    private readonly btnPlay = this.page.getByRole('button', { name: 'video-button' });
    private readonly ifrVideo = this.page.locator('iframe').contentFrame().locator('video');
    private readonly btnBuyticket = this.page.getByText('Mua vé');


    constructor(page: Page) {
        super(page);
    }
    async hoverMovie() {
        const linkMovie = this.page.locator(`div[class*="MuiGrid-root"][class*="MuiGrid-item"][class*="MuiGrid-grid-xs-3"][class*="jss"] > div`);
        await this.hover(linkMovie);
    }

    async clickPlay() {
        await this.click(this.btnPlay);
    }

    async clickBuyticket() {
        await this.click(this.btnBuyticket);
    }

    getContainCumRap(): Locator {
        return this.ContainCumRap;
    }

    async verifyContainCumRapVisible() {
        await expect(this.ContainCumRap).toBeVisible();
    }

    getifrVideo(): Locator {
        return this.ifrVideo;
    }

    async clickRandomRap() {
        const rapButtons = this.page.locator('div.MuiTabs-root.MuiTabs-vertical button');
        const total = await rapButtons.count();
        const randomIndex = Math.floor(Math.random() * total);
        await rapButtons.nth(randomIndex).click();
    }

    async clickRandomLichchieu() {
        // Lấy danh sách tất cả nút lịch chiếu
        const lichchieuButtons = this.page.locator('div.MuiBox-root [class*="jss"] a[href*="/purchase"]');
        const totalLichchieu = await lichchieuButtons.count();
        if (totalLichchieu === 0)
            throw new Error('Không tìm thấy lịch chiếu nào');
        // Random chọn 1 lịch chiếu
        const randomIndex = Math.floor(Math.random() * totalLichchieu);
        const selected = lichchieuButtons.nth(randomIndex);
        await selected.scrollIntoViewIfNeeded();
        // Lấy tên phim
        const nameFilmLocator = this.page.locator(
            'div[class*="MuiGrid-root"][class*="MuiGrid-container"][class*="MuiGrid-spacing-xs-1"] > div > h1'
        );
        const nameText = (await nameFilmLocator.textContent())?.trim();
        console.log(`Tên phim: ${nameText}`);

        // Lấy tên rạp — tìm phần tử cha gần nhất có h3
        const namerap = this.page.locator(`div.MuiGrid-container:has(a[href*="/purchase"]) h3`);
        const rapText = (await namerap.nth(randomIndex).textContent())?.trim();
        console.log(`Tên rạp: ${rapText}`);

        // Lấy thời gian chiếu
        const lichText = (await selected.textContent())?.trim();
        console.log(`Lịch chiếu: ${lichText}`);

        // Click lịch chiếu
        await selected.click();

        return { rapText, nameText, lichText };
    }


}