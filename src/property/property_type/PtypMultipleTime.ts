import {PropertyMultipleFixedLengthType} from "./PropertyMultipleFixedLengthType";
import {toTime} from "../../utils";

export class PtypMultipleTime extends PropertyMultipleFixedLengthType<Date>{

    constructor() {
        super(0x1040, "PtypMultipleTime", 8);
    }

    protected resolveSingleValue(bytes: number[]): Date {
        return toTime(bytes);
    }

}