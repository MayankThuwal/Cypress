import { DimensionUnitEnum, WeightUnitEnum, TaxInfoCodeEnum, AddressCategoryEnum, AddressTypeEnum, PackageTypeEnum, ShipmentDocTypeEnum, ShipmentDocFileTypeEnum} from "cypress/shared/enum";

/**
 * IFulfillmentItemVM belongs to both IOrderItemVM and IShipmentItemVM
 */
export interface IFulfillmentItemVM {
    productName: string;
    name: string;
    description?: string;
    weight: number;
    weightUnit: WeightUnitEnum;
    length?: number;
    width?: number;
    height?: number;
    dimensionUnit?: DimensionUnitEnum;
    sku?: string;
    value: number;
    totalValue: number;
    taxInfos?: ITaxInfoVM[];
    quantity?: number;
    hsnCode?: string;
    currencyCode?: string;
    originCountry?: string;
}

export interface ITaxInfoVM {
    code: TaxInfoCodeEnum;
    value?: number | null | undefined;
}

export interface IBaseAddressVM {
    id?: string;
    firstName: string;
    lastName?: string;
    company?: string;
    street1: string;
    street2: string;
    street3?: string;
    city: string;
    stateCode: string;
    zip: string;
    countryCode: string;
    phone: string;
    phoneCode: string;
    email: string;
    save?: boolean;
    verify: boolean;
    isResidential: boolean; // TODO: Remove this and use category of type AddressCategoryEnum
    category?: AddressCategoryEnum;
    latitude?: number;
    longitude?: number;
}
export interface IAccountAddressVM {
    type: AddressTypeEnum
    street1: string;
    street2: string;
    city: string;
    stateCode: string;
    zip: string;
    countryCode: string;
    landmark: string;
}

export interface IPackageVM {
  id: string;
  name: string;
  createdDate?: Date;
  length: number;
  width: number;
  height: number;
  dimensionUnit: DimensionUnitEnum;
  weight: number;
  weightUnit: WeightUnitEnum;
  packageType: PackageTypeEnum;
  isFavorite: boolean;  
}

export interface IShipmentDocRequestVM{
    id: string;  
}

export interface IShipmentDocVM extends IShipmentDocRequestVM {
    url?: string; // URL of the form
    type: ShipmentDocTypeEnum // Type of the form
    fileType?: ShipmentDocFileTypeEnum; // File type of the form (e.g., "PNG", "PDF")
    number: string;
    value?: string
}