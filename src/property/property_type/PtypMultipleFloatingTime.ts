import {UnsupportedPropertyType} from "./UnsupportedPropertyType";

export class PtypMultipleFloatingTime extends UnsupportedPropertyType<any[]>{
    constructor() {
        super(0x1007, "PtypMultipleFloatingTime");
    }
}