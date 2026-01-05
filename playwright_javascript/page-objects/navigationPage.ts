import { Page } from "@playwright/test";


//Create a class for Navigation page, that list the methods for navigation across the webpage. Class should be exported 
// be able to import and instantiate in another spec file.
export class NavigationPage {

    readonly page: Page


    //Constructor of the class initiates the class and accepts a parameter named 'page' of type Playwright Page object
    constructor(page: Page) {
        this.page = page
    }

    async formLayoutsPage() {
        await this.page.getByText('Forms').click()
        await this.page.getByText('Form Layouts').click()        
    }


}