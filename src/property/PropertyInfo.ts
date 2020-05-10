import * as Long from "long";
import {PropertyTag} from "./PropertyTag";
export class PropertyInfo {

    private readonly bytes: number[];

    constructor(bytes: number[]) {
        this.bytes = bytes;
    }

    propertyId(): number {
        return Long.fromBytesLE(this.bytes.slice(2, 4)).toNumber();
    }

    propertyType(): number {
        return Long.fromBytesLE(this.bytes.slice(0, 2)).toNumber()
    }

    propertyTag(): PropertyTag {
        return new PropertyTag(this.propertyId(), this.propertyType());
    }

    flags(): number {
        return Long.fromBytesLE(this.bytes.slice(4, 8)).toNumber();
    }

    data(): number[] {
        return this.bytes.slice(8, 16);
    }
}