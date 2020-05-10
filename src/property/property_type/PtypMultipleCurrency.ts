import {UnsupportedPropertyType} from "./UnsupportedPropertyType";

export class PtypMultipleCurrency extends UnsupportedPropertyType<any[]>{
    constructor() {
        super(0x1006, "PtypMultipleCurrency");
    }
}