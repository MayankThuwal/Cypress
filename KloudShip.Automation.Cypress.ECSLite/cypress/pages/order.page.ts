import { label, messages, infoText, cyAssertion, fixture} from "cypress/shared/core";
import { selector } from "cypress/shared/selector";
import { utils } from "@support/utils";
import { IBaseAddressVM, IFulfillmentItemVM, IPackageVM, IShipmentDocVM } from "@models/index";

export class OrderPage {

    //region LIST

    clickAddOrderButton() {
        utils.getElement(selector.orderList.addOrderButtonLocator).click();
    }

    clickImportOrderButton() {
        utils.getElement(selector.orderList.importButtonLocator).click();
    }

    clickFirstOrderInList(){
        utils.getElement(selector.orderList.firstOrderInListLocator).click();
    }

    verifyOrderListPageElements() {
        utils.getElement(selector.orderList.titleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.orders);
        utils.getElement(selector.orderList.allOrdersTabLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.allOrders);
        utils.getElement(selector.orderList.searchFilterLocator).should(cyAssertion.beVisible).and(cyAssertion.haveAttribute, cyAssertion.placeholder, infoText.orderSearch);
        utils.getElement(selector.orderList.storeFilterLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.store);
        utils.getElement(selector.orderList.orderTypeFilterLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.paymentType);
        utils.getElement(selector.orderList.dateFilterLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.date);
        utils.getElement(selector.orderList.sortFilterLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.sort);
        utils.getElement(selector.orderList.idColumnLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.id);
        utils.getElement(selector.orderList.customerNameColumnLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.customerName);
        utils.getElement(selector.orderList.storeColumnLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.store);
        utils.getElement(selector.orderList.orderNumberColumnLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.orderNumber);
        utils.getElement(selector.orderList.orderItemColumnLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.orderItem);
        utils.getElement(selector.orderList.orderValueColumnLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.orderValue);
        utils.getElement(selector.orderList.orderTypeColumnLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.paymentType);
        utils.getElement(selector.orderList.orderStatusColumnLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.orderStatus);
        utils.getElement(selector.orderList.shipmentStatusColumnLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.shipmentStatus);
        utils.getElement(selector.orderList.dateColumnLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.date);
    }

    // region GENERAL

    clickStoreDropdown(value?: string) {
        utils.getElement(selector.orderGeneralStepper.storeDropdownLocator).click();
        utils.clickDropdownOptionOrFirst(value);
    }

    clickPaymentTypeDropdown(value?: string) {
        utils.getElement(selector.orderGeneralStepper.paymentTypeDrowdownLocator).click();
        utils.clickDropdownOptionOrFirst(value);
    }

    inputOrderNumber() {
        utils.generalInput(utils.getElement(selector.orderGeneralStepper.orderNumberInputLocator), utils.generateRandomOrderNumber());
    }

    clickSaveAndContinueButton() {
        utils.getElement(selector.orderGeneralStepper.saveAndContinueButtonLocator).click();
    }

    verifyOrderGeneralStepperPageElements() {
        utils.getElement(selector.orderList.titleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.orders);
        utils.getElement(selector.orderList.allOrdersTabLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.allOrders);
        utils.getElement(selector.orderGeneralStepper.headerLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, infoText.orderGeneralStepperHeader);
        utils.getElement(selector.orderGeneralStepper.saveAndContinueButtonLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.saveAndContinue);
        utils.getElement(selector.orderGeneralStepper.imageSelectorLocator).should(cyAssertion.beVisible);
        utils.invokeInnerText(selector.orderGeneralStepper.infoCard1Text1Locator, infoText.orderGeneralInfoCard1Text1);
        utils.invokeInnerText(selector.orderGeneralStepper.infoCard1Text2Locator, infoText.orderGeneralInfoCard1Text2);
        utils.getElement(selector.orderGeneralStepper.storeTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.store);
        utils.getElement(selector.orderGeneralStepper.storeDropdownLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.orderGeneralStepper.paymentTypeTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.paymentType);
        utils.getElement(selector.orderGeneralStepper.paymentTypeDrowdownLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.orderGeneralStepper.orderNumberTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.orderNumber);
        utils.getElement(selector.orderGeneralStepper.orderNumberInputLocator).should(cyAssertion.beVisible);
    }

    // region Item(s)

    clickItemsSaveAndContinueButton() {
        utils.getElement(selector.orderItemStepper.saveAndContinueButtonLocator).click();
    }

