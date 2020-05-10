import {PropertyMultipleFixedLengthType} from "./PropertyMultipleFixedLengthType";

export class PtypMultipleBoolean extends PropertyMultipleFixedLengthType<boolean>{

    constructor() {
        super(0x100B, "PtypMultipleBoolean", 8);
    }

    protected resolveSingleValue(bytes: number[]): boolean {
        return (bytes[0] & 1) === 1;
    }

}