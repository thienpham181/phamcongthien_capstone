import { expect, test } from '../fixtures/custom-fixtures';

test.describe('Logout Test Future', () => {

    test.beforeEach(async ({ homePage, authenticatedPage }) => {
        console.log('Trang Home - Nhấn đăng xuất')
    })

    test('Verify Logout Successfully', async ({ homePage }) => {
        console.log('Verify Logout Successfully');
        await homePage.clickDangXuat(); // Step 1: Nhấn Đăng xuất
        await homePage.clickYesDangXuat(); // Step 2: Nhấn Đồng ý
        //VP: kiểm tra hiển thị thông báo Đã đăng xuất
        await expect(homePage.getLblLogoutMsgLocator()).toBeVisible();
    })

    test('Verify hủy Logout', async ({ homePage, loginPage }) => {
        console.log('Verify hủy Logout');
        await homePage.clickDangXuat(); // Step 1: Nhấn Đăng xuất
        await homePage.clickNoDangXuat(); // Step 2: Nhấn Hủy
        //VP1: user profile displays on the stop right
        await expect(homePage.topBarNagivation.getUserProfileLocator('phamcongthien')).toBeVisible();
    })

    test.afterEach(async ({ page }) => {
        console.log('Kết thúc testcase')
    })

})



