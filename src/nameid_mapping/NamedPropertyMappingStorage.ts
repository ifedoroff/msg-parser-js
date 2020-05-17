import {StorageDirectoryEntry, toUTF16Bytes, StreamDirectoryEntry} from "compound-binary-file-js";
import {PropertyNameString} from "../property/PropertyNameString";
import {CRC} from "../CRC";
import {PropertyNameLID} from "../property/PropertyNameLID";
import UUID from "pure-uuid";
import {PropertyTag} from "../property/PropertyTag";
import * as Long from "long";
import {Entry} from "./Entry";
import {GUIDStream} from "./GuidStream";
import {EntryStream} from "./EntryStream";
import {StringStream} from "./StringStream";
import {PropertySet} from "../property/PropertySet";
import {toHex} from "../utils";
import {UnsupportedPropertyType} from "../property/property_type/UnsupportedPropertyType";

export class NamedPropertyMappingStorage {

    public static readonly STORAGE_NAME = "__nameid_version1.0";
    public static readonly NAMED_PROPERTY_ID_BASE = 0x8000; // 32768
    private storage: StorageDirectoryEntry;


    constructor(storage: StorageDirectoryEntry) {
        this.storage = storage;
    }

    getPropertyNameByPropertyTag(propertyTag: PropertyTag): string {
        const entry = this.entryStream().getEntry(propertyTag.propertyId - NamedPropertyMappingStorage.NAMED_PROPERTY_ID_BASE);
        if(entry.isNumeric()) {
            return toHex(entry.getPropertyNameIdentifierOrOffsetOrChecksum());
        } else {
            return entry.getPropertyName(this.stringStream());
        }
    }

    getPropertyIdByPropertyName(propertyName: PropertyNameString|PropertyNameLID): number {
        if(propertyName instanceof PropertyNameString) {
            const crcOrPropertyIdentifier = CRC.crc32(toUTF16Bytes(propertyName.propertyName));
            const propertyTag = this.getPropertyIdForNamedProperty(crcOrPropertyIdentifier, propertyName.propertySet.id);
            if (propertyTag == null) {
                throw new Error("Unable to find property: " + propertyName.propertyName);
            } else {
                return propertyTag;
            }
        } else {
            const propertyTag = this.getPropertyIdForNamedProperty(propertyName.propertyLID, propertyName.propertySet.id);
            if(propertyTag == null) {
                throw new Error("Unable to find property: " + propertyName.propertyLID);
            } else {
                return propertyTag;
            }
        }
    }

    private getPropertyIdForNamedProperty(crcOrPropertyIdentifier: number, propertySetGuid: UUID): number {
        const guidIndex = this.guidStream().getIndexFor(propertySetGuid);
        const streamId = 0x1000 + (crcOrPropertyIdentifier ^ ((guidIndex << 1) | 1)) % 0x1F;
        const hexIdentifier = streamId << 16 | 0x00000102;
        const streamName = "__substg1.0_" + Long.fromValue(hexIdentifier).toString(16);
        const namesStream:StreamDirectoryEntry = this.storage.findChild(directoryEntry => directoryEntry.getDirectoryEntryName().toUpperCase() === streamName.toUpperCase());
        for(let i = 0; i < namesStream.getStreamSize() / 8; i++) {
            const entry = new Entry(namesStream.read(i * 8,(i + 1) * 8));
            if(entry.getPropertyNameIdentifierOrOffsetOrChecksum() === crcOrPropertyIdentifier) {
                return 0x8000 + entry.getPropertyIndex();
            }
        }
        return null;
    }

    guidStream(): GUIDStream {
        return new GUIDStream(this.storage.findChild(directoryEntry => directoryEntry.getDirectoryEntryName() === GUIDStream.STREAM_NAME));
    }

    entryStream(): EntryStream {
        return new EntryStream(this.storage.findChild(directoryEntry => directoryEntry.getDirectoryEntryName() === EntryStream.STREAM_NAME));
    }

    propertyNames(): (PropertyNameLID|PropertyNameString)[] {
        const result: (PropertyNameLID|PropertyNameString)[] = [];
        this.entryStream().entries().forEach(entry => {
            const propertySet = PropertySet.forUUID(entry.getGuid(this.guidStream()));
            if (entry.isNumeric()) {
                result.push(new PropertyNameLID(propertySet, entry.getPropertyNameIdentifierOrOffsetOrChecksum(),  new UnsupportedPropertyType(-1, "Unknown")));
            } else {
                const propertyName = this.stringStream().getPropertyNameAt(entry.getPropertyNameIdentifierOrOffsetOrChecksum());
                result.push(new PropertyNameString(propertySet, propertyName, new UnsupportedPropertyType(-1, "Unknown")));
            }
        });
        return result;
    }

    stringStream(): StringStream {
        return new StringStream(this.storage.findChild(directoryEntry => directoryEntry.getDirectoryEntryName() === StringStream.STREAM_NAME));
    }
}