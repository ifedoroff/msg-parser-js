import * as Long from "long";
import {PropertyMultipleFixedLengthType} from "./PropertyMultipleFixedLengthType";

export class PtypMultipleInteger64 extends PropertyMultipleFixedLengthType<Long>{
    constructor() {
        super(0x1014, "PtypMultipleInteger64", 8);
    }

    protected resolveSingleValue(bytes: number[]): Long {
        return Long.fromBytesLE(bytes);
    }
}