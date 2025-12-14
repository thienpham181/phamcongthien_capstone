import { expect, test } from '../fixtures/custom-fixtures';
import { DetailPage } from '../pages/DetailPage';
let selectedInfo: { rapText: string | undefined; nameText: string | undefined; lichText: string | undefined };
test.describe('Detail Guest Future', () => {

    test.beforeEach(async ({ homePage }) => {
        console.log('Trang Home - Chưa đăng nhập')
        await homePage.navigateTo('https://demo1.cybersoft.edu.vn/'); //Step 1: Navigate to https://demo1.cybersoft.edu.vn/
        await homePage.hoverLink(); //Step 2: đi đến phim random trên danh sách phim
        await homePage.clickBuy(); //Step 3: Click Mua vé để chuyển đến detail
    })

    test('Verify Play Movie', async ({ detailPage}) => {
        console.log('Verify Play Movie');
        await detailPage.hoverMovie();
        await detailPage.clickPlay(); //Step 2: Click video
        // step 3: check video play
        await expect(detailPage.getifrVideo()).toBeVisible();
    })

    test('Verify Click Mua Vé', async ({ detailPage }) => {
        console.log('Verify Click Mua Vé');
        await detailPage.clickBuyticket(); //Step 2: Click Mua vé
        // step 4: kiểm tra scroll to danh sách Cụm rạp và lịch chiếu
        await expect(detailPage.getContainCumRap()).toBeInViewport();
    })

    test('Verify Chọn Rạp và lịch chiếu', async ({ detailPage, bookingPage, page }) => {
        console.log('Verfy Chọn Rạp và lịch chiếu');
        await detailPage.clickBuyticket();  //Step 2: Click Mua vé
        await page.waitForTimeout(1000);
        await detailPage.clickRandomRap(); //Step 3: Click Random cụm Rạp tại danh sách
        await page.waitForTimeout(2000);
        selectedInfo = await detailPage.clickRandomLichchieu(); //Step 4: Click Random lịch chiếu của rạp
        // step 6: kiểm tra hiển thị nút Đặt vé tại trang booking
        await bookingPage.verifyBooking();
        // Step 6: Verify trường tên phim,  tên rạp, thời gian trùng với lịch đặt
        const bookingInfo = await bookingPage.getBookingInfo();
        await expect(bookingInfo.name).toContain(selectedInfo.nameText);
        await expect(bookingInfo.cinema).toContain(selectedInfo.rapText);
        await expect(bookingInfo.time).toContain(selectedInfo.lichText);
    })

    test.afterEach(async ({ page }) => {
        console.log('Kết thúc testcase')
    })

})



