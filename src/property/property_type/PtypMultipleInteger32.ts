import {PropertyMultipleFixedLengthType} from "./PropertyMultipleFixedLengthType";
import * as Long from "long";

export class PtypMultipleInteger32 extends PropertyMultipleFixedLengthType<number>{

    constructor() {
        super(0x1003, "PtypMultipleInteger32", 4);
    }

    protected resolveSingleValue(bytes: number[]): number {
        return Long.fromBytesLE(bytes).toNumber();
    }

}