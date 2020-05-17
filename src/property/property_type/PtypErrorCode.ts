import {PropertyType} from "./PropertyType";
import {MessageStorage} from "../../MessageStorage";
import {PropertyTag} from "../PropertyTag";
import * as Long from "long";

export class PtypErrorCode extends PropertyType<number>{

    constructor() {
        super(0x000A, "PtypErrorCode");

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