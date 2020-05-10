import {PropertyMultipleVariableLengthType} from "./PropertyMultipleVariableLengthType";
import {toUTF16WithNoTrailingZeros} from "compound-binary-file-js";

export class PtypMultipleString extends PropertyMultipleVariableLengthType<string>{
    constructor() {
        super(0x101F, "PtypMultipleString");
    }

    protected resolveSingleValue(bytes: number[]): string {
        return toUTF16WithNoTrailingZeros(bytes);
    }
}