import {UnsupportedPropertyType} from "./UnsupportedPropertyType";

export class PtypMultipleFloating32 extends UnsupportedPropertyType<any[]>{
    constructor() {
        super(0x1004, "PtypMultipleFloating32");
    }
}