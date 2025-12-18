## Giới thiệu Project Automation
Đây là dự án **Automation Testing** được viết bằng **Playwright + TypeScript**,  
nhằm tự động kiểm thử các tính năng chính của hệ thống https://demo1.cybersoft.edu.vn/ :
- Trang chủ (Home)
- Đăng nhập / Đăng ký /Đăng xuất
- Chi tiết phim
- Đặt vé xem phim

---

## Công nghệ sử dụng
| Công nghệ                                       | Mô tả                              |
|-------------------------------------------------|------------------------------------|
| [Playwright](https://playwright.dev/)           | Framework chính để viết test UI    |
| TypeScript                                      | Ngôn ngữ lập trình cho test script |
| [Allure Report](https://docs.qameta.io/allure/) | Hệ thống báo cáo kết quả test      |
| Node.js (>=18)                                  | Môi trường chạy                    |
| NPM                                             | Quản lý gói                        |

---

## Cấu trúc thư mục
```bash
📦 PHAMCONGTHIEN_CAPSTONE
│
├── 📁 allure-results/                 # Thư mục chứa kết quả test (Allure JSON)
│
├── 📁 fixtures/                      
│   └── custom-fixtures.ts
│
├── 📁 node_modules/                 
│
├── 📁 pages/                          # Page Object Models (POM)
│   ├── 📁 components/                
│   │   └── TopBarNavigation.ts       
│   │
│   ├── BasePage.ts                   
│   ├── BookingPage.ts               
│   ├── CommonPage.ts                
│   ├── DetailPage.ts                 
│   ├── HomePage.ts                   
│   ├── LoginPage.ts                  
│   ├── RegisterPage.ts              
│   └── utils.ts                      
│
├── 📁 tests/                          # Chứa tất cả test case
│   ├── booking.guest.spec.ts        
│   ├── booking.user.spec.ts         
│   ├── detail.guest.spec.ts         
│   ├── detail.user.spec.ts          
│   ├── home.guest.spec.ts            
│   ├── home.user.spec.ts             
│   ├── login.spec.ts                 
│   ├── logout.spec.ts               
│   └── register.spec.ts              
│
├── .gitignore                        # File cấu hình Git (bỏ qua file thừa)
├── package-lock.json                 # Lock version dependency
├── package.json                      # Khai báo script và dependencies
├── playwright.config.ts              # Cấu hình test Playwright
└── README.md                         # Tài liệu hướng dẫn 

```
---

## Cài đặt

### Cài đặt TypeScript

| Step | Thực hện                                                                  |
|------|---------------------------------------------------------------------------|
| 1    | Mở Command Prompt (Windows) hay Terminal (Mac)                            |
| 2    | Enter command sau: npm install -g typescript                              |
| 3    | Tạo project folder, di chuyển tới folder với command sau: cd <your_folder>|
| 4    | Khởi tạo file cấu hình TypeScript bằng command sau:tsc --init             |
| 5    | Chỉnh file cấu hình tsconfig.json                                         |
| 6    | Cài đặt ts-node: npm install --save-dev ts-node typescript @types/node    |
| 7    | Tạo file src/index.ts                                                     |
| 8    | Chạy file index.ts: npx ts-node src/index.ts                              |

### Cài Node.js (phiên bản >= 20.x, 22.x or 24.x.)
Tải tại: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)

### Cài dependencies
npm install


### Cài Playwright browsers
System Requirements:
 - Node.js: latest 20.x, 22.x or 24.x.
 - Windows 11+, Windows Server 2019+ or Windows Subsystem for Linux (WSL).
 - macOS 14 (Ventura) or later.
 - Debian 12 / 13, Ubuntu 22.04 / 24.04 (x86-64 or arm64).
 - https://playwright.dev/docs/intro

| Step | Thực hện                                                                  |
|------|---------------------------------------------------------------------------|
| 1    | Tạo project folder                                                        |
| 2    | Open Command Prompt (Windows) / Terminal (Mac) tại folder vừa tạo         |
| 3    | Enter command sau: npm init playwright@latest                             |
| 4    | Enter y tại “Ok to proceed? (y)”                                          |
| 5    | Enter chọn TypeScript tại “Do you want to use TypeScript or JavaScript”   |
| 6    | Enter để chọn tests tại “Where to put your end-to-end tests?”             |
| 7    | Enter n tại “Add a Github Actions workflow? “                             |
| 8    | Enter để đồng ý “Install Playwright browsers”                             |

---

## Chạy test

### Chạy test thông thường

npm run test


### Chạy test + sinh Allure Report

npm run test:allure


### Chạy test bằng giao diện UI

npm run test:ui


---

## Xem báo cáo Allure

### Cách 1: Mở live report
npm run report:serve
➡️ Trình duyệt sẽ tự mở tại `http://localhost:port`

### Cách 2: Sinh báo cáo tĩnh

npm run report:generate
npm run report:open
---

## 🔧 Script có sẵn trong package.json

```json
"scripts": {
  "clean:allure": "rimraf allure-results && mkdir allure-results",
  "test:allure": "npm run clean:allure && npx playwright test --reporter=line,allure-playwright",
  "test": "npx playwright test",
  "test:ui": "npx playwright test --ui",
  "report:serve": "allure serve allure-results",
  "report:generate": "allure generate allure-results --clean -o allure-report",
  "report:open": "allure open allure-report"
}
```
---

## Lưu ý khi chạy test
- Luôn chạy lệnh `npm run test:allure` để sinh report mới.
- Nếu test cần login, dùng fixture `authenticatedPage` để đăng nhập sẵn.
- Có thể thay đổi URL hệ thống trong `playwright.config.ts`.
---


## 👨‍💻 Tác giả
**Phạm Công Thiện**  
📧 Email: phamcongthien.patcons@gmail.com  
🕓 Dự án hoàn thành: 12/2025  

