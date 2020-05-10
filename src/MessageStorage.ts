import {StorageDirectoryEntry, StreamDirectoryEntry} from "compound-binary-file-js";
import {PropertiesStream} from "./property/PropertiesStream";

export abstract class MessageStorage {

    public static readonly VALUE_STREAM_PREFIX = "__substg1.0_";
    public static readonly INTERNAL_STORAGE_NAME = "__substg1.0_3701000D";
    public static readonly ATTACHMENT_STORAGE_PREFIX = "__attach_version1.0";
    protected readonly storage: StorageDirectoryEntry;

    protected constructor(storage: StorageDirectoryEntry) {
        this.storage = storage;
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

}