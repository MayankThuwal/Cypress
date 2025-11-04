import { ENV } from "@config/config.service";
import { orderPage } from "@pages/index";
import { IFulfillmentItemVM } from "cypress/models/order.model";
import { cyAssertion, fixture, routes } from "cypress/shared/core";
import { selector } from "cypress/shared/selector";

describe('Order item stepper page', () => {
    let formData: {
        invalidItem: IFulfillmentItemVM
        validItem: IFulfillmentItemVM
    };

    before(() => {
        cy.fixture(fixture.orderJSON).then((data) => {
            formData = data;
        });
    });

    beforeEach(() => {
        cy.visitECS();
        cy.login(ENV.application.credentials.email, ENV.application.credentials.password);
        cy.hamburgerMenuNavigation(selector.sideNav.orderNavigation);
        cy.url().should(cyAssertion.include, routes.order);
        cy.wait(5000);
        orderPage.clickAddOrderButton();
        cy.wait(2000);
        orderPage.inputOrderNumber();
        orderPage.clickSaveAndContinueButton();
    });

    describe('UI Elements', () => {
        it('Should display all elements correctly', () => {
            orderPage.verifyOrderItemStepperPageElements();
        });
    });

    describe('Form Validation', () => {
        it('Should show validation errors for required fields', () => {
            orderPage.clickItemsSaveAndContinueButton();
            orderPage.verifyOrderItemStepperValidationErrors().nameRequired();
            orderPage.verifyOrderItemStepperValidationErrors().weightGreaterThan();
            orderPage.verifyOrderItemStepperValidationErrors().priceGreaterThan();
            orderPage.verifyOrderItemStepperValidationErrors().invalidShipmentItems();
        });

        it('Should show validation errors invalid value ', () => {
            orderPage.addItem(formData.invalidItem);
            orderPage.verifyOrderItemStepperValidationErrors().minTwoCharacter();
            orderPage.verifyOrderItemStepperValidationErrors().weightGreaterThan();
            orderPage.verifyOrderItemStepperValidationErrors().priceGreaterThan();
        });

        it('Should show validation errors for max 4 items', () => {
            orderPage.addItem(formData.validItem);
            orderPage.addItem(formData.validItem);
            orderPage.addItem(formData.validItem);
            orderPage.addItem(formData.validItem);
            orderPage.addItem(formData.validItem);
            orderPage.verifyOrderItemStepperValidationErrors().maxFourItem();
        });

    });

    describe('Save add item for successfully', () => {
        it('Should fill item stepper form successfully', () => {
            orderPage.addItem(formData.validItem);
            orderPage.addItem(formData.validItem);
            orderPage.clickItemsSaveAndContinueButton();
        });
    });

})