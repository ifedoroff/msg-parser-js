import {StorageDirectoryEntry, StreamDirectoryEntry} from "compound-binary-file-js";
import {PropertiesStream} from "./property/PropertiesStream";
import {PropertyTag} from "./property/PropertyTag";
import {propertyTypeForId} from "./property/property_type/PropertyTypes";
import {NamedPropertyMappingStorage} from "./nameid_mapping/NamedPropertyMappingStorage";
import {PropertyNameString} from "./property/PropertyNameString";
import {PropertyNameLID} from "./property/PropertyNameLID";

export abstract class MessageStorage {

    public static readonly VALUE_STREAM_PREFIX = "__substg1.0_";
    public static readonly INTERNAL_STORAGE_NAME = "__substg1.0_3701000D";
    public static readonly ATTACHMENT_STORAGE_PREFIX = "__attach_version1.0";
    protected readonly storage: StorageDirectoryEntry;
    protected readonly namedPropertyMappingStorage: NamedPropertyMappingStorage;

    protected constructor(storage: StorageDirectoryEntry, namedPropertyMappingStorage: NamedPropertyMappingStorage) {
        this.storage = storage;
        this.namedPropertyMappingStorage = namedPropertyMappingStorage;
    }

    propertiesStream(): PropertiesStream {
        return this.createPropertiesStream(this.storage.streams().find(streamDirectoryEntry => PropertiesStream.STREAM_NAME === streamDirectoryEntry.getDirectoryEntryName()));
    }

    public streams(): StreamDirectoryEntry[] {
        return this.storage.streams();
    }

    findByName(name: string): StreamDirectoryEntry {
        return this.streams().find(streamDirectoryEntry => streamDirectoryEntry.getDirectoryEntryName().toUpperCase() === name.toUpperCase());
    }

    protected abstract createPropertiesStream(stream: StreamDirectoryEntry): PropertiesStream;

    underlyingDirectoryEntry(): StorageDirectoryEntry {
        return this.storage;
    }

    getProperty<T>(property: PropertyTag|PropertyNameString|PropertyNameLID): T {
        const propertyType = property.propertyType;
        if (propertyType === undefined) {
            throw new Error("Property type is required");
        }
        if(property instanceof PropertyTag) {
            return propertyType.resolveValue(this, property);
        } else {
            const propertyId = this.namedPropertyMappingStorage.getPropertyIdByPropertyName(property);
            return property.propertyType.resolveValue(this, new PropertyTag(propertyId, property.propertyType));
        }
    }

}