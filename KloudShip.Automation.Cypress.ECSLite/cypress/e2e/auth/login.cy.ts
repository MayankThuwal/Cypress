import { ENV } from '@config/config.service';
import { authPage } from '@pages/index';
import { appConstant, cyAssertion, fixture, routes} from 'cypress/shared/core';
import { IUserVM } from "@models/index";

describe('Login Page', () => {

    let formData: {
        invalidLoginUser: IUserVM;
    };

    before(() => {
        cy.fixture(fixture.authenticationJSON).then((data) => {
            formData = data;
        });
    });

    beforeEach(() => {
        cy.visitECS();
    });

    describe('UI Elements', () => {
        it('Should display all elements correctly', () => {
            authPage.verifyLoginPageElements();
            authPage.verifyLoginLogo();
            authPage.verifyLoginImage();
        });
    });

    describe('Form Validation', () => {
        it('Should show validation errors for required fields', () => {
            cy.login();
            authPage.verifyLoginValidationErrors().emailRequired();
            authPage.verifyLoginValidationErrors().passwordRequired();
        });

        it('Should show error for invalid email format', () => {
            cy.login(appConstant.invalidFormatEmailId, formData.invalidLoginUser.password);
            authPage.verifyLoginValidationErrors().invalidEmail();
        });

        it('Should show error for incorrect credentails', () => {
            cy.login(formData.invalidLoginUser.email, formData.invalidLoginUser.password);
            authPage.verifyLoginValidationErrors().incorrectCredentials();
        });
    });

    describe('Successful login', () => {
        it('Should login successfully with valid credentials', () => {
            cy.login(ENV.application.credentials.email, ENV.application.credentials.password);
            cy.url().should(cyAssertion.include, routes.home);
        });
    });

});