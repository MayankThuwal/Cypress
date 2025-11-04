import { ENV } from "@config/config.service";
import { orderPage } from "@pages/index";
import { IBaseAddressVM, IFulfillmentItemVM, IPackageVM } from "cypress/models/order.model";
import { cyAssertion, fixture, routes } from "cypress/shared/core";
import { selector } from "cypress/shared/selector";

describe('Order carrier stepper page', () => {
    let formData: {
        validItem: IFulfillmentItemVM,
        validRecipientAddress: IBaseAddressVM,
        validPackage: IPackageVM,
    }

    before(() => {
        cy.fixture(fixture.orderJSON).then((data) => {
            formData = data
        })
    })

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
        orderPage.selectPickupLocationDropdown();
        orderPage.clickAddressSaveAndContinueButton();
        orderPage.enterPackageDetails(formData.validPackage);
        orderPage.clickPackagingSaveAndContinueButton();
    })

    describe('UI Elements', () => {
        it('Should display all elements correctly', () => {
            orderPage.verifyOrderCarrierStepperPageElements();
        });
    });

    describe('Select shipment rate', () => {
        it('Select default first rate move to review page', () => {
            orderPage.clickCarrierSaveAndContinueButton();
        });
    });



})