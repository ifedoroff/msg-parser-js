import {IndexAndKindInformation, PropertyKind} from "./IndexAndKindInformation";
import * as Long from "long"
import {StringStream} from "./StringStream";
import UUID from "pure-uuid";
import {GUIDStream} from "./GuidStream";
import {PropertySet} from "../property/PropertySet";

export class Entry {
    private readonly bytes: number[];
    private readonly idOrOffset: number;
    private readonly indexAndKindInformation: IndexAndKindInformation;

    constructor(bytes: number[]) {
        this.bytes = bytes;
        this.idOrOffset = Long.fromBytesLE(bytes.slice(0, 4)).toNumber();
        this.indexAndKindInformation = new IndexAndKindInformation(bytes.slice(4, 8));
    }

    getPropertyName(stringStream: StringStream): string {
        return stringStream.getPropertyNameAt(this.idOrOffset);
    }

    getPropertyNameIdentifierOrOffsetOrChecksum(): number {
        return this.idOrOffset;
    }

    /**
     * @deprecated The method should not be used
     */
    getGuid(guidStream: GUIDStream): UUID {
        return guidStream.getGuidAt(this.indexAndKindInformation.getGuidIndex());
    }

    getPropertySetGuid(guidStream: GUIDStream): UUID {
        return guidStream.getGuidAt(this.indexAndKindInformation.getGuidIndex());
    }

    getPropertySet(guidStream: GUIDStream): PropertySet {
        return PropertySet.forUUID(this.getPropertySetGuid(guidStream));
    }

    getPropertyIndex(): number {
        return this.indexAndKindInformation.getPropertyIndex();
    }

    isString(): boolean {
        return this.indexAndKindInformation.getPropertyKind() === PropertyKind.STRING;
    }

    isNumeric(): boolean {
        return this.indexAndKindInformation.getPropertyKind() === PropertyKind.NUMERIC;
    }
}