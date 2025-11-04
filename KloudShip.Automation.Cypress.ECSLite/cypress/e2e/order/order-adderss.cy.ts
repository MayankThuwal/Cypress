import { ENV } from "@config/config.service";
import { orderPage } from "@pages/index";
import { IBaseAddressVM, IFulfillmentItemVM } from "cypress/models/order.model";
import { fixture, cyAssertion, routes } from "cypress/shared/core";
import { selector } from "cypress/shared/selector";

describe('Order address stepper page', () => {
    let formData: {
        validItem: IFulfillmentItemVM
        invalidRecipientAddress: IBaseAddressVM,
        validRecipientAddress: IBaseAddressVM
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
    });

    describe('UI Elements', () => {
        it('Should display all elements correctly', () => {
            orderPage.verifyOrderAddressStepperPageElements();
        });
    });

    describe('Form Validation', () => {
    it('Should show validation errors for required fields', () => {
        orderPage.clickAddressSaveAndContinueButton();
        orderPage.verifyOrderAddressStepperValidationErrors().firstNameRequired();
        orderPage.verifyOrderAddressStepperValidationErrors().mobileNumberRequired();
        orderPage.verifyOrderAddressStepperValidationErrors().address1Required();
        orderPage.verifyOrderAddressStepperValidationErrors().address2Required();
        orderPage.verifyOrderAddressStepperValidationErrors().pincodeRequired();
        orderPage.verifyOrderAddressStepperValidationErrors().cityRequired();
        orderPage.verifyOrderAddressStepperValidationErrors().stateRequired();
    });

    it('Should show validation errors for required fields', () => {
        orderPage.clickSaveOrderButton();
        orderPage.verifyOrderAddressStepperValidationErrors().firstNameRequired();
        orderPage.verifyOrderAddressStepperValidationErrors().mobileNumberRequired();
        orderPage.verifyOrderAddressStepperValidationErrors().address1Required();
        orderPage.verifyOrderAddressStepperValidationErrors().address2Required();
        orderPage.verifyOrderAddressStepperValidationErrors().pincodeRequired();
        orderPage.verifyOrderAddressStepperValidationErrors().cityRequired();
        orderPage.verifyOrderAddressStepperValidationErrors().stateRequired();
    });

    it('Should show validation errors for required fields', () => {
        orderPage.clickEditAdditionalAddressButton();
        orderPage.verifyOrderAddressStepperValidationErrors().firstNameRequired();
        orderPage.verifyOrderAddressStepperValidationErrors().mobileNumberRequired();
        orderPage.verifyOrderAddressStepperValidationErrors().address1Required();
        orderPage.verifyOrderAddressStepperValidationErrors().address2Required();
        orderPage.verifyOrderAddressStepperValidationErrors().pincodeRequired();
        orderPage.verifyOrderAddressStepperValidationErrors().cityRequired();
        orderPage.verifyOrderAddressStepperValidationErrors().stateRequired();
    });

    it('Should show validation errors for invalid fields', () => {
        orderPage.enterRecipientAddress(formData.invalidRecipientAddress);
        orderPage.clickAddressSaveAndContinueButton();
        orderPage.verifyOrderAddressStepperValidationErrors().minTwoFirstNameCharacter();
        orderPage.verifyOrderAddressStepperValidationErrors().minTwoLastNameCharacter();
        orderPage.verifyOrderAddressStepperValidationErrors().invalidMobile();
        orderPage.verifyOrderAddressStepperValidationErrors().invalidEmail();
        orderPage.verifyOrderAddressStepperValidationErrors().minTwoBusinessNameCharacter();
        orderPage.verifyOrderAddressStepperValidationErrors().minSixAddress1Character();
        orderPage.verifyOrderAddressStepperValidationErrors().minSixAddress2Character();
        orderPage.verifyOrderAddressStepperValidationErrors().minSixPincodeCharacter();
        orderPage.verifyOrderAddressStepperValidationErrors().cityRequired();
        orderPage.verifyOrderAddressStepperValidationErrors().stateRequired();
    });

    });

    describe('Should successfully save order or continue to packaging screen', () => {
        it('Add address successfully and save order', () => {
            orderPage.enterRecipientAddress(formData.validRecipientAddress);
            orderPage.clickAddLatLongButton();
            cy.wait(5000);
            orderPage.clickSaveMapButton();
            orderPage.clickSaveOrderButton();
        });

        it('Add address successfully and move to packaging screen', () => {
            orderPage.enterRecipientAddress(formData.validRecipientAddress);
            orderPage.clickAddLatLongButton();
            cy.wait(5000);
            orderPage.clickSaveMapButton();
            orderPage.selectPickupLocationDropdown();
            orderPage.clickAddressSaveAndContinueButton();
        });
    });

});