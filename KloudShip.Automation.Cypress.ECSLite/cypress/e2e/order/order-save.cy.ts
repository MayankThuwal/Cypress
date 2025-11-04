import { ENV } from "@config/config.service";
import { orderPage } from "@pages/index";
import { IBaseAddressVM, IFulfillmentItemVM, IPackageVM } from "cypress/models/order.model";
import { cyAssertion, fixture, routes } from "cypress/shared/core";
import { selector } from "cypress/shared/selector";

describe('Order save flow', () => {
    let formData: {
        validItem: IFulfillmentItemVM
        invalidRecipientAddress: IBaseAddressVM,
        validRecipientAddress: IBaseAddressVM,
        validPackage: IPackageVM,
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
        orderPage.inputOrderNumber();
        orderPage.clickSaveAndContinueButton();
        orderPage.addItem(formData.validItem);
        orderPage.clickItemsSaveAndContinueButton();
        orderPage.enterRecipientAddress(formData.validRecipientAddress);
        orderPage.clickAddLatLongButton();
        cy.wait(5000);
        orderPage.clickSaveMapButton();
        orderPage.clickSaveOrderButton();
    });

    describe('Verify order saved', () => {
        it('Should display the orde saved notification alert', () => {
            orderPage.verifyOrderSaveStepperValidationErrors().orderSavedSuccessfully();
        });
    });

    describe('Fulfill shipment using saved order', () => {
        it('Should fulfill a shipment using saved order and verify successful shipment creation', () => {
            orderPage.clickFulfillOrderButton();
            orderPage.enterPackageDetails(formData.validPackage);
            orderPage.clickPackagingSaveAndContinueButton();
            orderPage.clickCarrierSaveAndContinueButton();
            orderPage.clickComplianceSaveAndContinueButton();
            orderPage.clickCreateShipmentButton();
            orderPage.verifyOrderDetailStepperPageElements();
            orderPage.verifyOrderDetailStepperValidationErrors().shipmentCreatedSuccessfully();
        });
    });

})