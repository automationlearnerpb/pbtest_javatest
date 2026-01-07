import {test, expect} from '@playwright/test'

test.describe('Form layout tests suite',()=>{

    test.beforeEach(async({page}, testInfo) => {
        await page.goto('http://localhost:4200/pages/iot-dashboard')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()

        //this setting allows to manage the timeout for this suite
        //testInfo.setTimeout(testInfo.timeout )
    })

    test.skip('Locator practice test',async({page}) => {
        // By Tag
        const byTag = page.locator('input')

        //By ID
        const byID = page.locator('#inputEmail1')

        //By Class
        const byClass = page.locator('.shape-rectangle')

        //By Attribute
        const byAttribute = page.locator('[placeholder="Email"]')

        //By Class value full
        const byClassFullValue = page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

        //Combine different Selectors
        const byDiffSelector = page.locator('input[placeholder="Recipients"]')

        //By LinkText

        //By Partial text match
        const byPartialText = page.locator(':text("Using")')

        //By exact text match
        const byExactText = page.locator(':text-is("Using hte Grid")')

        expect(byTag).toBeTruthy
        await byID.fill('test@test.com')
        await (expect (byID)).toHaveValue('test@test.com')
        await byID.fill('test@byattribute.coom')
        await (expect(byID)).toHaveValue('test@byattribute.coom')


    })

    test('Automatic wait for load delay test',async({page})=>{
        await page.goto('http://uitestingplayground.com/')
        await page.getByText('Load Delay').click()

        /*Points to consider
            For expect to work, note the assertion function should end with braces like a function call
            Wrap the expect in an await to wait for the locator and then perform action on it. You
            can wrap the entire expect such as expec(page.getBy().tobeVissible()) within await() or you can wrap
            just the element extraction in await()        
        */

        await(expect(page.getByRole('heading', { name: 'Load Delays' })).toBeVisible())

        //Verify the button is visible
        await expect (page.getByRole('button', {name:'Button Appearing After Delay'})).toBeVisible()
    })

    test('Automatic wait test for 15s delay',async({page})=>{
        await page.goto('http://uitestingplayground.com/')
        await page.getByRole('link',{name: 'AJAX Data'}).click()

        /*Points to consider
            For expect to work, note the assertion function should end with braces like a function call
            Wrap the expect in an await to wait for the locator and then perform action on it. You
            can wrap the entire expect such as expec(page.getBy().tobeVissible()) within await() or you can wrap
            just the element extraction in await()        
        */

        await(expect(page.getByRole('heading', { name: 'AJAX Data' })).toBeVisible())

        //Using timeout on click is considered a bad practice as you should let playwright perform an automatic wait on actions
        await page.getByRole('button', {name: 'Button Triggering AJAX Request'})
            .click()

        //Verify the button is visible
        const successMessageLocator = page.locator('.bg-success');

        //Specify a time our within expect and action
        //await expect(successMessageLocator).toBeVisible();

        await expect(successMessageLocator).toBeVisible({timeout:20_000});

        const successMessage = await successMessageLocator.innerText();
        console.log(successMessage);

        expect(successMessage).toBe('Data loaded with AJAX get request.');
    })


})