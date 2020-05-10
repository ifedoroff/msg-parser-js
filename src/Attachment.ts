import {MessageStorage} from "./MessageStorage";
import {StorageDirectoryEntry, StreamDirectoryEntry} from "compound-binary-file-js";
import {PropertiesStream} from "./property/PropertiesStream";
import {PropertyType} from "./property/property_type/PropertyType";
import {SimplePropertiesStream} from "./property/SimplePropertiesStream";
import {propertyTypeForId} from "./property/property_type/PropertyTypes";
import {PidTagAttachDataBinary} from "./property/KnownProperties";

export class Attachment extends MessageStorage {
    constructor(directoryEntry: StorageDirectoryEntry) {
        super(directoryEntry);
    }

    protected createPropertiesStream(stream: StreamDirectoryEntry): PropertiesStream {
        return new SimplePropertiesStream(stream, 8);
    }

    content(): number[] {
        return propertyTypeForId<PropertyType<number[]>>(PidTagAttachDataBinary.propertyType).resolveValue(this, PidTagAttachDataBinary);
    }

}