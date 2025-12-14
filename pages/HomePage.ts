import { Page, Locator, expect } from "@playwright/test";
import { CommonPage } from "./CommonPage";

export class HomePage extends CommonPage {
    private readonly btnPlay = this.page.getByRole('button', { name: 'video-button'});
    private readonly ifrVideo = this.page.locator('iframe').contentFrame().locator('video');
    private readonly ContainLichChieu = this.page.locator('#lichChieu');
    private readonly ContainCumRap = this.page.locator('#cumRap');
    private readonly ContainTinTuc = this.page.locator('//div[@id="tinTuc"]');
    private readonly ContainUngDung = this.page.locator('#ungDung');
    private readonly SelectMenuFilm = this.page.locator('select[name="film"]');
    private readonly lblMsgFilm = this.page.getByText('Vui lòng chọn phim');
    private readonly SelectMenuCinema = this.page.locator('select[name="cinema"]');
    private readonly lblMsgCinema = this.page.getByText('Vui lòng chọn rạp');
    private readonly SelectMenuDate = this.page.locator('select[name="date"]');
    private readonly lblMsgDate = this.page.getByText('Vui lòng chọn ngày giờ chiếu');
    private readonly btnBuyTicket = this.page.getByRole('button', { name: 'MUA VÉ NGAY' });
    private readonly btnBuy = this.page.getByRole('link', { name: 'MUA VÉ', exact: true });
    private readonly btnDaHieu = this.page.getByRole('button', { name: 'Đã hiểu' });
    private readonly btnDangxuat = this.page.getByRole('link', { name: 'Đăng xuất' });
    private readonly btnYesDangxuat = this.page.getByRole('button', { name: 'Đồng ý' });
    private readonly btnNoDangxuat = this.page.getByRole('button', { name: 'Hủy' });
    private readonly lblLogoutMsg = this.page.getByRole('heading', { name: 'Đã đăng xuất' });

    constructor(page: Page) {
        super(page);
    }
    getLblLogoutMsgLocator(): Locator {
        return this.lblLogoutMsg;
    }

    async clickPlay() {
        await this.click(this.btnPlay);
    }

    async getSelectFilm() {
        await this.click(this.SelectMenuFilm);
    }

    async getSelectCinema() {
        await this.click(this.SelectMenuCinema);
    }

    async getSelectDate() {
        await this.click(this.SelectMenuDate);
    }

    async clickBuyTicket() {
        await this.click(this.btnBuyTicket);
    }

    async clickDaHieu() {
        await this.click(this.btnDaHieu);
    }

    async clickDangXuat() {
        await this.click(this.btnDangxuat);
    }

    async clickYesDangXuat() {
        await this.click(this.btnYesDangxuat);
    }


    async clickNoDangXuat() {
        await this.click(this.btnNoDangxuat);
    }


    async clickBuy() {
        await this.click(this.btnBuy);
    }

    async hoverLink() {
        const randomIndex = Math.floor(Math.random() * 8) + 1;
        const linkMovie = this.page.locator(
            `//div[@class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3"]
     //div[@class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-4 MuiGrid-grid-md-3"][${randomIndex}]`
        );
        await this.hover(linkMovie);
    }

    getifrVideo(): Locator {
        return this.ifrVideo;
    }

    async clickRandomMovieAndPlay() {
        await this.hoverLink();
        await this.clickPlay();
    }

    getContainLichChieu(): Locator {
        return this.ContainLichChieu;
    }

    getContainCumRap(): Locator {
        return this.ContainCumRap;
    }

    getContainTinTuc(): Locator {
        return this.ContainTinTuc;
    }

    getContainUngDung(): Locator {
        return this.ContainUngDung;
    }

    getlblMsgFilm(): Locator {
        return this.lblMsgFilm;
    }

    getlblMsgCinema(): Locator {
        return this.lblMsgCinema;
    }

    getlblMsgDate(): Locator {
        return this.lblMsgDate;
    }

    async clickBookTicket(menu: 'Phim' | 'Rạp' | 'Ngày giờ chiếu') {
        switch (menu) {
            case 'Phim': this.getSelectFilm(); break;
            case 'Rạp': this.getSelectCinema(); break;
            case 'Ngày giờ chiếu': this.getSelectDate(); break;
        }
    }

    async selectdropdownRandomPhim() {
        const options = await this.SelectMenuFilm.locator('option:not([disabled])').all();
        const total = options.length;
        const randomIndex = Math.floor(Math.random() * total);
        const randomValue = await options[randomIndex].getAttribute('value');
        const randomText = (await options[randomIndex].textContent())?.trim() || '';
        await this.SelectMenuFilm.selectOption(randomValue);
        return { randomText };
    }

    async selectdropdownRandomRap() {
        const options = await this.SelectMenuCinema.locator('option:not([disabled])').all();
        const total = options.length;
        const randomIndex = Math.floor(Math.random() * total);
        const randomValue = await options[randomIndex].getAttribute('value');
        const randomText = (await options[randomIndex].textContent())?.trim() || '';
        await this.SelectMenuCinema.selectOption(randomValue);
        return { randomText };
    }

    async selectdropdownRandomNgay() {
        const options = await this.SelectMenuDate.locator('option:not([disabled])').all();
        const total = options.length;
        const randomIndex = Math.floor(Math.random() * total);
        const randomValue = await options[randomIndex].getAttribute('value');
        const randomText = (await options[randomIndex].textContent())?.trim() || '';
        await this.SelectMenuDate.selectOption(randomValue);
        return { randomText };
    }

    async clickRandomRap() {
        const rapButtons = this.page.locator('div.MuiTabs-root.MuiTabs-vertical button');
        const total = await rapButtons.count();
        const randomIndex = Math.floor(Math.random() * total);
        console.log(`Random Cụm rạp số: ${randomIndex}`);
        await rapButtons.nth(randomIndex).click();
    }

    async clickRandomChiTietRap() {
        const chitietrapButtons = this.page.locator('div[id*="vertical-tabpanel-"] button');
        const totalRap = await chitietrapButtons.count();
        const randomIndexRap = Math.floor(Math.random() * totalRap);
        console.log(`Random Chi nhánh rạp số: ${randomIndexRap}`);
        await chitietrapButtons.nth(randomIndexRap).click();
    }

    async clickRandomLichchieu() {
        const lichchieuButtons = this.page.locator('div.MuiBox-root [class*="jss"] a[href*="/purchase"]');
        const totalLichchieu = await lichchieuButtons.count();
        const randomIndexLichchieu = Math.floor(Math.random() * totalLichchieu);
        console.log(`Random xuất chiếu số: ${randomIndexLichchieu}`);
        await lichchieuButtons.nth(randomIndexLichchieu).click();
    }

}