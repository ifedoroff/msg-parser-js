import {PropertyMultipleVariableLengthType} from "./PropertyMultipleVariableLengthType";
import {toUTF16WithNoTrailingZeros} from "compound-binary-file-js";

export class PtypMultipleString8 extends PropertyMultipleVariableLengthType<string>{
    constructor() {
        super(0x101E, "PtypMultipleString8");
    }

    protected resolveSingleValue(bytes: number[]): string {
        return toUTF16WithNoTrailingZeros(bytes);
    }
}