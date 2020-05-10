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
            return String(entry.getPropertyNameIdentifierOrOffsetOrChecksum());
        } else {
            return entry.getPropertyName(this.stringStream());
        }
    }

    getPropertyTagByPropertyName(propertyNameString: PropertyNameString): PropertyTag {
        const crcOrPropertyIdentifier = CRC.crc32(toUTF16Bytes(propertyNameString.propertyName));
        const propertyTag = this.getPropertyTagForNamedProperty(crcOrPropertyIdentifier, propertyNameString.propertySet.id, propertyNameString.propertyType);
        if(propertyTag == null) {
            throw new Error("Unable to find property: " + propertyNameString.propertyName);
        } else {
            return propertyTag;
        }
    }

    getPropertyTagByPropertyNameLID(propertyNameLID: PropertyNameLID): PropertyTag {
        const propertyTag = this.getPropertyTagForNamedProperty(propertyNameLID.propertyLID, propertyNameLID.propertySet.id, propertyNameLID.propertyType);
        if(propertyTag == null) {
            throw new Error("Unable to find property: " + propertyNameLID.propertyLID);
        } else {
            return propertyTag;
        }
    }

    private getPropertyTagForNamedProperty(crcOrPropertyIdentifier: number, propertySetGuid: UUID, propertyType: number): PropertyTag {
        const guidIndex = this.guidStream().getIndexFor(propertySetGuid);
        const streamId = 0x1000 + (crcOrPropertyIdentifier ^ ((guidIndex << 1) | 1)) % 0x1F;
        const hexIdentifier = streamId << 16 | 0x00000102;
        const streamName = "__substg1.0_" + Long.fromValue(hexIdentifier).toString(16);
        const namesStream:StreamDirectoryEntry = this.storage.findChild(directoryEntry => directoryEntry.getDirectoryEntryName().toUpperCase() === streamName.toUpperCase());
        for(let i = 0; i < namesStream.getStreamSize() / 8; i++) {
            const entry = new Entry(namesStream.read(i * 8,(i + 1) * 8));
            if(entry.getPropertyNameIdentifierOrOffsetOrChecksum() === crcOrPropertyIdentifier) {
                return new PropertyTag(0x8000 + entry.getPropertyIndex(), propertyType);
            }
        }
        return null;
    }

    private guidStream(): GUIDStream {
        return new GUIDStream(this.storage.findChild(directoryEntry => directoryEntry.getDirectoryEntryName() === GUIDStream.STREAM_NAME));
    }

    private entryStream(): EntryStream {
        return new EntryStream(this.storage.findChild(directoryEntry => directoryEntry.getDirectoryEntryName() === EntryStream.STREAM_NAME));
    }

    private stringStream(): StringStream {
        return new StringStream(this.storage.findChild(directoryEntry => directoryEntry.getDirectoryEntryName() === StringStream.STREAM_NAME));
    }
}