    addItem(item: IFulfillmentItemVM) {
        utils.generalInput(utils.getElement(selector.orderItemStepper.nameInputLocator), item.name);
        utils.generalInput(utils.getElement(selector.orderItemStepper.weightInputLocator), item.weight.toString());
        utils.generalInput(utils.getElement(selector.orderItemStepper.priceInputLocator), item.totalValue.toString());
        this.clickAddItemButton();
    }

    clickAddItemButton() {
        utils.getElement(selector.orderItemStepper.addItemButtonLocator).click();
    }

    verifyOrderItemStepperPageElements() {
        utils.getElement(selector.orderList.titleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.orders);
        utils.getElement(selector.orderList.allOrdersTabLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.allOrders);
        utils.getElement(selector.orderGeneralStepper.headerLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, infoText.orderGeneralStepperHeader);
        utils.getElement(selector.orderItemStepper.saveAndContinueButtonLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.saveAndContinue);
        utils.getElement(selector.orderItemStepper.backButtonLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.back);
        utils.getElement(selector.orderItemStepper.shipmentItemsCardTittleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.shipmentItems);
        utils.getElement(selector.orderItemStepper.nameInputTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.name);
        utils.getElement(selector.orderItemStepper.nameInputLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.orderItemStepper.weightInputTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.weigth);
        utils.getElement(selector.orderItemStepper.weightInputLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.orderItemStepper.priceInputTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.price);
        utils.getElement(selector.orderItemStepper.priceInputLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.orderItemStepper.quantityInputTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.qty);
        utils.getElement(selector.orderItemStepper.quantityInputLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.orderItemStepper.addItemButtonLocator).should(cyAssertion.beVisible);
    }

    verifyOrderItemStepperValidationErrors() {
        return {
            nameRequired: () => utils.verifyErrorMessage(utils.getElement(selector.orderItemStepper.nameInputErrorLocator), messages.nameIsRequired),
            weightGreaterThan: () => utils.verifyErrorMessage(utils.getElement(selector.orderItemStepper.weightInputErrorLocator), messages.weightGreaterThan),
            priceGreaterThan: () => utils.verifyErrorMessage(utils.getElement(selector.orderItemStepper.priceInputErrorLocator), messages.priceGreaterThan),
            invalidShipmentItems: () => utils.verifyErrorMessage(utils.getElement(selector.orderItemStepper.notificationAlertLocator), messages.invalidShipmentItems),
            minTwoCharacter: () => utils.verifyErrorMessage(utils.getElement(selector.orderItemStepper.nameInputErrorLocator), messages.minTwoCharacter),
            maxFourItem: () => utils.verifyErrorMessage(utils.getElement(selector.orderItemStepper.notificationAlertLocator), messages.maxFourItem),
        }
    }

    // region Address
    clickAddressSaveAndContinueButton() {
        utils.getElement(selector.orderAddressStepper.saveAndContinueButtonLocator).click();
    }

    clickSaveOrderButton() {
        utils.getElement(selector.orderAddressStepper.saveOrderButtonLocator).click();
    }

    clickEditAdditionalAddressButton() {
        utils.getElement(selector.orderAddressStepper.editAdditionalAddressLocator).click();
    }

    clickAddLatLongButton() {
        utils.getElement(selector.orderAddressStepper.addLatLongButtonLocator).click();
    }

    clickSaveMapButton() {
        utils.getElement(selector.orderAddressStepper.saveMapButtonLocator).click();
    }

    selectPickupLocationDropdown() {
        utils.getElement(selector.orderAddressStepper.pickUpLocationDropdownLocator).click();
        utils.clickDropdownOptionOrFirst();
    }

    enterRecipientAddress(address: IBaseAddressVM) {
        utils.generalInput(utils.getElement(selector.orderAddressStepper.firstNameInputLocator), address.firstName);
        utils.generalInput(utils.getElement(selector.orderAddressStepper.lastNameInputLocator), address.lastName);
        utils.generalInput(utils.getElement(selector.orderAddressStepper.mobileNumberInputLocator), address.phone);
        utils.generalInput(utils.getElement(selector.orderAddressStepper.emailInputLocator), address.email);
        utils.generalInput(utils.getElement(selector.orderAddressStepper.bussinessInputLocator), address.company);
        utils.generalInput(utils.getElement(selector.orderAddressStepper.address1InputLocator), address.street1);
        utils.generalInput(utils.getElement(selector.orderAddressStepper.address2InputLocator), address.street2);
        utils.generalInput(utils.getElement(selector.orderAddressStepper.landmarkInputLocator), address.street3);
        utils.generalInput(utils.getElement(selector.orderAddressStepper.pincodeInputLocator), address.zip);
        // Adding Random click and wait of four sec to get city and state autocomplete
        utils.getElement(selector.orderAddressStepper.pincodeInputTitleLocator).click();
        cy.wait(2000);
    }

