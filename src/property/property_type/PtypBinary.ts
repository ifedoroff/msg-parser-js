import {PropertyType} from "./PropertyType";
import {MessageStorage} from "../../MessageStorage";
import {PropertyTag} from "../PropertyTag";
import * as Long from "long";

export class PtypBinary extends PropertyType<number[]>{

    constructor() {
        super(0x0102, "PtypBinary");
    }
    resolveValue(container: MessageStorage, propertyTag: PropertyTag): number[] {
        const property = container.propertiesStream().getProperty(propertyTag);
        if(property === undefined) {
            return undefined;
        } else {
            const size = Long.fromBytesLE(property.data().slice(0, 4)).toNumber();
            const valueStream = container.streams().find(streamDirectoryEntry => streamDirectoryEntry.getDirectoryEntryName() === MessageStorage.VALUE_STREAM_PREFIX + propertyTag.toString().toUpperCase());
            return valueStream.read(0, size);
        }
    }

}