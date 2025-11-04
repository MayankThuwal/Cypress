import { utils } from "@support/utils";
import { IPickUpLocationVM } from "cypress/models/location";
import { IUserVM, IPackageVM } from "@models/index";
import { messages} from "cypress/shared/core";
import { selector } from "cypress/shared/selector";

export class ManagePage {

    // region Manage - General

    clickAccountFeatureCard(){
        utils.getElement(selector.manageGeneral.accountFeatureCardLocator).click();
    };

    clickUsersFeatureCard(){
        utils.getElement(selector.manageGeneral.userFeatureCardLocator).click();
    };

    clickPickLocationFeatureCard(){
        utils.getElement(selector.manageGeneral.pickLocationFeatureCardLocator).click();
    };

    clickPackageTypesFeatureCard(){
        utils.getElement(selector.manageGeneral.packageTypesFeatureCardLocator).click();
    };

    // region Manage - Integrations

    clickIntegrationsTab(){
        utils.getElement(selector.manageIntegrations.integrationsTabLocator).click();
    }
    
    clickStoresFeatureCard(){
        utils.getElement(selector.manageIntegrations.clickStoresFeatureCardLocator).click();
    }

    // region Package Types

    clickAddPackageButton(){
        utils.getElement(selector.packageTypes.addPackageTypesButtonLocator).click();
    };

    clickSavePackageTypesButton(){
        utils.getElement(selector.packageTypes.savePackageTypesButtonLocator).click();
    };

    clickUpdatePackageTypesButton(){
        utils.getElement(selector.packageTypes.updatePackageTypesButtonLocator).click();
    };

    clickTypesDropdown(value?: string) {
        utils.getElement(selector.packageTypes.typeInputLocator).click();
        utils.clickDropdownOptionOrFirst(value);
    };

    clickPackageFirstRowInList(){
        utils.getElement(selector.packageTypes.firstPackageTypeInListLocator).click();
    };

    clickPackageListMoreOptionsButtons(){
        utils.getElement(selector.packageTypes.moreVertButtonLocator).click();
    };

    clickOverFlowMenuDeleteButton(){
        utils.getElement(selector.packageTypes.overFlowMenuDeleteButtonLocator).click();
    };

    clickDeletePopupConfirmButton() {
        utils.getElement(selector.popUp.confirmButtonLocator).click();
    }

    enterPackageDetails(packagetype: IPackageVM) {
        utils.generalInput(utils.getElement(selector.packageTypes.nameInputLocator).clear(), packagetype.name);
        this.clickTypesDropdown();
        utils.generalInput(utils.getElement(selector.packageTypes.lengthInputLocator).clear(), packagetype.length.toString());
        utils.generalInput(utils.getElement(selector.packageTypes.widthInputLocator).clear(), packagetype.width.toString());
        utils.generalInput(utils.getElement(selector.packageTypes.heightInputLocator).clear(), packagetype.height.toString());
        utils.generalInput(utils.getElement(selector.packageTypes.weightInputLocator).clear(), packagetype.weight.toString());
    };

    verifyPackageTypesValidationErrors() {
        return {
            packageTypesSavedSuccessfully: () => utils.verifyErrorMessage(utils.getElement(selector.packageTypes.notificationAlertLocator), messages.packageTypesSavedSuccessfully),
            packageTypesUpdatedSuccessfully: () => utils.verifyErrorMessage(utils.getElement(selector.packageTypes.notificationAlertLocator), messages.packageTypesUpdatedSuccessfully),
            packageTypesDeletedSuccessfully: () => utils.verifyErrorMessage(utils.getElement(selector.muiSelectors.snackBarMessage), messages.packageTypesDeletedSuccessfully),
        }
    }

    //region Pickup Location

    clickAddPickupLocationButton(){
        utils.getElement(selector.pickupLocation.addPickupLocationButtonLocator).click();
    }

    clickUpdatePickupLocationButton(){
        utils.getElement(selector.pickupLocation.updatePickupLocationButtonLocator).click();
    }

    clickSavePickupLocationButton(){
        utils.getElement(selector.pickupLocation.savePickupLocationButtonLocator).click();
    }

    clickAddLatLongButton() {
        utils.getElement(selector.pickupLocation.addLatLongButtonLocator).click();
    }

    clickSaveMapButton() {
        utils.getElement(selector.pickupLocation.saveMapButtonLocator).click();
    }

    clickPickupLocationFirstRowInList(){
        utils.getElement(selector.pickupLocation.firstPickupLocationInListLocator).click();
    }

    clickPickupLocationListMoreOptionsButtons(){
        utils.getElement(selector.pickupLocation.moreVertButtonLocator).click();
    };

    enterLocationDetails(location: IPickUpLocationVM) {
        utils.generalInput(utils.getElement(selector.pickupLocation.locationNameInputLocator).clear(), location.name);
        utils.generalInput(utils.getElement(selector.pickupLocation.firstNameInputLocator).clear(), location.address.firstName);
        utils.generalInput(utils.getElement(selector.pickupLocation.lastNameInputLocator).clear(), location.address.lastName);
        utils.generalInput(utils.getElement(selector.pickupLocation.mobileNumberInputLocator).clear(), location.address.phone);
        // Addind delay here as phone number gets verified
        cy.wait(2000);
        utils.generalInput(utils.getElement(selector.pickupLocation.emailInputLocator).clear(), location.address.email);
        utils.generalInput(utils.getElement(selector.pickupLocation.bussinessInputLocator).clear(), location.address.company);
        utils.generalInput(utils.getElement(selector.pickupLocation.address1InputLocator).clear(), location.address.street1);
        utils.generalInput(utils.getElement(selector.pickupLocation.address2InputLocator).clear(), location.address.street2);
        utils.generalInput(utils.getElement(selector.pickupLocation.landmarkInputLocator).clear(), location.address.street3);
        utils.generalInput(utils.getElement(selector.pickupLocation.pincodeInputLocator).clear(), location.address.zip);
        cy.wait(2000);
    }

