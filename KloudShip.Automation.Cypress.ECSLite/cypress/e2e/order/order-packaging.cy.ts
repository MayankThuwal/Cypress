import { ENV } from "@config/config.service";
import { orderPage } from "@pages/index";
import { IBaseAddressVM, IFulfillmentItemVM, IPackageVM } from "cypress/models/order.model";
import { cyAssertion, fixture, routes } from "cypress/shared/core";
import { selector } from "cypress/shared/selector";

describe('Order packaging stepper page', () => {
    let formData: {
        validItem: IFulfillmentItemVM,
        validRecipientAddress: IBaseAddressVM,
        invalidPackage: IPackageVM,
        invalidWeightPackage: IPackageVM
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
        orderPage.selectPickupLocationDropdown();
        orderPage.clickAddressSaveAndContinueButton();
    });

    describe('UI Elements', () => {
        it('Should display all elements correctly', () => {
            orderPage.verifyOrderPackagingStepperPageElements();
        });
    });

    describe('Form Vaildation', () => {
        it('Should give error for required fields', () => {
            orderPage.clickPackagingSaveAndContinueButton();
            orderPage.verifyOrderPackagingStepperValidationErrors().packageRequired();
            orderPage.verifyOrderPackagingStepperValidationErrors().lenghtGreaterThan();
            orderPage.verifyOrderPackagingStepperValidationErrors().widthGreaterThan();
            orderPage.verifyOrderPackagingStepperValidationErrors().heightGreaterThan();
        });

        it('Should give error for required fields when add button is clicked', () => {
            orderPage.clickPackagingSaveAndContinueButton();
            orderPage.verifyOrderPackagingStepperValidationErrors().lenghtGreaterThan();
            orderPage.verifyOrderPackagingStepperValidationErrors().widthGreaterThan();
            orderPage.verifyOrderPackagingStepperValidationErrors().heightGreaterThan();
        });

        it('Should give error for invalid fields', () => {
            orderPage.enterPackageDetails(formData.invalidPackage);
            orderPage.verifyOrderPackagingStepperValidationErrors().lenghtGreaterThan();
            orderPage.verifyOrderPackagingStepperValidationErrors().widthGreaterThan();
            orderPage.verifyOrderPackagingStepperValidationErrors().heightGreaterThan();
        });

        it('Should give error for package weight should be more than or equal to items weight and then delete that package', () => {
            orderPage.enterPackageDetails(formData.invalidWeightPackage)
            //TODO: Update this check as this now based on order type (Domestic / B2B) 
            // orderPage.verifyOrderPackagingStepperValidationErrors().morePackagesForB2B()
            orderPage.clickPackagingSaveAndContinueButton();
            orderPage.verifyOrderPackagingStepperValidationErrors().weightMismatchError();
            orderPage.clickDeletePackage();
            orderPage.verifyOrderPackagingStepperValidationErrors().packageDeleteSuccess();
        });

    });

    describe('Succesfully added package', () => {
        it('Should add package and move to carrier page', () => {
            orderPage.enterPackageDetails(formData.validPackage);
            orderPage.clickPackagingSaveAndContinueButton();
        });
    });

});