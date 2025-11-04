import { authPage } from "@pages/index";
import { fixture, appConstant, routes, cyAssertion } from "cypress/shared/core";
import { utils } from "@support/utils";
import { IUserVM } from "@models/index";

describe('Register account page', () => {
    let formData: {
        validSignUpUser: IUserVM;
        invalidSignUpUser: IUserVM;
        existingSignUpUser: IUserVM;
    };

    before(() => {
        cy.fixture(fixture.authenticationJSON).then((data) => {
            formData = data;
            // Generate a new custom email for the valid user
            formData.validSignUpUser.email = utils.generateCustomEmail();
            // Convert email to business name;
            formData.validSignUpUser.businessName = utils.generateCustomEmail().replace(appConstant.yopmail, appConstant.space);
        });
    });

    beforeEach(() => {
        cy.visitECS();
        authPage.clickRegisterNow();
    });

    describe('UI Elements', () => {
        it('Should display all elements correctly', () => {
            authPage.verifySignUpPageElements();
            authPage.verifyLogo();
            authPage.verifySignUpImage();
        });
    });

    describe('Form Validation', () => {
        it('Should show validation errors for required fields', () => {
            authPage.clickRegisterAccount();
            authPage.verifySignUpValidationErrors().emailRequired();
            authPage.verifySignUpValidationErrors().passwordRequired();
            authPage.verifySignUpValidationErrors().firstNameRequired();
            authPage.verifySignUpValidationErrors().lastNameRequired();
            authPage.verifySignUpValidationErrors().bussinessNameRequired();
            authPage.verifySignUpValidationErrors().mobileRequired();
        });

        it('Should show validation errors with invalid data', () => {
            authPage.fillSignUpForm(formData.invalidSignUpUser)
            authPage.acceptTerms()
            authPage.clickRegisterAccount();
            authPage.verifySignUpValidationErrors().invalidFirstName();
            authPage.verifySignUpValidationErrors().invalidLastName();
            authPage.verifySignUpValidationErrors().invalidBussinessName();
            authPage.verifySignUpValidationErrors().invalidEmail();
            authPage.verifySignUpValidationErrors().invalidPassword();
        });

        it('Should show error when input email user already exist', () => {
            authPage.fillSignUpForm(formData.existingSignUpUser);
            authPage.acceptTerms();
            authPage.clickRegisterAccount();
            authPage.verifySignUpValidationErrors().userAlreadyExist();
        });

        it('Should show error when terms and agreements are not checked', () => {
            authPage.fillSignUpForm(formData.validSignUpUser);
            authPage.clickRegisterAccount();
            authPage.verifySignUpValidationErrors().acceptTermsAndAgreement();
        });
    });

    describe('Successful sign up', () => {
        it('Should sign up successfully and the login', () => {
            authPage.fillSignUpForm(formData.validSignUpUser);
            authPage.acceptTerms();
            authPage.clickRegisterAccount();
            cy.wait(5000); // Wait for the sign-up process to complete
            authPage.verifySignUpValidationErrors().successfullSignUp();
            authPage.verifySignUpSuccessPageElements(formData.validSignUpUser.email, formData.validSignUpUser.businessName);
            authPage.clickLogin();
            cy.login(formData.validSignUpUser.email, formData.validSignUpUser.password);
            cy.url().should(cyAssertion.include, routes.onboarding);
        });     
    });

});