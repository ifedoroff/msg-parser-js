import {UnsupportedPropertyType} from "./UnsupportedPropertyType";

export class PtypFloating64 extends UnsupportedPropertyType<number>{
    constructor() {
        super(0x0005, "PtypFloating64");
    }
}