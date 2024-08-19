const { test, expect } = require('@playwright/test')
//types of alerts 
// js simple alert 
// js confirm alert 
// js prompt alert 

test('Handle js simple in playwright',async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts')
    page.on('dialog',async simpleAlert=>{
        console.log(simpleAlert.message())
        await expect(simpleAlert.message()).toContain('I am a JS Alert')
        await simpleAlert.accept()
        await expect(simpleAlert.type()).toContain('alert')
        console.log(simpleAlert.type())
        //Simplealert     Alert
        //confirmAlert    confirm 
        //PromptAlert     promt

    })
    await page.locator('button[onClick="jsAlert()"]').click()
    await expect(page.locator('#result')).toHaveText('You successfully clicked an alert')

})

test('verify simple alert in playwright',async({page})=>{
    await page.goto('https://www.demoblaze.com/')
    await page.waitForSelector('[class="card-title"]>a')
    let productCount = await page.locator('[class="card-title"] >a').count()
    console.log(productCount)

for(let i =0;i <productCount;i++){
    let text = await page.locator('[class="card-title"]>a').nth(i).textContent()
    console.log(text)
    if(text ==="Nexus 6"){
        await page.locator('[class="card-title"]>a').nth(i).click()
        break
    }
}
page.on('dialog',async simpleAlert=>{
    await expect(simpleAlert.message()).toContain('Product added')
    await simpleAlert.accept()
    await console.log(simpleAlert.type())
})
await page.locator('[onclick="addToCart(3)"]').click()
await page. waitForTimeout(3000)
})

test('verify confirm in playwright',async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts')
    page.on('dialog',async confirm =>{
        console.log(confirm.type())
        await expect (confirm.message()).toContain('I am a JS Confirm')
        console.log(confirm.message())
        await expect(confirm.type()).toContain('confirm')
        await confirm.accept()
        await confirm.dismiss()
    })
    await page.locator('[onclick="jsconfirm()"]').click()
    await expect(page.locator('#result')).toHaveText('You clicked: Ok')
    await expect(page.locator('#result')).toHaveText('You clicked: Cancel')
})
test('Verify propmt alert in playwright',async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts')
    page.on('dialog', async prompt=>{
        await expect(prompt.message()).toContain('I am a JS prompt')
        await expect(prompt.type()).toContain('prompt')
        console.log(prompt.message())
        console.log(prompt.type())
        prompt.accept('snehal')
       // prompt.dismiss()
    })
    await page.locator('[onclick="jsPrompt()"]').click()
    await expect(page.locator('#result')).toHaveText('You entered: snehal')
   // await expect(page.locator('#result')).toHaveText('You entered: null')
})