import {PropertyMultipleFixedLengthType} from "./PropertyMultipleFixedLengthType";
import * as Long from "long";

export class PtypMultipleInteger16 extends PropertyMultipleFixedLengthType<number>{

    constructor() {
        super(0x1002, "PtypMultipleInteger16", 2);
    }

    protected resolveSingleValue(bytes: number[]): number {
        return Long.fromBytesLE(bytes).toNumber();
    }

}