import {UnsupportedPropertyType} from "./UnsupportedPropertyType";

export class PtypFloatingTime extends UnsupportedPropertyType<any>{
    constructor() {
        super(0x0007, "PtypFloatingTime");
    }
}