    verifyOrderAddressStepperPageElements() {
        utils.getElement(selector.orderList.titleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.orders);
        utils.getElement(selector.orderList.allOrdersTabLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.allOrders);
        utils.getElement(selector.orderGeneralStepper.headerLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, infoText.orderAddressStepperHeader);
        utils.getElement(selector.orderAddressStepper.backToItemsButtonLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.backToItems);
        utils.getElement(selector.orderAddressStepper.saveOrderButtonLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.saveOrder);
        utils.getElement(selector.orderAddressStepper.saveAndContinueButtonLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.saveAndContinue);
        utils.getElement(selector.orderAddressStepper.recipientAddressCardTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.recipeintaddress);
        utils.getElement(selector.orderAddressStepper.countryInputTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.country);
        utils.getElement(selector.orderAddressStepper.firstNameInputTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.firstName);
        utils.getElement(selector.orderAddressStepper.lastNameInputTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.lastName);
        utils.getElement(selector.orderAddressStepper.mobileNumberTitleInputLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.mobile);
        utils.getElement(selector.orderAddressStepper.emailInputTileLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.email);
        utils.getElement(selector.orderAddressStepper.bussinessInputTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.bussinessName);
        utils.getElement(selector.orderAddressStepper.address1InputTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.indianAddress1);
        utils.getElement(selector.orderAddressStepper.address2InputTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.indianAddress2);
        utils.getElement(selector.orderAddressStepper.landmarkInputTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.landmark);
        utils.getElement(selector.orderAddressStepper.pincodeInputTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.pincode);
        utils.getElement(selector.orderAddressStepper.cityInputTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.city);
        utils.getElement(selector.orderAddressStepper.stateInputTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.State);
        utils.getElement(selector.orderAddressStepper.countryInputLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.orderAddressStepper.firstNameInputLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.orderAddressStepper.lastNameInputLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.orderAddressStepper.mobileNumberInputLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.orderAddressStepper.emailInputLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.orderAddressStepper.bussinessInputLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.orderAddressStepper.address1InputLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.orderAddressStepper.address2InputLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.orderAddressStepper.landmarkInputLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.orderAddressStepper.pincodeInputLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.orderAddressStepper.cityInputLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.orderAddressStepper.stateInputLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.orderAddressStepper.locationForSameDayTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.locationForSameDay);
        utils.getElement(selector.orderAddressStepper.addLatLongButtonLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.add);
        utils.getElement(selector.orderAddressStepper.editLatLongButtonLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.edit);
        utils.getElement(selector.orderAddressStepper.removeLatLongButtonLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.remove);
    }

    verifyOrderAddressStepperValidationErrors() {
        return {
            firstNameRequired: () => utils.verifyErrorMessage(utils.getElement(selector.orderAddressStepper.firstNameErrorLocator), messages.firstNameRequired),
            mobileNumberRequired: () => utils.verifyErrorMessage(utils.getElement(selector.orderAddressStepper.mobileErrorLocator), messages.mobilenumberRequired),
            address1Required: () => utils.verifyErrorMessage(utils.getElement(selector.orderAddressStepper.address1ErrorLocator), messages.indianAddress1Required),
            address2Required: () => utils.verifyErrorMessage(utils.getElement(selector.orderAddressStepper.address2ErrorLocator), messages.indianAddress2Required),
            pincodeRequired: () => utils.verifyErrorMessage(utils.getElement(selector.orderAddressStepper.pincodeErrorLocator), messages.pincodeRequired),
            cityRequired: () => utils.verifyErrorMessage(utils.getElement(selector.orderAddressStepper.cityErrorLocator), messages.cityRequired),
            stateRequired: () => utils.verifyErrorMessage(utils.getElement(selector.orderAddressStepper.stateErrorLocator), messages.stateRequired),
            minTwoFirstNameCharacter: () => utils.verifyErrorMessage(utils.getElement(selector.orderAddressStepper.firstNameErrorLocator), messages.minTwoCharacter),
            minTwoLastNameCharacter: () => utils.verifyErrorMessage(utils.getElement(selector.orderAddressStepper.lastNameErrorLocator), messages.minTwoCharacter),
            invalidMobile: () => utils.verifyErrorMessage(utils.getElement(selector.orderAddressStepper.mobileErrorLocator), messages.invalidMobileNumber),
            invalidEmail: () => utils.verifyErrorMessage(utils.getElement(selector.orderAddressStepper.emailErrorLocator), messages.invalidEmail),
            minTwoBusinessNameCharacter: () => utils.verifyErrorMessage(utils.getElement(selector.orderAddressStepper.businessErrorLocator), messages.minTwoCharacter),
            minSixAddress1Character: () => utils.verifyErrorMessage(utils.getElement(selector.orderAddressStepper.address1ErrorLocator), messages.minSixCharacter),
            minSixAddress2Character: () => utils.verifyErrorMessage(utils.getElement(selector.orderAddressStepper.address2ErrorLocator), messages.minSixCharacter),
            minSixPincodeCharacter: () => utils.verifyErrorMessage(utils.getElement(selector.orderAddressStepper.pincodeErrorLocator), messages.minSixCharacter),
        }
    }

