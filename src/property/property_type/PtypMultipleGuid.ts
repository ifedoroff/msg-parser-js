import {PropertyMultipleFixedLengthType} from "./PropertyMultipleFixedLengthType";
import UUID from "pure-uuid";
import {uuidFromByteLE} from "../../utils";

export class PtypMultipleGuid extends PropertyMultipleFixedLengthType<UUID>{
    constructor() {
        super(0x1048, "PtypMultipleGuid", 16);
    }

    protected resolveSingleValue(bytes: number[]): UUID {
        return uuidFromByteLE(bytes);
    }
}