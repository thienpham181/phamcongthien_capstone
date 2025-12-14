import { expect, test } from '../fixtures/custom-fixtures';

let selectedInfo: { rapText: string | undefined; nameText: string | undefined; lichText: string | undefined };
test.describe('Booking User Future', () => {

    test.beforeEach(async ({ detailPage, page, homePage, authenticatedPage }) => {
        console.log('Trang Home - Đã đăng nhập')
        await homePage.hoverLink(); //Step 2: đi đến phim random trên danh sách phim
        await homePage.clickBuy(); //Step 3: Click Mua vé để chuyển đến detail
        await detailPage.clickBuyticket();  //Step 4: Click Mua vé
        await page.waitForTimeout(1000);
        await detailPage.clickRandomRap(); //Step 5: Click Random cụm Rạp tại danh sách
        await page.waitForTimeout(2000);
        selectedInfo = await detailPage.clickRandomLichchieu(); //Step 6: Click Random lịch chiếu của rạp
    })

    test('Verify Nhấn đặt vé khi chưa chọn ghế', async ({ bookingPage }) => {
        console.log('Verify Nhấn đặt vé khi chưa chọn ghế');
        await bookingPage.clickBooking(); // Step 7: Click Đặt vé
        //VP: 'Bạn chưa chọn ghế' message display
        await expect(bookingPage.getlblChuaChonGheMsg()).toBeInViewport();
    })

    test('Verify Nhấn đặt 1 vé thành công', async ({ bookingPage }) => {
        console.log('Verify Nhấn đặt 1 vé thành công');
        const { seatText } = await bookingPage.selectRandomAvailableSeat(); // Step 7: chọn ghế
        console.log(`Đã chọn ghế: ${seatText}`);
        await bookingPage.clickBooking(); // Step 8: Click Đặt vé
        //VP: 'Đặt vé thành công' message display
        await expect(bookingPage.getlblthanhcongMsg()).toBeInViewport();
    })

    test('Verify Nhấn đặt nhiều vé thành công', async ({ bookingPage }) => {
        console.log('Verify Nhấn đặt nhiều vé thành công');
        const selectedSeats = await bookingPage.selectRandomSeats(2, 3);
        console.log(`Các ghế đã chọn: ${selectedSeats.join(', ')}`);
       // verify ghế hiển thị trong thông tin thanh toán
        const bookingInfo = await bookingPage.getBookingInfo();
        for (const seat of selectedSeats) {
            await expect(bookingInfo.seat).toContain(seat);
        }
        await bookingPage.clickBooking(); // Step 8: Click Đặt vé
        //VP: 'Đặt vé thành công' message display
        await expect(bookingPage.getlblthanhcongMsg()).toBeInViewport();
       

    })

    test('Verify lịch sử đặt vé', async ({ bookingPage, page }) => {
        console.log('Verify lịch sử đặt vé');
        const { seatText } = await bookingPage.selectRandomAvailableSeat(); // Step 7: chọn ghế
        console.log(`Đã chọn ghế: ${seatText}`);
        await bookingPage.clickBooking(); // Step 8: Click Đặt vé
        await page.waitForTimeout(1000);
        await bookingPage.clickDongY(); // Step 9: Click Đồng ý kiểm tra lịch sử đặt vé
        // Step 4: Verify trường cụm rạp, tên phim, giờ chiếu, số ghế
        const bookingInfo = await bookingPage.getBookingInfo();
        await expect(bookingInfo.name).toContain(selectedInfo.nameText);
        await expect(bookingInfo.cinema).toContain(selectedInfo.rapText);
        //await expect(bookingInfo.time).toContain(selectedInfo.lichText);
        await expect(bookingInfo.seat).toContain(seatText);

    })

    test.afterEach(async ({ page }) => {
        console.log('Kết thúc testcase')
    })

})



