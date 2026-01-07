import { expect, test } from "@playwright/test";

test.beforeEach(async({page}, testInfo) => {
        await page.goto('http://localhost:4200/pages/iot-dashboard')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()

        //this setting allows to manage the timeout for this suite
        //testInfo.setTimeout(testInfo.timeout )
    })
/*
test.afterEach(async({page}, testInfo) => {
        await page.close()
        await page.context().close()
    })*/
 

test('Input Field tests', async({page}) => {

    const usingTheGridEmailInput = page.locator('nb-card',{hasText: 'Using the Grid'}).getByRole('textbox',{name: 'Email'})

    await usingTheGridEmailInput.clear()
    await usingTheGridEmailInput.fill('test@test.com')
    await(expect(usingTheGridEmailInput).toHaveValue('test@test.com'))

    //NOTE:This method of chaining a promise with expect does not work. 
    //await(expect(usingTheGridEmailInput.inputValue()).toEqual('test@test.com'))

    //correct way of chaing the locator value and assertion would be
    expect(await(usingTheGridEmailInput.inputValue())).toEqual('test@test.com')

    const emailInputValue = await(usingTheGridEmailInput.inputValue())
    expect(emailInputValue).toEqual('test@test.com')

    await usingTheGridEmailInput.clear()
    await usingTheGridEmailInput.pressSequentially('test@test2.com', {delay: 500})

    const emailInputValue1 = await(usingTheGridEmailInput.inputValue())
    expect(emailInputValue1).toEqual('test@test2.com')

})


test('Radio button tests', async({page}) => {

    const usingTheGridForm = page.locator('nb-card',{hasText: 'Using the Grid'})
    const option1Radio = usingTheGridForm.getByRole('radio',{name:'Option 1'})
    const option2Radio = usingTheGridForm.getByRole('radio',{name:'Option 2'})

    await option1Radio.check({force:true})
    expect(await(option1Radio.isChecked())).toBeTruthy()
    expect(await(option2Radio.isChecked())).toBeFalsy()

    await expect(page.locator('nb-card',{hasText: 'Using the Grid'}).getByRole('radio',{name:'Option 1'})).toBeChecked()

})

test('Check boxes tests', async({page}) => {

    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    if (await page.getByRole('checkbox', {name: 'Hide on click'}).isChecked() == true) {
        await page.getByRole('checkbox', {name: 'Hide on click'}).uncheck({force:true})
     }
    
    await page.getByRole('checkbox', {name: 'Hide on click'}).check({force:true})
    await page.getByRole('checkbox', {name: 'Show toast with icon'}).check({force:true})
    await page.getByRole('checkbox', {name: 'Prevent arising of duplicate toast'}).check({force:true})

    const allBoxes = await page.getByRole('checkbox').all()

    /*Format used below is incorrect as await cannot be used in foreach due to promise returning structures. It only should be used with a simple for loop
    allBoxes.forEach(element => {
        expect (await element.isChecked()).toBeTruthy()        
    })*/

    for (const abox of allBoxes) {

        await expect(abox, "Checking box ${abox}").toBeChecked()
    }
    

})

test('Slidexr tests', async({page}) => {

    await page.getByText('IoT Dashboard').click()
    
    const temBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
    await temBox.scrollIntoViewIfNeeded()

    const box = await temBox.boundingBox()
    const x = box.x + box.width / 2
    const y = box.y + box.height / 2
    console.log(x)
    console.log(y)
    await page.mouse.move(x,y)
    await page.mouse.down()    

})