import { ENV } from "@config/config.service";
import { shipmentPage } from "@pages/index";
import { cyAssertion, routes} from "cypress/shared/core";
import { selector } from "cypress/shared/selector";

describe('Shipment list page', () => {

    beforeEach(() => {
        cy.visitECS();
        cy.login(ENV.application.credentials.email, ENV.application.credentials.password);
        cy.hamburgerMenuNavigation(selector.sideNav.shipmentNavigation);
        cy.url().should(cyAssertion.include, routes.shipment);
    });

    describe('UI Elements', () => {
        it('Should display all elements correctly', () => {
            shipmentPage.verifyShipmentListPageElements();
        });
    });

})