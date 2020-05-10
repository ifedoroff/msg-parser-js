import {PropertyType} from "./PropertyType";
import {MessageStorage} from "../../MessageStorage";
import {PropertyTag} from "../PropertyTag";
import * as Long from "long";

export class PtypErrorCode extends PropertyType<number>{

    constructor() {
        super(0x000A, "PtypErrorCode");

    }

    resolveValue(container: MessageStorage, propertyTag: PropertyTag): number {
        return Long.fromBytesLE(
                container.propertiesStream().properties().find(propertyInfo => PropertyTag.equal(propertyInfo.propertyTag(), propertyTag)).data().slice(0, 4)
        ).toNumber();
    }

}