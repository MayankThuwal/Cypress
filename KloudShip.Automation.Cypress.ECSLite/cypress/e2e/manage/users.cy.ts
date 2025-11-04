import { ENV } from "@config/config.service";
import { managePage } from "@pages/index";
import { utils } from "@support/utils";
import { IUserVM } from "@models/index";
import { fixture, cyAssertion, infoText, routes, url } from "cypress/shared/core";
import { selector } from "cypress/shared/selector";

describe('Users page', () => {

    let formData: {
        validUser: IUserVM,
    }

    before(() => {
        cy.fixture(fixture.manageJSON).then((data) => {
            formData = data
            formData.validUser.email = utils.generateCustomEmail();
        })
    })

    beforeEach(() => {
        cy.visitECS();
        cy.login(ENV.application.credentials.email, ENV.application.credentials.password);
        cy.hamburgerMenuNavigation(selector.sideNav.manageNavigation);
        cy.url().should(cyAssertion.include, routes.manage);
        managePage.clickUsersFeatureCard();
        cy.url().should(cyAssertion.include, routes.users);
    })

    describe('Users CRUD operations', () => {
        it('Should successfully create a new user', () => {
            managePage.clickAddUserButton();
            managePage.enterUserDetails(formData.validUser);
            managePage.clickSaveUserButton();
            managePage.verifyUserValidationErrors().userSavedSuccessfully();
            cy.wait(4000);
            cy.visitExternal(url.yopmailURL);
            managePage.fillYopMailEmailInput(formData.validUser.email);
            managePage.clickCreatePasswordMailButton();
            managePage.fillNewPassword(formData.validUser.password);
            managePage.fillConfirmPassword(formData.validUser.password);
            managePage.clickCreatePassword();
            cy.visitECS();
            cy.logout();
            cy.login(formData.validUser.email, formData.validUser.password);
        });

        it('Should successfully delete a user', () => {
            managePage.clickUserListMoreOptionsButtons();
            managePage.clickOverFlowMenuDeleteButton();
            managePage.clickDeletePopupConfirmButton();
            managePage.verifyUserValidationErrors().userDeletedSuccessfully();
            cy.wait(4000);
            cy.visitExternal(url.yopmailURL);
            managePage.fillYopMailEmailInput(formData.validUser.email);
            cy.wait(4000);
            managePage.verifyStringInMail(selector.yopMailPage.emailHtmlLocator, infoText.userDeletedMailContent);
            managePage.verifyStringInMail(selector.yopMailPage.emailHtmlLocator, formData.validUser.email);
            cy.visitECS();
            cy.logout();
            cy.login(formData.validUser.email, formData.validUser.password);
            managePage.verifyUserValidationErrors().incorrectCredentials();
        });
    });

})