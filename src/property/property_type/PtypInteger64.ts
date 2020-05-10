import {PropertyType} from "./PropertyType";
import * as Long from "long";
import {MessageStorage} from "../../MessageStorage";
import {PropertyTag} from "../PropertyTag";

export class PtypInteger64 extends PropertyType<Long> {

    constructor() {
        super(0x0014, "PtypInteger64");
    }

    resolveValue(container: MessageStorage, propertyTag: PropertyTag): Long {
        return Long.fromBytesLE(container.propertiesStream().properties().find(propertyInfo => PropertyTag.equal(propertyInfo.propertyTag(), propertyTag)).data());
    }

}