    // region Packaging
    clickPackagingSaveAndContinueButton() {
        utils.getElement(selector.orderPackagingStepper.saveAndContinueButtonLocator).click();
    }

    clickPackagingAddPackageButton() {
        utils.getElement(selector.orderPackagingStepper.addPackageButtonLocator).click();
    }

    enterPackageDetails(packagetype: IPackageVM) {
        utils.generalInput(utils.getElement(selector.orderPackagingStepper.lengthInputLocator), packagetype.length.toString());
        utils.generalInput(utils.getElement(selector.orderPackagingStepper.widthInputLocator), packagetype.width.toString());
        utils.generalInput(utils.getElement(selector.orderPackagingStepper.heightInputLocator), packagetype.height.toString());
        // Removing this to check auto filling of Weight as per items weight
        utils.getElement(selector.orderPackagingStepper.weightInputLocator).clear();
        utils.generalInput(utils.getElement(selector.orderPackagingStepper.weightInputLocator), packagetype.weight.toString());
        this.clickPackagingAddPackageButton();
    }

    clickDeletePackage() {
        utils.getElement(selector.orderPackagingStepper.deletePackageIcon).click();
        utils.getElement(selector.orderPackagingStepper.deletePackageConfirmButton).click();
    }

    verifyOrderPackagingStepperPageElements() {
        utils.getElement(selector.orderList.titleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.orders);
        utils.getElement(selector.orderList.allOrdersTabLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.allOrders);
        utils.getElement(selector.orderGeneralStepper.headerLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, infoText.orderPackagingStepperHeader);
        utils.getElement(selector.orderPackagingStepper.backToRecipeintButtonLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.backToRecipient);
        utils.getElement(selector.orderPackagingStepper.unitButtonLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.units);
        utils.getElement(selector.orderPackagingStepper.saveAndContinueButtonLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.saveAndContinue);
        utils.invokeInnerText(selector.orderPackagingStepper.infoCardPlaceholdertext, infoText.orderPackagingInfoCard);
        utils.getElement(selector.orderPackagingStepper.packagesCardTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.packages);
        utils.getElement(selector.orderPackagingStepper.typeInputTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.type);
        utils.getElement(selector.orderPackagingStepper.lengthInputTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.length);
        utils.getElement(selector.orderPackagingStepper.widthInputTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.width);
        utils.getElement(selector.orderPackagingStepper.weightInputTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.weigth);
        utils.getElement(selector.orderPackagingStepper.qtyInputTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.qty);
        utils.getElement(selector.orderPackagingStepper.addPackageButtonLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.orderPackagingStepper.specialServiceCardTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.specialServices);
        utils.getElement(selector.orderPackagingStepper.specialServiceIngoIconLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.orderPackagingStepper.insuranceTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.insurance);
        utils.getElement(selector.orderPackagingStepper.codTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.cod);
        utils.getElement(selector.orderPackagingStepper.hazmatTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.hazmat);
        utils.getElement(selector.orderPackagingStepper.liquidContentTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.liquidContent);
        utils.getElement(selector.orderPackagingStepper.fragileTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.fragile);
        utils.getElement(selector.orderPackagingStepper.otpRequiredTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.otpRequired);
        utils.getElement(selector.orderPackagingStepper.typeInputLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.orderPackagingStepper.lengthInputLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.orderPackagingStepper.widthInputLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.orderPackagingStepper.heightInputLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.orderPackagingStepper.weightInputLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.orderPackagingStepper.qtyInputLocator).should(cyAssertion.beVisible);
        // Click special service info icon
        utils.getElement(selector.orderPackagingStepper.specialServiceIngoIconLocator).click();
        utils.invokeInnerText(selector.orderPackagingStepper.specialServiceInfoLocator, infoText.orderPackagingSpecialServiceInfoCard);

    }

