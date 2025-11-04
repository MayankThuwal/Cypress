import { ENV } from "@config/config.service";
import { orderPage } from "@pages/index";
import { cyAssertion, routes} from "cypress/shared/core";
import { selector } from "cypress/shared/selector";

describe('Order list page', () => {

    beforeEach(() => {
        cy.visitECS();
        cy.login(ENV.application.credentials.email, ENV.application.credentials.password);
        cy.hamburgerMenuNavigation(selector.sideNav.orderNavigation);
        cy.url().should(cyAssertion.include, routes.order);
    });

    describe('UI Elements', () => {
        it('Should display all elements correctly', () => {
            orderPage.verifyOrderListPageElements();
        });
    });

})