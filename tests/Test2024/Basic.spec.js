const { test, expect } = require('@playwright/test')


test('verify login functionality with valid data', async ({ page }) => {
    let Dashboardel = await page.locator('h6[class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]')
    await page.waitForTimeout(3000)
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.locator('input[name="username"]').fill("Admin")
    await page.locator('input[name="password"]').fill("admin123")
    await page.locator('button[type="submit"]').click()
    //assertion=== 
    await expect(Dashboardel).toHaveText("Dashboard")
    await expect(Dashboardel).toBeVisible()
    await expect(page.locator('img[alt="client brand banner"]')).toBeVisible() //llogo validate
    await page.waitForTimeout(4000)
    await expect(page).toHaveTitle('OrangeHRM')
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index') // url validate after login 

})
test.only('verify login functionality with invalid data',async({page})=>{
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.waitForTimeout(3000)
    await page.locator('input[placeholder="Username"]').fill('Admin')
    await page.locator('input[type="password"]').fill('Admin1234')
    await page.locator('button[type="submit"]').click()
    //validation 
    await page.waitForTimeout(3000)
    //await expect(page.locator('p[class="oxd-text oxd-text--p oxd-alert-content-text"]')).toBeVisible()
    await expect(page.locator('div[role="alert"]')).toBeVisible()
    await expect(page.locator('p[class="oxd-text oxd-text--p oxd-alert-content-text"]')).toHaveText('Invalid credentials')
    await expect(page.locator('div[role="alert"]')).toBeVisible()
    await expect(page.locator('p[class="oxd-text oxd-text--p orangehrm-login-forgot-header"]')).toHaveText('Forgot your password? ')
})

