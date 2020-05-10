import {MessageStorage} from "./MessageStorage";
import {StorageDirectoryEntry, StreamDirectoryEntry} from "compound-binary-file-js";
import {PropertiesStream} from "./property/PropertiesStream";
import {SimplePropertiesStream} from "./property/SimplePropertiesStream";

export class Recipient extends MessageStorage {

    public static readonly RECIPIENT_STORAGE_PREFIX = "__recip_version1.0";

    constructor(directoryEntry: StorageDirectoryEntry) {
        super(directoryEntry);
    }

    protected createPropertiesStream(stream: StreamDirectoryEntry): PropertiesStream {
        return new SimplePropertiesStream(stream, 8);
    }
}