    verifyOrderPackagingStepperValidationErrors() {
        return {
            packageRequired: () => utils.verifyErrorMessage(utils.getElement(selector.orderPackagingStepper.notificationAlertLocator), messages.packageRequired),
            lenghtGreaterThan: () => utils.verifyErrorMessage(utils.getElement(selector.orderPackagingStepper.lengthErrorLocator), messages.lenghtGreaterThan),
            widthGreaterThan: () => utils.verifyErrorMessage(utils.getElement(selector.orderPackagingStepper.widthErrorLocator), messages.widthGreaterThan),
            heightGreaterThan: () => utils.verifyErrorMessage(utils.getElement(selector.orderPackagingStepper.heightErrorLocator), messages.heightGreaterThan),
            morePackagesForB2B: () => utils.verifyErrorMessage(utils.getElement(selector.orderPackagingStepper.notificationAlertLocator), messages.morePackagesForB2B),
            weightMismatchError: () => utils.verifyErrorMessage(utils.getElement(selector.orderPackagingStepper.notificationAlertLocator), messages.weightMismatchError),
            packageDeleteSuccess: () => utils.verifyErrorMessage(utils.getElement(selector.orderPackagingStepper.notificationAlertLocator), messages.packageDeleteSuccess),
        }
    }

    // region Carrier

    clickCarrierSaveAndContinueButton() {
        cy.wait(5000);
        utils.getElement(selector.orderCarrierStepper.saveAndContinueButtonLocator).click();
    }

    verifyOrderCarrierStepperPageElements() {
        utils.getElement(selector.orderList.titleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.orders);
        utils.getElement(selector.orderList.allOrdersTabLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.allOrders);
        utils.getElement(selector.orderGeneralStepper.headerLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, infoText.orderCarrierStepperHeader);
        utils.getElement(selector.orderCarrierStepper.backToPackagingButtonLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.backToPackaging);
        utils.getElement(selector.orderCarrierStepper.saveAndContinueButtonLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.saveAndContinue);
        utils.getElement(selector.orderCarrierStepper.selectedRateCardLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.orderCarrierStepper.selectedRateCardLogo).should(cyAssertion.beVisible);
        utils.getElement(selector.orderCarrierStepper.selectedRateCardCarrierName).should(cyAssertion.beVisible);
        utils.getElement(selector.orderCarrierStepper.selectedRateCardTotalFee).should(cyAssertion.beVisible);
        utils.getElement(selector.orderCarrierStepper.selectedRateCardEDD).should(cyAssertion.beVisible);
        utils.getElement(selector.orderCarrierStepper.selectRateCardPackageWeight).should(cyAssertion.beVisible);
    }

    // region Compliance

    clickComplianceSaveAndContinueButton(){
        utils.getElement(selector.orderComplianceStepper.saveAndContinueButtonLocator).click();
    }

    uploadComplianceDoc(fileName: string) {
        utils.generalUploadFile(fileName, selector.orderComplianceStepper.fileInputBrowserButton);
    }

    clickAddDocsButton(){
        utils.getElement(selector.orderComplianceStepper.addDocsButtonLocator).click();
    }

    enterComplianceDetails(complianceDetails: IShipmentDocVM){
        utils.generalInput(utils.getElement(selector.orderComplianceStepper.typeDropdownLocator), complianceDetails.type);
        utils.clickDropdownOptionOrFirst();
        utils.generalInput(utils.getElement(selector.orderComplianceStepper.numberInputLocator), complianceDetails.number);
        this.uploadComplianceDoc(fixture.invoicePDF);
        this.clickAddDocsButton();
    }

    verifyOrderComplianceStepperValidationErrors() {
        return {
            invoiceRequiredForB2B: () => utils.verifyErrorMessage(utils.getElement(selector.orderComplianceStepper.notificationAlertLocator), messages.invoiceRequiredForB2B)
        }
    }

