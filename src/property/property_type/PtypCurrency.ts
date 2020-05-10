import {PropertyType} from "./PropertyType";
import {UnsupportedPropertyType} from "./UnsupportedPropertyType";

export class PtypCurrency extends UnsupportedPropertyType<any>{
    constructor() {
        super(0x0006, "PtypCurrency");
    }
}