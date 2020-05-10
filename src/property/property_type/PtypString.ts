import {PropertyType} from "./PropertyType";
import {MessageStorage} from "../../MessageStorage";
import {PropertyTag} from "../PropertyTag";
import * as Long from "long";
import {toUTF16WithNoTrailingZeros} from "compound-binary-file-js";

export class PtypString extends PropertyType<string>{

    constructor() {
        super(0x001F, "PtypString");
    }

    resolveValue(container: MessageStorage, propertyTag: PropertyTag): string {
        const property = container.propertiesStream().getProperty(propertyTag);
        const size = Long.fromBytesLE(property.data().slice(0,4)).toNumber() - 2;
        const valueStream = container.streams().find(streamDirectoryEntry => streamDirectoryEntry.getDirectoryEntryName() === MessageStorage.VALUE_STREAM_PREFIX + propertyTag.toString().toUpperCase());
        return toUTF16WithNoTrailingZeros(valueStream.read(0, size));
    }

}