    // region Review & Detail

    clickCreateShipmentButton() {
        utils.getElement(selector.orderReviewStepper.createShipmentButtonLocator).click();
    }

    clickCloneOrderButton() {
        utils.getElement(selector.orderReviewStepper.cloneOrderButtonLocator).click();
    }

    verifyOrderReviewStepperPageElements() {
        utils.getElement(selector.orderList.titleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.orders);
        utils.getElement(selector.orderList.allOrdersTabLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.allOrders);
        utils.getElement(selector.orderGeneralStepper.headerLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, infoText.orderReviewStepperHeader);
        utils.getElement(selector.orderReviewStepper.backToCarrierButtonLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.backToCompliance);
        utils.getElement(selector.orderReviewStepper.createShipmentButtonLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.createShipment);
        utils.getElement(selector.orderReviewStepper.itemsCardTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.items);
        utils.getElement(selector.orderReviewStepper.addressesCardTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.addresses);
        utils.getElement(selector.orderReviewStepper.recipientAddressTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.recipeintaddress);
        utils.getElement(selector.orderReviewStepper.pickupLocationTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.pickupLocation);
        utils.getElement(selector.orderReviewStepper.packagingAndCarrierCardTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.packagingAndCarrier);
        utils.getElement(selector.orderReviewStepper.boxTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.box);
        utils.getElement(selector.orderReviewStepper.weightTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.weight);
        utils.getElement(selector.orderReviewStepper.billableTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.billableWeight);
        utils.getElement(selector.orderReviewStepper.carrierNameAndSeviceTitleLocator).should(cyAssertion.beVisible);
        utils.getElement(selector.orderReviewStepper.eddTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.edd);
        utils.getElement(selector.orderReviewStepper.supporetedContactTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.supportContacts);
        utils.getElement(selector.orderReviewStepper.totalFeeTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.totalFee);
        utils.getElement(selector.orderReviewStepper.trackingCardTitleLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.tracking);
    }

    verifyOrderDetailStepperPageElements() {
        cy.wait(2000);
        utils.invokeInnerText(selector.orderReviewStepper.trackingNumberlocator, label.trackingNumber);
        utils.getElement(selector.orderReviewStepper.moreOptionsButtonLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.moreOptions);
        utils.getElement(selector.orderReviewStepper.cloneOrderButtonLocator).should(cyAssertion.beVisible).and(cyAssertion.contains, label.cloneOrder);
    }

    verifyOrderDetailStepperValidationErrors() {
        return {
            shipmentCreatedSuccessfully: () => utils.verifyErrorMessage(utils.getElement(selector.orderReviewStepper.notificationAlertLocator), messages.shipmentCreatedSuccessfully),
        }
    }

    // region Save

    clickFulfillOrderButton() {
        utils.getElement(selector.orderPendingDetail.fulfillOrderButtonLocator).click();
    }

    verifyOrderSaveStepperValidationErrors() {
        return {
            orderSavedSuccessfully: () => utils.verifyErrorMessage(utils.getElement(selector.orderPendingDetail.notificationAlertLocator), messages.orderCreatedSuccessfully),
        }
    }

    // region Discard

    clickDiscardOrderButton() {
        utils.getElement(selector.orderPendingDetail.discardOrderButtonLocator).click();
    }

    clickDiscardPopupConfirmButton() {
        utils.getElement(selector.orderPendingDetail.discardPopupConfirmButtonLocator).click();
    }

    verifyOrderDiscardStepperValidationErrors() {
        return {
            orderDiscardedSuccessfully: () => utils.verifyErrorMessage(utils.getElement(selector.orderPendingDetail.notificationAlertLocator), messages.orderDiscardedSuccessfully),
        }
    }

    // region Import

    clickUploadButton() {
        utils.getElement(selector.orderImportPopup.uploadButtonLocator).click();
    }

    closeImportPopButton() {
        utils.getElement(selector.orderImportPopup.closeImportPopButtonLocator).click();
    }

    uploadImportFile(fileName: string) {
        utils.generalUploadFile(fileName, selector.orderImportPopup.uploadImportFileLocator);
    }

    verifyImportPopupValidationErrors() {
        return {
            orderImportedSuccessfully: () => utils.verifyErrorMessage(utils.getElement(selector.orderImportPopup.notificationAlertLocator), messages.orderImportedSuccessfully)
        }
    }

}
export const orderPage = new OrderPage()