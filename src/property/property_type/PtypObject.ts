import {UnsupportedPropertyType} from "./UnsupportedPropertyType";

export class PtypObject extends UnsupportedPropertyType<any>{
    constructor() {
        super(0x000D, "PtypObject");
    }
}