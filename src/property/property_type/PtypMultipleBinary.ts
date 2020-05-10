import {PropertyMultipleVariableLengthType} from "./PropertyMultipleVariableLengthType";

export class PtypMultipleBinary extends PropertyMultipleVariableLengthType<number[]>{
    constructor() {
        super(0x1102, "PtypMultipleBinary");
    }

    protected resolveSingleValue(bytes: number[]): number[] {
        return bytes;
    }
}