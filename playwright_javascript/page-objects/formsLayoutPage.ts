import { Page } from "@playwright/test";

export class FormLayoutsPage {

    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async submitUsingTheGridWithCredentialsAndOption(email: string,
                                                    password: string,
                                                    optionText: string ) {
        const usingTheGridForm = this.page.locator('nb-card',{hasText: 'Using the Grid'})
        const emailInput = usingTheGridForm.getByRole('textbox',{name:'Email'})
        const passwordInput = usingTheGridForm.getByRole('textbox',{name:'Password'})
        const optionInput = usingTheGridForm.getByRole('radio',{name:optionText})

        await emailInput.fill(email)
        await passwordInput.fill(password)
        await optionInput.check({force: true})
        await usingTheGridForm.getByRole('button', {name: 'Sign in'}).click()

    }

    /**
     * This method fills out the inline form with user details
     * @param name - should be first and last name and is of type string
     * @param email - a valid email in the format of xxx@yyyy.com
     * @param remberMe - a boolean value to indicate if remember me check box should be checked.
     */

    async submitInlineFormWithRememberMe(name: string,
                                        email: string,
                                        remberMe: boolean ) {
        const inlineForm = this.page.locator('nb-card',{hasText: 'Inline form'})
        const emailInput = inlineForm.getByRole('textbox',{name:'Email'})
        const nameInput = inlineForm.getByPlaceholder('Jane Doe')
        const remberMeBox = inlineForm.getByRole('checkbox',{name:'Remember me'})

           
        await emailInput.fill(email)
        await nameInput.fill(name)

        if (remberMe){
            await remberMeBox.check({force: true})
        }
        
        await inlineForm.getByRole('button', {name: 'Submit'}).click()

    }

}