import {test, expect } from '@playwright/test'
import { PageManager } from '../../page-objects/pageManager'


test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/pages/iot-dashboard')
    
})

test('navigate to form page', async({page}) => {
    const pm = new PageManager(page)
    await pm.getNavigationPage().formLayoutsPage()
})


test('navigate to datepicker page', async({page}) => {
    const pm = new PageManager(page)    
    await pm.getNavigationPage().datePickerPage()
})

test('navigate to calendar page', async({page}) => {
    const pm = new PageManager(page)    
    await pm.getNavigationPage().calendarPage()
})

test('navigate to popover page', async({page}) => {
    const pm = new PageManager(page)    
    await pm.getNavigationPage().popoverPage()
})

test('navigate to smart table page', async({page}) => {
    const pm = new PageManager(page)    
    await pm.getNavigationPage().smartTablePage()
})

test('navigate to toastr page', async({page}) => {
    const pm = new PageManager(page)    
    await pm.getNavigationPage().toastrPage()
})

test('navigate to tooltip page', async({page}) => {
    const pm = new PageManager(page)    
    await pm.getNavigationPage().tooltipPage()
})

test('Submit forms with values', async({page}) => {
    const pm = new PageManager(page)
    
    await pm.getNavigationPage().formLayoutsPage()
    await pm.getFormLayoutsPage().submitUsingTheGridWithCredentialsAndOption('test@test.com', 'password', 'Option 1')
    await pm.getFormLayoutsPage().submitInlineFormWithRememberMe('Test User', 'test@test.com', true)
    await pm.getFormLayoutsPage().submitInlineFormWithRememberMe('Test User', 'test@test.com', false)
})