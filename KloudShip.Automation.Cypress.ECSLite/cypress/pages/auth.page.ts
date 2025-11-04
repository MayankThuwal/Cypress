import { label, messages, infoText, url, cyAssertion } from "cypress/shared/core";
import { selector } from "cypress/shared/selector";
import { utils } from "@support/utils";
import { IUserVM } from "@models/index";

export class AuthPage {

    // region FORGOT PASSWORD PAGE

    clickForgotPassword() {
        utils.getElement(selector.loginPage.forgotPasswordLocator).click();
    };

    verifyLogo() {
        utils.verifyImageURL(url.kloudshipLogo, utils.getElement(selector.forgotPasswordPage.logoLocator));
    };

    verifyForgotPasswordImage() {
        utils.verifyImageURL(url.forgotPasswordImage, utils.getElement(selector.forgotPasswordPage.forgotPasswordImageLocator));
    };

    clickSendEmail() {
        utils.getElement(selector.forgotPasswordPage.sendEmailButtonLocator).click();
    };

    fillForgotPasswordForm(email: string) {
        utils.getElement(selector.forgotPasswordPage.emailInputLocator).clear().type(email);
    };

    clickResetPassword() {
        utils.getElement(selector.forgotPasswordPage.resetPasswordButtonLocator).click();
    };

    fillYopMailEmailInput(email: string) {
        utils.fillYopMailEmailInput(email);
    };

    clickResetPasswordMailButton() {
        utils.clickMailPrimaryButton(selector.yopMailPage.emailHtmlLocator, selector.forgotPasswordPage.resetPasswordMailButtonLocator)
    };

    fillNewPassword(password: string) {
        utils.getElement(selector.forgotPasswordPage.newPasswordInputLocator).clear().type(password);
    };

    fillConfirmPassword(password: string) {
        utils.getElement(selector.forgotPasswordPage.confirmPasswordInputLocator).clear().type(password);
    };

    verifyForgotPasswordPageElements() {
        utils.getElement(selector.forgotPasswordPage.logoLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.forgotPasswordPage.forgotPasswordImageLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.forgotPasswordPage.forgotPasswordHeaderLocator).should(cyAssertion.contains, label.forgotPassword);
        utils.invokeInnerText(selector.forgotPasswordPage.enterEmailTextLocator, infoText.enterYourEmailToResetPassword);
        utils.getElement(selector.forgotPasswordPage.emailTitleLocator).should(cyAssertion.contains, label.email);
        utils.getElement(selector.forgotPasswordPage.emailInputLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.forgotPasswordPage.sendEmailButtonLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.sendEmail);
        utils.getElement(selector.forgotPasswordPage.backToLoginLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.backToLogin);
    };

    verifyResetPasswordEmailSentPageElements(email: string) {
        utils.getElement(selector.forgotPasswordPage.logoLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.forgotPasswordPage.forgotPasswordHeaderLocator).should(cyAssertion.contains, label.forgotPassword);
        utils.invokeInnerText(selector.forgotPasswordPage.resetPasswordEmailSentTextLocator, infoText.resetPasswordEmailSentText);
        utils.invokeInnerText(selector.forgotPasswordPage.resetPasswordInstructionsLocator, infoText.resetPasswordInstructions);
        utils.invokeInnerText(selector.forgotPasswordPage.resetPasswordEmailLocator, email);
        utils.getElement(selector.forgotPasswordPage.backToLoginLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.backToLogin);
    };

    verifyResetPasswordPageElements() {
        utils.getElement(selector.forgotPasswordPage.resetPasswordLogoLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.forgotPasswordPage.resetPasswordImageLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.forgotPasswordPage.resetPasswordHeaderLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.resetPassword);
        utils.getElement(selector.forgotPasswordPage.newPasswordTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.newPassword);
        utils.getElement(selector.forgotPasswordPage.newPasswordInputLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.forgotPasswordPage.confirmPasswordTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.confirmPassword);
        utils.getElement(selector.forgotPasswordPage.confirmPasswordInputLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.forgotPasswordPage.resetPasswordButtonLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.resetPassword);
    };

