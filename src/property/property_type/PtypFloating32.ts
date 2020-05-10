import {UnsupportedPropertyType} from "./UnsupportedPropertyType";

export class PtypFloating32 extends UnsupportedPropertyType<number>{
    constructor() {
        super(0x0004, "PtypFloating32");
    }
}