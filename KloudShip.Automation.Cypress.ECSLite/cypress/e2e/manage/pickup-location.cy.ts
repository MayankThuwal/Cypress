import { ENV } from "@config/config.service";
import { managePage } from "@pages/index";
import { IPickUpLocationVM } from "@models/index";
import { fixture, cyAssertion, routes } from "cypress/shared/core";
import { selector } from "cypress/shared/selector";

describe('Pickup location page', () => {

    let formData: {
        pickupLocation: IPickUpLocationVM,
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
        managePage.clickPickLocationFeatureCard();
        cy.url().should(cyAssertion.include, routes.pickupLocation);
    })

    describe('Pickup location CRUD operations', () => {
        it('Should successfully create a new pickup location', () => {
           managePage.clickAddPickupLocationButton();
           managePage.enterLocationDetails(formData.pickupLocation);
           managePage.clickAddLatLongButton();
           cy.wait(5000);
           managePage.clickSaveMapButton();
           managePage.clickSavePickupLocationButton();
           managePage.verifyPickupLocationValidationErrors().pickupLocationSavedSuccessfully();
        });

        it('Should successfully update a pickup location', () => {
            managePage.clickPickupLocationFirstRowInList();
            managePage.enterLocationDetails(formData.pickupLocation);
            managePage.clickUpdatePickupLocationButton();
            managePage.verifyPickupLocationValidationErrors().pickupLocationUpdatedSuccessfully();
        });

        it('Should successfully delete a pickup location', () => {
            managePage.clickPickupLocationListMoreOptionsButtons();
            managePage.clickOverFlowMenuDeleteButton();
            managePage.clickDeletePopupConfirmButton();
            managePage.verifyPickupLocationValidationErrors().pickupLocationDeletedSuccessfully();
        });
    });

})