    verifyValidationErrors() {
        return {
            emailRequired: () => utils.verifyErrorMessage(utils.getElement(selector.forgotPasswordPage.emailErrorLocator), messages.emailRequired),
            invalidEmail: () => utils.verifyErrorMessage(utils.getElement(selector.forgotPasswordPage.emailErrorLocator), messages.invalidCredentials),
            userNotFound: () => utils.verifyErrorMessage(utils.getElement(selector.forgotPasswordPage.notificationAlertLocator), messages.userNotFound),
            resetPasswordEmailSent: () => utils.verifyErrorMessage(utils.getElement(selector.forgotPasswordPage.notificationAlertLocator), infoText.resetPasswordEmailSent),
            newPasswordRequired: () => utils.verifyErrorMessage(utils.getElement(selector.forgotPasswordPage.newPasswordRequiredErrorLocator), messages.passwordRequired),
            confirmPasswordRequired: () => utils.verifyErrorMessage(utils.getElement(selector.forgotPasswordPage.confirmPasswordRequiredErrorLocator), messages.confirmPasswordRequired),
            passwordMismatchError: () => utils.verifyErrorMessage(utils.getElement(selector.forgotPasswordPage.passwordMismatchErrorLocator), messages.passwordMismatchError)
        };
    };

    // region LOGIN PAGE

    verifyLoginLogo() {
        utils.verifyImageURL(url.kloudshipLogo, utils.getElement(selector.loginPage.logoLocator));
    };

    verifyLoginImage() {
        utils.verifyImageURL(url.loginImage, utils.getElement(selector.loginPage.loginImageLocator));
    };

    verifyLoginPageElements() {
        utils.getElement(selector.loginPage.logoLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.loginPage.loginImageLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.loginPage.loginHeaderLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.login);
        utils.getElement(selector.loginPage.emailTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.email);
        utils.getElement(selector.loginPage.passwordTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.password);
        utils.getElement(selector.loginPage.emailInputLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.loginPage.passwordInputLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.loginPage.loginButtonLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.login);
        utils.getElement(selector.loginPage.forgotPasswordLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.forgotPasswordQuestionMark);
        utils.getElement(selector.loginPage.registerLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.register);
    };

    verifyLoginValidationErrors() {
        return {
            emailRequired: () => utils.verifyErrorMessage(utils.getElement(selector.loginPage.emailErrorLocator), messages.emailRequired),
            passwordRequired: () => utils.verifyErrorMessage(utils.getElement(selector.loginPage.passwordErrorLocator), messages.passwordRequired),
            invalidEmail: () => utils.verifyErrorMessage(utils.getElement(selector.loginPage.emailErrorLocator), messages.invalidCredentials),
            incorrectCredentials: () => utils.verifyErrorMessage(utils.getElement(selector.loginPage.notificationAlertLocator), messages.incorrectCredentials)
        };
    };

    //region SIGNUP PAGE

    verifySignUpLogo() {
        utils.verifyImageURL(url.kloudshipLogo, utils.getElement(selector.signupPage.logoLocator));
    };

    verifySignUpImage() {
        return utils.verifyImageURL(url.signUpImage, utils.getElement(selector.signupPage.signUpImageLocator));
    };

    clickRegisterNow() {
        utils.submit(utils.getElement(selector.signupPage.registerLocator));
    };

    clickRegisterAccount() {
        utils.submit(utils.getElement(selector.signupPage.registerAccountButtonLocator));
    };

    clickLogin() {
        utils.submit(utils.getElement(selector.signupPage.signUpSucessLoginLocator));
    };

    verifySignUpPageElements() {
        utils.getElement(selector.signupPage.logoLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.signupPage.signUpImageLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.signupPage.registerAccountHeaderLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.registerAccount);
        utils.getElement(selector.signupPage.firstNameTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.firstName);
        utils.getElement(selector.signupPage.firstNameInputLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.signupPage.lastNameTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.lastName);
        utils.getElement(selector.signupPage.lastNameInputLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.signupPage.bussinessTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.bussinessName);
        utils.getElement(selector.signupPage.bussinessNameInputLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.signupPage.mobileTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.mobile);
        utils.getElement(selector.signupPage.mobileInputLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.signupPage.emailTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.email);
        utils.getElement(selector.signupPage.emailInputLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.signupPage.passwordTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.password);
        utils.getElement(selector.signupPage.passwordInputLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.signupPage.acceptTermsAndAgreementsLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.acceptTermsAndAgreements)
        utils.getElement(selector.signupPage.checkBoxLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.signupPage.registerAccountButtonLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.registerAccount);
        utils.getElement(selector.signupPage.loginButtonLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.login);
    };

