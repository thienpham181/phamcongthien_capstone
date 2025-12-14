import { expect, test } from '../fixtures/custom-fixtures';
import { DetailPage } from '../pages/DetailPage';

test.describe('Home Guest Future', () => {

    test.beforeEach(async ({ homePage }) => {
        console.log('Trang Home - Chưa đăng nhập')
        await homePage.navigateTo('https://demo1.cybersoft.edu.vn/'); //Step 1: Navigate to https://demo1.cybersoft.edu.vn/
    })

    test('Verify Click Lịch chiếu', async ({ homePage, page }) => {
        console.log('Verify Click Lịch chiếu');
        await page.waitForTimeout(3000);
        await homePage.topBarNagivation.clickMenu('Lịch Chiếu'); //Step 2: Click Lịch chiếu
        // step 3: check scroll to Lịch chiếu
        await expect(homePage.getContainLichChieu()).toBeInViewport();
    })

    test('Verify Click Cụm Rạp', async ({ homePage, page }) => {
        console.log('Verify Click Cụm Rạp');
        await page.waitForTimeout(3000);
        await homePage.topBarNagivation.clickMenu('Cụm Rạp'); //Step 2: Click Cụm Rạp
        // step 3: check scroll to Cụm Rạp
        await expect(homePage.getContainCumRap()).toBeInViewport();
    })

    test('Verify Click Tin Tức', async ({ homePage, page }) => {
        console.log('Verify Click Tin Tức');
        await page.waitForTimeout(3000);
        await homePage.topBarNagivation.clickMenu('Tin Tức'); //Step 2: Click Tin Tức
        // step 3: check scroll to Tin Tức
        await expect(homePage.getContainTinTuc()).toBeInViewport();
    })

    test('Verify Click Ứng Dụng', async ({ homePage, page }) => {
        console.log('Verify Click Ứng Dụng');
        await page.waitForTimeout(3000);
        await homePage.topBarNagivation.clickMenu('Ứng Dụng'); //Step 2: Click Ứng Dụng
        // step 3: check scroll to Ứng Dụng
        await expect(homePage.getContainUngDung()).toBeInViewport();
    })

    test('Verify Play Movie', async ({ homePage }) => {
        console.log('Verify Play Movie');
        await homePage.clickRandomMovieAndPlay(); //Step 2: Click random video
        // step 3: check video play
        await expect(homePage.getifrVideo()).toBeVisible();
    })

    test('Verify Click Mua Vé Ngay', async ({ homePage, bookingPage }) => {
        console.log('Verify Click Mua Vé Ngay');
        await homePage.clickBuyTicket(); //Step 2: Click Mua Vé ngay
        // step 3: check báo lỗi chọn Film
        await expect(homePage.getlblMsgFilm()).toBeVisible();
        await homePage.clickDaHieu();
        const Infofim = await homePage.selectdropdownRandomPhim();
        await homePage.clickBuyTicket();
        // step 4: check báo lỗi chọn Cinema
        await expect(homePage.getlblMsgCinema()).toBeVisible();
        await homePage.clickDaHieu();
        const InfoRap = await homePage.selectdropdownRandomRap();
        await homePage.clickBuyTicket();
        // step 5: check báo lỗi chọn Date
        await expect(homePage.getlblMsgDate()).toBeVisible();
        await homePage.clickDaHieu();
        const InfoLichchieu = await homePage.selectdropdownRandomNgay();
        await homePage.clickBuyTicket();
        // step 6: kiểm tra hiển thị nút Đặt vé tại trang booking
        await bookingPage.verifyBooking();
        //step 6: Verify trường tên phim tên rạp tại booking
        const bookingInfo = await bookingPage.getBookingInfo();
        await expect(bookingInfo.name).toContain(Infofim.randomText);
        await expect(bookingInfo.cinema).toContain(InfoRap.randomText);
        //await expect(bookingInfo.time).toContain(InfoLichchieu.randomText);
    })

    test('Verify Click Mua Vé', async ({ homePage, detailPage }) => {
        console.log('Verify Click Mua Vé');
        await homePage.hoverLink(); //Step 2: đi đến phim random trên danh sách phim
        await homePage.clickBuy(); //Step 3: Click Mua vé
        // step 4: kiểm tra hiển thị danh sách Cụm rạp tại trang detail
        await detailPage.verifyContainCumRapVisible();
    })

    test('Verify Chọn phim đặt vé', async ({ homePage, bookingPage, page }) => {
        console.log('Verfy Chọn phim đặt vé');
        await page.waitForTimeout(3000);
        await homePage.topBarNagivation.clickMenu('Cụm Rạp'); //Step 2: Click Cụm Rạp
        await homePage.clickRandomRap(); //Step 3: Click Random cụm Rạp tại danh sách
        await page.waitForTimeout(2000);
        await homePage.clickRandomChiTietRap(); //Step 4: Click Random chi tiết Rạp
        await homePage.clickRandomLichchieu(); //Step 5: Click Random lịch chiếu của rạp
        // step 6: kiểm tra hiển thị nút Đặt vé tại trang booking
        await bookingPage.verifyBooking();
    })



    test.afterEach(async ({ page }) => {
        console.log('Kết thúc testcase')
    })

})



