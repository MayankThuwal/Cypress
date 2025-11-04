import { ENV } from "@config/config.service";
import { managePage } from "@pages/index";
import { fixture, cyAssertion, routes} from "cypress/shared/core";
import { selector } from "cypress/shared/selector";

describe('Store page', () => {

    let formData: {
        validStore: any,
    }

    before(() => {
        cy.fixture(fixture.manageJSON).then((data) => {
            formData = data
        })
    })

    beforeEach(() => {
        cy.visitECS();
        cy.login(ENV.application.credentials.email, ENV.application.credentials.password);
        cy.hamburgerMenuNavigation(selector.sideNav.manageNavigation);
        cy.url().should(cyAssertion.include, routes.manage);
        managePage.clickIntegrationsTab();
        managePage.clickStoresFeatureCard();
        cy.url().should(cyAssertion.include, routes.stores);
    })

    describe('Manual Store CRUD operations', () => {
        it('Should successfully create a new manual store', () => {
            managePage.clickAddStoreButton();
            managePage.clickManualStoreTypeButton();
            managePage.clickStoresStepperSaveAndContinueButton();
            managePage.enterManualStoreDetails(formData.validStore);
            managePage.verifyStoreValidationErrors().storeSavedSuccessfully();
        });

        it('Should successfully update a manual store', () => {
            managePage.clickStoresFirstRowInList();
            managePage.clickUpdateStoreButton();
            managePage.enterManualStoreDetails(formData.validStore);
            managePage.verifyStoreValidationErrors().storeUpdatedSuccessfully();
        });

        it('Should successfully delete a manual store', () => {
            managePage.clickStoresListMoreOptionsButtons();
            managePage.clickOverFlowMenuDeleteButton();
            managePage.clickDeletePopupConfirmButton();
            managePage.verifyStoreValidationErrors().storeDeletedSuccessfully();
        });

    });

})