    verifySignUpSuccessPageElements(email: string, businessName: string) {
        utils.getElement(selector.signupPage.logoLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.signupPage.registerAccountHeaderLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.registerAccount);
        utils.invokeInnerText(selector.signupPage.accountCreatedTextLocator, messages.accountCreatedText);
        utils.invokeInnerText(selector.signupPage.signUpBusinessNameLocator, businessName);
        utils.invokeInnerText(selector.signupPage.proceedToLoginTextLocator, messages.proceedToLoginText);
        utils.invokeInnerText(selector.signupPage.signUpEmailLocator, email);
        utils.getElement(selector.signupPage.signUpSucessLoginLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.login);
    };

    verifySignUpValidationErrors() {
        return {
            emailRequired: () => utils.verifyErrorMessage(utils.getElement(selector.signupPage.emailErrorLocator), messages.emailRequired),
            passwordRequired: () => utils.verifyErrorMessage(utils.getElement(selector.signupPage.passwordErrorLocator), messages.passwordRequired),
            invalidEmail: () => utils.verifyErrorMessage(utils.getElement(selector.signupPage.emailErrorLocator), messages.invalidCredentials),
            firstNameRequired: () => utils.verifyErrorMessage(utils.getElement(selector.signupPage.firstNameErrorLocator), messages.firstNameRequired),
            lastNameRequired: () => utils.verifyErrorMessage(utils.getElement(selector.signupPage.lastNameErrorLocator), messages.lastNameRequired),
            bussinessNameRequired: () => utils.verifyErrorMessage(utils.getElement(selector.signupPage.bussinessNameErrorLocator), messages.bussinessNameRequired),
            mobileRequired: () => utils.verifyErrorMessage(utils.getElement(selector.signupPage.mobileErrorLocator), messages.mobileRequired),
            invalidPassword: () => utils.verifyErrorMessage(utils.getElement(selector.signupPage.passwordErrorLocator), messages.invalidPassword),
            invalidFirstName: () => utils.verifyErrorMessage(utils.getElement(selector.signupPage.firstNameErrorLocator), messages.invalidFirstName),
            invalidLastName: () => utils.verifyErrorMessage(utils.getElement(selector.signupPage.lastNameErrorLocator), messages.invalidLastName),
            invalidBussinessName: () => utils.verifyErrorMessage(utils.getElement(selector.signupPage.bussinessNameErrorLocator), messages.invalidBussinessName),
            invalidMobile: () => utils.verifyErrorMessage(utils.getElement(selector.signupPage.mobileErrorLocator), messages.invalidMobile),
            acceptTermsAndAgreement: () => utils.verifyErrorMessage(utils.getElement(selector.signupPage.notificationAlertLocator), messages.acceptTermsAndAgreements),
            userAlreadyExist: () => utils.verifyErrorMessage(utils.getElement(selector.signupPage.notificationAlertLocator), messages.accountAlreadyExist),
            successfullSignUp: () => utils.verifyErrorMessage(utils.getElement(selector.signupPage.notificationAlertLocator), messages.successfullSignUp),
        };
    };

    acceptTerms() {
        // Add a random click before the checkbox to ensure that it is on correct postion after change in UI due to error message
        utils.getElement(selector.signupPage.signUpImageLocator).click();
        utils.getElement(selector.signupPage.checkBoxLocator).click();
    };

    fillSignUpForm(userData: IUserVM) {
        utils.generalInput(utils.getElement(selector.signupPage.firstNameInputLocator), userData.firstName);
        utils.generalInput(utils.getElement(selector.signupPage.lastNameInputLocator), userData.lastName);
        utils.generalInput(utils.getElement(selector.signupPage.bussinessNameInputLocator), userData.businessName);
        utils.generalInput(utils.getElement(selector.signupPage.mobileInputLocator), userData.mobile);
        utils.generalInput(utils.getElement(selector.signupPage.emailInputLocator), userData.email);
        utils.generalInput(utils.getElement(selector.signupPage.passwordInputLocator), userData.password);
    };

}

export const authPage = new AuthPage();