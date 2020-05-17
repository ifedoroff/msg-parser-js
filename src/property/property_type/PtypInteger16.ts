import {PropertyType} from "./PropertyType";
import {PropertyTag} from "../PropertyTag";
import {MessageStorage} from "../../MessageStorage";
import * as Long from "long";

export class PtypInteger16 extends PropertyType<number> {
    constructor() {
        super(0x0002, "PtypInteger16");
    }
    resolveValue(container: MessageStorage, propertyTag: PropertyTag): number {
        const property = container.propertiesStream().properties().find(propertyInfo => PropertyTag.equal(propertyInfo.propertyTag(), propertyTag));
        if(property === undefined) {
            return undefined;
        } else {
            return Long.fromBytesLE(property.data().slice(0, 4)).toNumber();
        }
    }
}