//Below line imports the test method from playwright test library to be used in tests
import { expect, test }  from "@playwright/test";  



test.describe('PW page tests',() =>{
    test('Navigate to Login',async ({page}) => {
        await page.goto('http://localhost:4200/pages/iot-dashboard')
        await page.getByText('Auth').click()
        expect(page.getByText('Login')).toBeVisible()
        await page.getByText('Login').click()   
        await expect.soft(page.getByRole('heading')).toHaveText('Login'); 

    })

    test('Login with valid credentials pw page',async ({page}) => {
        await page.goto('http://localhost:4200/pages/iot-dashboard')
        await page.getByText('Auth').click()
        await expect(page.getByText('Login')).toBeVisible()
        await page.getByText('Login').click()        
        await page.getByRole('textbox',{ name:'email'}).fill('test@test.com')
        await page.getByLabel('Password').fill('12345678')
        await page.getByRole('button', {name:'Log In'}).click()
        //await(expect(page.getByRole('heading', {name:'IoT Dashboard'}), 'Succesful login home menu is visible')).toBeVisible()
        
        await (expect(page.getByText('PW-test'), 'On succesfull login')).toBeVisible()
    })

})


test.describe('Nopcommerce page tests',() =>{
    test.beforeEach(async({page}) =>{
    await page.goto('https://admin-demo.nopcommerce.com/')
    })

    test('Login with valid credentials',async ({page}) => {
        await page.getByTestId('Email').fill('admin@yourstore.com')
        await page.getByTestId('Password').fill('admin')
        await page.getByRole('button').click()
       
    })

    //test('Navigate to Forms',async ({page}) => {
    //await page.getByText('Forms').click()
   // console.log('Navigating to Forms')
   // })

})





