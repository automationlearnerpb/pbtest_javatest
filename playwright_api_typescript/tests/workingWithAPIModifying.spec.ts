import {test,expect, request} from '@playwright/test'
import tags from '../test-data/tags.json'


test.beforeEach(async ({page}) => {
    //In this method we will modify the API response by intercepting the request and providing our own response.
    

    await page.goto('https://conduit.bondaracademy.com/');
})

test('Navigate to home page', async ({page}) => {
    await page.waitForTimeout(1000)
    await page.getByText('Global Feed').click()
    await page.route('*/**/api/articles*', async route => {

        const response = await route.fetch()
        const responseBody = await response.json()
        responseBody.articles[0].title = 'This is modified title'
        responseBody.articles[0].description = 'This is a modified description'        
        
        
        await route.fulfill({
            body: JSON.stringify(responseBody)
        })
    })
    await page.getByText('Global Feed').click()
    await expect(page.locator('.navbar-brand')).toHaveText('conduit')
    await expect(page.locator('.article-preview').first().locator('h1')).toHaveText('This is modified title')
})


test('Delete an article by invoking delete article API and intercepting create article API response', async ({page, request}) => {
   const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login',{
        data: {
            "user": {
                "email": "pbtestuser@test.com",
                "password": "wibblewobble"
            }
        }
    })
    const accessToken = (await response.json()).user.token
    console.log('Access Token:', accessToken)

    await page.getByText('Global Feed').click()
    await expect(page.locator('.navbar-brand')).toHaveText('conduit')
   // await page.getByText('Sign in').click()
    //await page.getByPlaceholder('Email').fill('pbtestuser@test.com')
   // await page.getByPlaceholder('Password').fill('wibblewobble')
    //await page.getByRole('button', {name: 'Sign in'}).click()

    await page.getByText('New Article').click()
    await page.getByPlaceholder('Article Title').fill('This is a test article created by pm')
    await page.getByPlaceholder("What's this article about?").fill('This article is about pw practice')
    await page.getByPlaceholder('Write your article (in markdown)').fill('This is test description')
    await page.getByRole('button', {name: 'Publish Article'}).click()
    const articleResponse = await page.waitForResponse('**/api/articles/*')
    const articleResponseBody = await articleResponse.json()
    const slug = articleResponseBody.article.slug

    const deleteArticleResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slug}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
    console.log('Delete Article Response Status:', deleteArticleResponse.status())

    expect(deleteArticleResponse.status()).toBe(204)
    
    await page.getByText('Home').click()
    await page.getByText('Global Feed').click()
    await expect(page.locator('.article-preview h1').first()).not.toHaveText('This is a test article created by pm')
 
})

test('Delete an article by invoking create article API first', async ({page, request}) => {
   const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login',{
        data: {
            "user": {
                "email": "pbtestuser@test.com",
                "password": "wibblewobble"
            }
        }
    })
    const accessToken = (await response.json()).user.token
    console.log('Access Token:', accessToken)

    const createArticleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
        data: {
            "article": {
                "title": "This is a test article created by pm",
                "description": "This article is about pw practice",
                "body": "This is test description",
                "tagList": [
                    "Test1, Test2"
                ]
            }
        }
    })
    const createdArticle = await createArticleResponse.json()
    console.log('Created Article:', createdArticle)

    await page.getByText('Global Feed').click()
    await expect(page.locator('.navbar-brand')).toHaveText('conduit')
   // await page.getByText('Sign in').click()
   // await page.getByPlaceholder('Email').fill('pbtestuser@test.com')
   // await page.getByPlaceholder('Password').fill('wibblewobble')
   // await page.getByRole('button', {name: 'Sign in'}).click()
   // await page.getByText('Global Feed').click()
    await expect(page.locator('.article-preview h1').first()).toHaveText('This is a test article created by pm')
    await page.locator('.article-preview').first().locator('a', {hasText: 'This is a test article created by pm'}).click()
    await expect(page.locator('.article-page p')).toContainText('This is test description')
    await page.getByRole('button',{name: 'Delete Article'}).first().click()

    await expect(page.locator('.article-preview h1').first()).not.toHaveText('This is a test article created by pm')


})



