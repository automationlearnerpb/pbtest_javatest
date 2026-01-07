import { Page } from "@playwright/test";
import { NavigationPage } from '../page-objects/navigationPage'
import { FormLayoutsPage } from '../page-objects/formsLayoutPage'

export class PageManager {
    private readonly page: Page;
    private readonly navigationPage: NavigationPage;
    private readonly formLayoutsPage: FormLayoutsPage;

    constructor(page: Page) {
        this.page = page;
        this.navigationPage = new NavigationPage(page);
        this.formLayoutsPage = new FormLayoutsPage(page);
    }

    getNavigationPage() {
        return this.navigationPage;
    }

    getFormLayoutsPage() {
        return this.formLayoutsPage;
    }
}