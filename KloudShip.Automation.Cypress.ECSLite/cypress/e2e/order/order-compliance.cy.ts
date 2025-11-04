import { ENV } from "@config/config.service";
import { orderPage } from "@pages/index";
import { IBaseAddressVM, IFulfillmentItemVM, IPackageVM, IShipmentDocVM } from "cypress/models/order.model";
import { cyAssertion, fixture, routes } from "cypress/shared/core";
import { ShipmentDocTypeEnum } from "cypress/shared/enum";
import { selector } from "cypress/shared/selector";

describe('Order compliance stepper page', () => {
    let formData: {
        validItem: IFulfillmentItemVM,
        validRecipientAddress: IBaseAddressVM,
        validPackage: IPackageVM,
        complianceDetails: IShipmentDocVM
    }

    before(() => {
        cy.fixture(fixture.orderJSON).then((data) => {
            formData = data
            formData.complianceDetails.type == ShipmentDocTypeEnum.Invoice
        })
    })

    beforeEach(() => {
        cy.visitECS()
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

    describe('Form Validation', () => {
        
        it('Should not able to move forward without invoice in case of B2B carriers', () => {
        orderPage.enterPackageDetails(formData.validPackage);
        orderPage.enterPackageDetails(formData.validPackage);
        orderPage.clickPackagingSaveAndContinueButton();
        orderPage.clickCarrierSaveAndContinueButton();
        orderPage.clickComplianceSaveAndContinueButton();
        orderPage.verifyOrderComplianceStepperValidationErrors().invoiceRequiredForB2B();
        });

    });

    describe('Should successfully move to packaging screen for both B2B and Non B2B carrier', () => {

        it('Should able to move forward without invoice in case of B2C carriers', () => {
        orderPage.enterPackageDetails(formData.validPackage);
        orderPage.clickPackagingSaveAndContinueButton();
        orderPage.clickCarrierSaveAndContinueButton();
        orderPage.clickComplianceSaveAndContinueButton();
        });

        it('Should able to move forward to Review screen with invoice in case of B2B carriers', () => {
        orderPage.enterPackageDetails(formData.validPackage);
        orderPage.enterPackageDetails(formData.validPackage);
        orderPage.clickPackagingSaveAndContinueButton();
        orderPage.clickCarrierSaveAndContinueButton();
        orderPage.enterComplianceDetails(formData.complianceDetails);
        cy.wait(5000);
        orderPage.clickComplianceSaveAndContinueButton();
        });

    });

});