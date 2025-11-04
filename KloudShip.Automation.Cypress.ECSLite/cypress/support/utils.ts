import { appConstant, keyboardKeys, cyAssertion} from "../shared/core";
import { selector } from "../shared/selector";
export class Utils {

    // Method to get an element by selector
    getElement(selector: string): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(selector);
    };

    // Method to verify image URL
    verifyImageURL(expectedUrl: string, imageSelector: Cypress.Chainable<JQuery<HTMLElement>>) {
        return imageSelector
            .should(cyAssertion.exist)
            .and(cyAssertion.haveAttribute, cyAssertion.src)
            .and(cyAssertion.include, expectedUrl);
    };

    // General mehtod for input fields
    generalInput(inputSelector: Cypress.Chainable<JQuery<HTMLElement>>, value: string | undefined) {
        if(value){
            return inputSelector.type(value);
        }
    };

    // Method to submit a form or button
    submit(buttonSelector: Cypress.Chainable<JQuery<HTMLElement>>) {
        buttonSelector.click();
    };

    // Method to verify error messages and its position
    verifyErrorMessage(selector: Cypress.Chainable<JQuery<HTMLElement>>, expectedMessage: string) {
        return selector
            .should(cyAssertion.exist)
            .and(cyAssertion.beVisible)
            .and(cyAssertion.contains, expectedMessage);
    }

    // Method for custom email generation
    generateCustomEmail(): string {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${appConstant.kloudshipHyphenCyrpess}-${year}${month}${day}-${hours}${minutes}${appConstant.yopmail}`;
    }

    // Method to invoke inner text of an element and compare with expected messages
    invokeInnerText(selector: string, messages: string) {
        return this.getElement(selector)
            .should(cyAssertion.beVisible)
            .invoke(cyAssertion.prop, cyAssertion.innerText)
            .then((text) => {
                const normalizedText = text.replace(/\s+/g, ' ').trim();
                const expectedText = messages.replace(/\s+/g, ' ').trim();
                expect(normalizedText).to.contain(expectedText);
            });
    }

    // Method to click on HTML part of email in yopmail
    clickMailPrimaryButton(mailSelector: string, buttonSelector: string) {
        this.getElement(mailSelector)
            .its(selector.yopMailPage.readIframeHTML)
            .then((body) => {
                const html = body.innerHTML;
                const linkElement = Cypress.$(html).find(buttonSelector);
                const resetPasswordUrl = linkElement.attr(cyAssertion.href);
                if (resetPasswordUrl) {
                    cy.visitExternal(resetPasswordUrl);
                }
            });
    }

    verifyStringInMail(mailSelector: string, searchString: string): Cypress.Chainable<JQuery<HTMLElement>> {
        // Note: We use .contains() which is built for assertion and retries
        return this.getElement(mailSelector)
            .its(selector.yopMailPage.readIframeHTML)
            .should((body) => {
                // Get the innerHTML and convert both to lowercase for case-insensitivity
                const htmlText = body.innerHTML.toLowerCase();
                const search = searchString.toLowerCase();

                // This is the assertion. If 'htmlText' does not include 'search', the test fails.
                expect(htmlText).to.include(search);
            });
    }

    // Method to click dropdown options if value given else choose first
    clickDropdownOptionOrFirst(value?: string) {
        if (value) {
            this.getElement(selector.muiSelectors.drowdownOptions)
                .contains(value)
                .click();
        } else {
            this.getElement(selector.muiSelectors.drowdownOptions)
                .first()
                .click();
        }
    }

    // Method to generate a random unique order number
    generateRandomOrderNumber(): string {
        const randomNumber = Math.floor(Math.random() * 100000);
        return `${appConstant.ord}${appConstant.hypen}${randomNumber}`;
    }

    // Method to import file
    generalUploadFile(fileName: string, importSelector: string) {
        cy.fixture(fileName).then(fileContent => {
            let content;
            if (fileName.endsWith('.json')) {
                content = fileContent
            }
            else {
                content = Cypress.Buffer.from(fileContent)
            }
            this.getElement(importSelector).selectFile(
                {
                    contents: content,
                    fileName: fileName,
                },
                { action: 'drag-drop', force: true }
            );
        });
    }

    fillYopMailEmailInput(email: string) {
        this.getElement(selector.yopMailPage.emailInputLocator)
            .clear()
            .type(`${email}${keyboardKeys.enterKey}`);
    };
}

export const utils = new Utils();