    verifyPickupLocationValidationErrors() {
        return {
            pickupLocationSavedSuccessfully: () => utils.verifyErrorMessage(utils.getElement(selector.packageTypes.notificationAlertLocator), messages.pickupLocationSavedSuccessfully),
            pickupLocationUpdatedSuccessfully: () => utils.verifyErrorMessage(utils.getElement(selector.packageTypes.notificationAlertLocator), messages.pickupLocationUpdatedSuccessfully),
            pickupLocationDeletedSuccessfully: () => utils.verifyErrorMessage(utils.getElement(selector.muiSelectors.snackBarMessage), messages.pickupLocationDeletedSuccessfully),
        }
    }

    // region USERS
    clickAddUserButton(){
        utils.getElement(selector.users.addUserButtonLocator).click();
    }

    clickUpdateUserButton(){
        utils.getElement(selector.users.updateUserButtonLocator).click();
    }

    clickSaveUserButton(){
        utils.getElement(selector.users.saveUserButtonLocator).click();
    }

    clickUsersFirstRowInList(){
        utils.getElement(selector.users.firstUserInListLocator).click();
    }

    clickUserListMoreOptionsButtons(){
        utils.getElement(selector.users.moreVertButtonLocator).click();
    };

    clickRolesDropdown(value?: string) {
        utils.getElement(selector.users.roleInputLocator).click();
        utils.clickDropdownOptionOrFirst(value);
    };

    fillYopMailEmailInput(email: string) {
        utils.fillYopMailEmailInput(email);
    };

    clickCreatePasswordMailButton() {
        utils.clickMailPrimaryButton(selector.yopMailPage.emailHtmlLocator, selector.users.createPasswordMailButtonLocator);
    };

    fillNewPassword(password: string) {
        utils.getElement(selector.users.newPasswordInputLocator).clear().type(password);
    };

    fillConfirmPassword(password: string) {
        utils.getElement(selector.users.confirmPasswordInputLocator).clear().type(password);
    };

    clickCreatePassword() {
        utils.getElement(selector.users.createPasswordButtonLocator).click();
    };

    verifyStringInMail(selector: string, emailDataToMatch :string){
        utils.verifyStringInMail(selector, emailDataToMatch);
    }

    enterUserDetails(user: IUserVM){
        utils.generalInput(utils.getElement(selector.users.firstNameInputLocator).clear(), user.firstName);
        utils.generalInput(utils.getElement(selector.users.lastNameInputLocator).clear(), user.lastName);
        this.clickRolesDropdown();
        utils.generalInput(utils.getElement(selector.users.mobileNumberInputLocator).clear(), user.mobile);
        utils.generalInput(utils.getElement(selector.users.emailInputLocator).clear(), user.email);
    }

    verifyUserValidationErrors() {
        return {
            userSavedSuccessfully: () => utils.verifyErrorMessage(utils.getElement(selector.users.notificationAlertLocator), messages.userSavedSuccessfully),
            userUpdatedSuccessfully: () => utils.verifyErrorMessage(utils.getElement(selector.users.notificationAlertLocator), messages.userUpdatedSuccessfully),
            userDeletedSuccessfully: () => utils.verifyErrorMessage(utils.getElement(selector.muiSelectors.snackBarMessage), messages.userDeletedSuccessfully),
            incorrectCredentials: () => utils.verifyErrorMessage(utils.getElement(selector.loginPage.notificationAlertLocator), messages.incorrectCredentials)

        }
    }

    // region Stores

    clickAddStoreButton(){
        utils.getElement(selector.stores.addStoreButtonLocator).click();
    }

    clickManualStoreTypeButton(){
        utils.getElement(selector.stores.manualStoreTypeButtonLocator).click();
    }

    clickStoresStepperSaveAndContinueButton(){
        utils.getElement(selector.stores.saveStoreButtonLocator).click();
    }

    clickUpdateStoreButton(){
        utils.getElement(selector.stores.updateStoreButtonLocator).click();
    }

    clickStoresFirstRowInList(){
        utils.getElement(selector.stores.firstStoreInListLocator).click();
    }

    clickStoresListMoreOptionsButtons(){
        utils.getElement(selector.stores.moreVertButtonLocator).click();
    }

    enterManualStoreDetails(store: any){
        utils.generalInput(utils.getElement(selector.stores.storNameInputLocator).clear(), store.name);
        this.clickStoresStepperSaveAndContinueButton();
        this.clickStoresStepperSaveAndContinueButton();
    }

    verifyStoreValidationErrors() {
        return {
            storeSavedSuccessfully: () => utils.verifyErrorMessage(utils.getElement(selector.stores.notificationAlertLocator), messages.storeCreatedSuccessfully),
            storeUpdatedSuccessfully: () => utils.verifyErrorMessage(utils.getElement(selector.stores.notificationAlertLocator), messages.storeUpdatedSuccessfully),
            storeDeletedSuccessfully: () => utils.verifyErrorMessage(utils.getElement(selector.muiSelectors.snackBarMessage), messages.storeDeletedSuccessfully),
        }
    }
    
}

export const managePage = new ManagePage();