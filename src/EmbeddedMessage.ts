import {MessageStorage} from "./MessageStorage";
import {StorageDirectoryEntry, StreamDirectoryEntry} from "compound-binary-file-js";
import {PropertiesStream} from "./property/PropertiesStream";
import {SimplePropertiesStream} from "./property/SimplePropertiesStream";
import {InternalStorage} from "./InternalStorage";

export class EmbeddedMessage extends MessageStorage {

    public static readonly ATTACH_METHOD_CUSTOM = 0x0006;

    constructor(directoryEntry: StorageDirectoryEntry) {
        super(directoryEntry);
    }

    protected createPropertiesStream(stream: StreamDirectoryEntry): PropertiesStream {
        return new SimplePropertiesStream(stream, 24);
    }

    internalStorage(): InternalStorage {
        return new InternalStorage(this.storage.findChild(directoryEntry => directoryEntry.getDirectoryEntryName() === MessageStorage.INTERNAL_STORAGE_NAME));
    }

}