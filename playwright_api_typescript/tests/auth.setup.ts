import {test as setup } from '@playwright/test';

const authFilePath = '.auth/user.json';

setup('authentication', async({page})=>{

    await page.goto('https://conduit.bondaracademy.com/')
    await page.getByText('Global Feed').click()
    
    await page.getByText('Sign in').click()
    await page.getByPlaceholder('Email').fill('pbtestuser@test.com')
    await page.getByPlaceholder('Password').fill('wibblewobble')
    await page.getByRole('button', {name: 'Sign in'}).click()

    await page.waitForResponse('**/api/tags')

    await page.context().storageState({path: authFilePath})

})