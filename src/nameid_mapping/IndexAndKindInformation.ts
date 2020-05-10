import * as Long from "long"

export enum PropertyKind {
    NUMERIC, STRING
}

export class IndexAndKindInformation {

    private readonly propertyIndex: number;
    private bytes: number[];
    private readonly guidIndex: number;
    private readonly propertyKind: PropertyKind;

    constructor(bytes: number[]) {
        this.propertyIndex = Long.fromBytesLE(bytes.slice( 2, 4)).toNumber();
        this.bytes = bytes;
        const twoTrailingBytesArray = bytes.slice(0, 2);
        const twoTrailingBytes = Long.fromBytesLE(twoTrailingBytesArray).toNumber();
        this.guidIndex = twoTrailingBytes >> 1;
        if((twoTrailingBytes & 1) === 1) {
            this.propertyKind = PropertyKind.STRING;
        } else {
            this.propertyKind = PropertyKind.NUMERIC;
        }
    }

    getPropertyIndex(): number {
        return this.propertyIndex;
    }

    getGuidIndex(): number {
        return this.guidIndex;
    }

    getPropertyKind(): PropertyKind {
        return this.propertyKind;
    }
}