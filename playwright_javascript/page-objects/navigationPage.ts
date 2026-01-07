import { Locator, Page } from "@playwright/test";


//Create a class for Navigation page, that list the methods for navigation across the webpage. Class should be exported 
// be able to import and instantiate in another spec file.
export class NavigationPage {

    readonly page: Page
    readonly formsLayoutsMenuItem: Locator
    readonly datePickerMenuItem: Locator
    readonly toastrMenuItem: Locator
    readonly tooltipMenuItem: Locator
    readonly popoverMenuItem: Locator
    readonly calendarMenuItem: Locator
    readonly smartTableMenuItem: Locator



    //Constructor of the class initiates the class and accepts a parameter named 'page' of type Playwright Page object
    constructor(page: Page) {
        this.page = page
        this.formsLayoutsMenuItem = page.getByText('Form Layouts')
        this.datePickerMenuItem = page.getByText('Datepicker')
        this.toastrMenuItem = page.getByText('Toastr')
        this.tooltipMenuItem = page.getByText('Tooltip')
        this.popoverMenuItem = page.getByText('Popover')
        this.calendarMenuItem = page.getByText('Calendar')
        this.smartTableMenuItem = page.getByText('Smart Table')
    }

    private async selectGroupMenuItem(itemName: string) {
        const groupMenuItemLocator = await this.page.getByTitle(itemName)
        const groupMenuItemOpenStatus = await groupMenuItemLocator.getAttribute('aria-expanded')

        if (groupMenuItemOpenStatus == 'false'){
            await this.page.getByTitle(itemName).click()

        }
               
    }

    async formLayoutsPage() {
        await this.selectGroupMenuItem('Forms')
        await this.formsLayoutsMenuItem.click()        
    }

    async datePickerPage() {
        await this.selectGroupMenuItem('Forms')
        await this.datePickerMenuItem.click()        
    }

    async toastrPage() {
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.toastrMenuItem.click()        
    }

    async tooltipPage() {
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.tooltipMenuItem.click()             
    }

    async popoverPage() {
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.popoverMenuItem.click()               
    }

    async calendarPage() {
        await this.selectGroupMenuItem('Extra Components')
        await this.calendarMenuItem.click()             
    }

    async smartTablePage() {
        await this.selectGroupMenuItem('Tables & Data')
        await this.smartTableMenuItem.click()             
    }


}