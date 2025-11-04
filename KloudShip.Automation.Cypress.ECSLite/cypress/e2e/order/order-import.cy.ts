import { ENV } from "@config/config.service";
import { orderPage } from "@pages/index";
import { IBaseAddressVM, IFulfillmentItemVM, IPackageVM } from "cypress/models/order.model";
import { cyAssertion, fixture, routes } from "cypress/shared/core";
import { selector } from "cypress/shared/selector";

describe('Import order flow', () => {
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
    });

    describe('Import JSON and CSV file to import order', () => {
        
        it('Import JSON orders file and fulfill one order', () => {
            orderPage.clickImportOrderButton();
            orderPage.uploadImportFile(fixture.orderImportJSON);
            orderPage.clickUploadButton();
            orderPage.verifyImportPopupValidationErrors().orderImportedSuccessfully();
            orderPage.closeImportPopButton();
            orderPage.clickFirstOrderInList();
            orderPage.clickFulfillOrderButton();
            orderPage.enterPackageDetails(formData.validPackage);
            orderPage.clickPackagingSaveAndContinueButton();
            orderPage.clickCarrierSaveAndContinueButton();
            orderPage.clickComplianceSaveAndContinueButton();
            orderPage.clickCreateShipmentButton();
            orderPage.verifyOrderDetailStepperPageElements();
            orderPage.verifyOrderDetailStepperValidationErrors().shipmentCreatedSuccessfully();
        });

        it('Import CSV orders file and fulfill one order', () => {
            orderPage.clickImportOrderButton();
            orderPage.uploadImportFile(fixture.orderImportCSV);
            orderPage.clickUploadButton();
            orderPage.verifyImportPopupValidationErrors().orderImportedSuccessfully();
            orderPage.closeImportPopButton();
            orderPage.clickFirstOrderInList();
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