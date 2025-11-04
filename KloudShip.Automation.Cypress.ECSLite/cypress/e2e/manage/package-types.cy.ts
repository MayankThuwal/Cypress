import { ENV } from "@config/config.service";
import { managePage } from "@pages/index";
import { IPackageVM } from "@models/index";
import { cyAssertion, fixture, routes } from "cypress/shared/core";
import { selector } from "cypress/shared/selector";

describe('Package types page', () => {

    let formData: {
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
        cy.hamburgerMenuNavigation(selector.sideNav.manageNavigation);
        cy.url().should(cyAssertion.include, routes.manage);
        managePage.clickPackageTypesFeatureCard();
        cy.url().should(cyAssertion.include, routes.packageTypes);
    })

    describe('Package type CRUD operations', () => {
        it('Should successfully create a new package', () => {
           managePage.clickAddPackageButton();
           managePage.enterPackageDetails(formData.validPackage);
           managePage.clickSavePackageTypesButton();
           managePage.verifyPackageTypesValidationErrors().packageTypesSavedSuccessfully();
        });

        it('Should successfully update a package', () => {
            managePage.clickPackageFirstRowInList();
            managePage.enterPackageDetails(formData.validPackage);
            managePage.clickUpdatePackageTypesButton();
            managePage.verifyPackageTypesValidationErrors().packageTypesUpdatedSuccessfully();
        });

        it('Should successfully delete a package', () => {
            managePage.clickPackageListMoreOptionsButtons();
            managePage.clickOverFlowMenuDeleteButton();
            managePage.clickDeletePopupConfirmButton();
            managePage.verifyPackageTypesValidationErrors().packageTypesDeletedSuccessfully();
        });
    });

});