import * as Long from "long";
import {PropertyTag} from "./PropertyTag";
import {propertyTypeForId} from "./property_type/PropertyTypes";
export class PropertyInfo {

    private readonly bytes: number[];

    constructor(bytes: number[]) {
        this.bytes = bytes;
    }

    propertyId(): number {
        return Long.fromBytesLE(this.bytes.slice(2, 4)).toNumber();
    }

    propertyTypeId(): number {
        return Long.fromBytesLE(this.bytes.slice(0, 2)).toNumber()
    }

    propertyTag(): PropertyTag {
        return new PropertyTag(this.propertyId(), propertyTypeForId(this.propertyTypeId()));
    }

    flags(): number {
        return Long.fromBytesLE(this.bytes.slice(4, 8)).toNumber();
    }

    data(): number[] {
        return this.bytes.slice(8, 16);
    }
}