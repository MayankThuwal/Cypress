import { selector } from "../shared/selector";
import { utils } from "./utils";
import { ENV } from "@config/config.service";

declare global {
    namespace Cypress {
        interface Chainable<Subject> {
            login(email?: string, password?: string): Chainable<void>;
            visitECS(): Chainable<void>;
            visitExternal(url: string): Chainable<void>;
            hamburgerMenuNavigation(navigationselector?: string): Chainable<void>;
            logout(): void;
        }
    }
}

// Custom command to handle login
Cypress.Commands.add('login', (email?: string, password?: string) => {
    if (email && password) {
        utils.generalInput(utils.getElement(selector.loginPage.emailInputLocator), email);
        utils.generalInput(utils.getElement(selector.loginPage.passwordInputLocator), password);
    }
    utils.submit(utils.getElement(selector.loginPage.loginButtonLocator));
});

// Custom command to visit ECS
Cypress.Commands.add('visitECS', () => {
    cy.visit(ENV.application.appBaseUrl);
});

// Custom command to visit external url
Cypress.Commands.add('visitExternal', (url: string) => {
    cy.visit(url);
});

// Custom command to navigate through Hamburger menu
Cypress.Commands.add('hamburgerMenuNavigation', (navigationselector?: string) => {
    utils.getElement(selector.sideNav.hamburgerMenuLocator).click();
    if (navigationselector) {
        utils.getElement(navigationselector).click();
    }
});

Cypress.Commands.add('logout', () => {
    utils.getElement(selector.header.profilButtonLocator).click();
    utils.getElement(selector.header.logoutButtonLocator).click();
});
