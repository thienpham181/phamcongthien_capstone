import { expect, test } from '../fixtures/custom-fixtures';

let selectedInfo: { rapText: string | undefined; nameText: string | undefined; lichText: string | undefined};
test.describe('Booking Guest Future', () => {

    test.beforeEach(async ({ detailPage, bookingPage, page, homePage }) => {
        console.log('Trang Home - Chưa đăng nhập')
        await homePage.navigateTo('https://demo1.cybersoft.edu.vn/'); //Step 1: Navigate to https://demo1.cybersoft.edu.vn/
        await homePage.hoverLink(); //Step 2: đi đến phim random trên danh sách phim
        await homePage.clickBuy(); //Step 3: Click Mua vé để chuyển đến detail
        await detailPage.clickBuyticket();  //Step 4: Click Mua vé
        await page.waitForTimeout(1000);
        await detailPage.clickRandomRap(); //Step 5: Click Random cụm Rạp tại danh sách
        await page.waitForTimeout(2000);
        selectedInfo = await detailPage.clickRandomLichchieu(); //Step 6: Click Random lịch chiếu của rạp
        await bookingPage.clickBooking(); // Step 7: Click Đặt vé
    })

    test('Verify Nhấn đặt vé', async ({bookingPage}) => {
        console.log('Verify Nhấn đặt vé');
        //VP: 'Bạn chưa đăng nhập' message display
        await expect(bookingPage.getlblNoLoginMsg()).toBeInViewport();
    })

    test('Verify Nhấn đặt vé và đồng ý login', async ({ loginPage, bookingPage }) => {
        console.log('Verify Nhấn đặt vé và đồng ý login');
        await bookingPage.clickYesLogon(); //Step 8: Click Đồng ý đăng nhập
        //VP: hiển thị trang login
        await loginPage.verifyPopupLoginVisible();
    })

    test('Verify Nhấn đặt vé và Không login', async ({ bookingPage }) => {
        console.log('Verify Nhấn đặt vé và Không login');
        await bookingPage.clickNoLogon(); //Step 8: Click Không đăng nhập
        // Step 4: Verify trường tên phim tên rạp
        const bookingInfo = await bookingPage.getBookingInfo();
        await expect(bookingInfo.name).toContain(selectedInfo.nameText);
        await expect(bookingInfo.cinema).toContain(selectedInfo.rapText);
    })

    test.afterEach(async ({ page }) => {
        console.log('Kết thúc testcase')
    })

})



