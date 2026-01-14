import {test,expect} from '@playwright/test'
import tags from '../test-data/tags.json'

test.beforeEach(async ({page}) => {
    //To mock API reponses in Playwright, you should crreate a route and provide a handler function that 
    // will be called whenever a request is made that matches the route in beforeEach hook.
    await page.route('https://conduit-api.bondaracademy.com/api/tags', async route => {
        
        await route.fulfill({
            body: JSON.stringify(tags)
        })
    })

    await page.goto('https://conduit.bondaracademy.com/');
})

test('Navigate to home page', async ({page}) => {
    await page.waitForTimeout(1000)
    await expect(page.locator('.navbar-brand')).toHaveText('conduit');
})



