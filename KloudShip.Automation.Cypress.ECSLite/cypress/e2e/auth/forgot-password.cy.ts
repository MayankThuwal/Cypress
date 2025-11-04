import { ENV } from "@config/config.service";
import { authPage } from "@pages/index";
import { appConstant, fixture, url } from "cypress/shared/core";
import { IUserVM } from "@models/index";

describe('Forgot password page', () => {

    let formData: {
        invalidLoginUser: IUserVM;
        validSignUpUser: IUserVM;
    };

    before(() => {
        cy.fixture(fixture.authenticationJSON).then((data) => {
            formData = data;
        });
    });

    beforeEach(() => {
        cy.visitECS();
        authPage.clickForgotPassword();
    });

    describe('UI Elements', () => {
        it('Should display all elements correctly', () => {
            authPage.verifyForgotPasswordPageElements();
            authPage.verifyLogo();
            authPage.verifyForgotPasswordImage();
        });
    });

    describe('Form Validation', () => {
        it('Should show validation errors for required fields', () => {
            authPage.clickSendEmail();
            authPage.verifyValidationErrors().emailRequired();
        });

        it('Should show error for invalid email format', () => {
            authPage.fillForgotPasswordForm(appConstant.invalidFormatEmailId);
            authPage.clickSendEmail();
            authPage.verifyValidationErrors().invalidEmail();
        });

        it('Should show error for incorrect credentails', () => {
            authPage.fillForgotPasswordForm(formData.invalidLoginUser.email);
            authPage.clickSendEmail();
            authPage.verifyValidationErrors().userNotFound();
        });

    });

    describe('Successful password reset mail', () => {
        it('Should send reset password email successfully with valid email', () => {
            authPage.fillForgotPasswordForm(ENV.application.credentials.forgotPasswordEmail);
            authPage.clickSendEmail();
            authPage.verifyValidationErrors().resetPasswordEmailSent();
            authPage.verifyResetPasswordEmailSentPageElements(ENV.application.credentials.forgotPasswordEmail);
        });
    });

    describe('Reset password page', () => {
        it('Should navigate back to email portal and open resert passwrd mail', () => {
            cy.visitExternal(url.yopmailURL);
            authPage.fillYopMailEmailInput(ENV.application.credentials.forgotPasswordEmail);
            authPage.clickResetPasswordMailButton();
            authPage.verifyResetPasswordPageElements();
        });
    });

    describe('Reset password page elements and form validation', () => {

        it('Should show validation errors for required fields', () => {
            authPage.fillForgotPasswordForm(ENV.application.credentials.forgotPasswordEmail);
            authPage.clickSendEmail();
            cy.wait(4000);
            cy.visitExternal(url.yopmailURL);
            authPage.fillYopMailEmailInput(ENV.application.credentials.forgotPasswordEmail);
            authPage.clickResetPasswordMailButton();
            authPage.clickResetPassword();
            authPage.verifyValidationErrors().newPasswordRequired();
            authPage.verifyValidationErrors().confirmPasswordRequired();
        });

        it('Should show error for password and confirm password mismatch', () => {
            authPage.fillForgotPasswordForm(ENV.application.credentials.forgotPasswordEmail);
            authPage.clickSendEmail();
            cy.wait(4000);
            cy.visitExternal(url.yopmailURL);
            authPage.fillYopMailEmailInput(ENV.application.credentials.forgotPasswordEmail);
            authPage.clickResetPasswordMailButton();
            authPage.fillNewPassword(formData.validSignUpUser.password);
            authPage.fillConfirmPassword(formData.invalidLoginUser.password);
            authPage.clickResetPassword();
            authPage.verifyValidationErrors().passwordMismatchError();
        });
    });

    describe('Successful password reset', () => {
        it('Should reset password successfully with valid credentials', () => {
            authPage.fillForgotPasswordForm(ENV.application.credentials.forgotPasswordEmail);
            authPage.clickSendEmail();
            cy.wait(4000);
            cy.visitExternal(url.yopmailURL);
            authPage.fillYopMailEmailInput(ENV.application.credentials.forgotPasswordEmail);
            authPage.clickResetPasswordMailButton();
            authPage.fillNewPassword(formData.validSignUpUser.password);
            authPage.fillConfirmPassword(formData.validSignUpUser.password);
            authPage.clickResetPassword();
            cy.visitECS();
            cy.login(ENV.application.credentials.forgotPasswordEmail, formData.validSignUpUser.password);
        });

    });

});