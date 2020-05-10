import {UnsupportedPropertyType} from "./UnsupportedPropertyType";

export class PtypMultipleFloating64 extends UnsupportedPropertyType<any[]>{
    constructor() {
        super(0x1005, "PtypMultipleFloating64");
    }
}