import { ENV } from "@config/config.service";
import { orderPage } from "@pages/index";
import { cyAssertion, routes } from "cypress/shared/core";
import { selector } from "cypress/shared/selector";

describe('Order general stepper page', () => {

    beforeEach(() => {
        cy.visitECS();
        cy.login(ENV.application.credentials.email, ENV.application.credentials.password);
        cy.hamburgerMenuNavigation(selector.sideNav.orderNavigation);
        cy.url().should(cyAssertion.include, routes.order);
        orderPage.clickAddOrderButton();
    });

    describe('UI Elements', () => {
        it('Should display all elements correctly', () => {
            orderPage.verifyOrderGeneralStepperPageElements();
        });
    });

    describe('Order configuration', () => {
        it('Should fill general stepper form successfully', () => {
            orderPage.clickStoreDropdown();
            orderPage.clickPaymentTypeDropdown();
            orderPage.inputOrderNumber();
            orderPage.clickSaveAndContinueButton();
        });
    });

})