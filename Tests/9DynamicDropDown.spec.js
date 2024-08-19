const { test, expect } = require('@playwright/test')


test('verify the dynamic dropdown in playwright ',async({page})=>{
    await page.goto('https://www.redbus.in/')
    await  page.locator('#src').fill('Pune')
    await page.waitForSelector('[class="placeHolderMainText"]')
    let optioncount = await page.locator('[class="PlaceHolderText"]')
    console.log(optioncount)
    for(let i =0 ;i <optioncount;i++){
        let text = await page.locator('[class="PlaceHolderMainText"]').last().textContent()
        console.log(text)
        if(text==='Wagholi'){
            await page.locator('[class="placeHolderMainText"]').nth().click()
        }

    }
    await page.waitForTimeout(4000)
})