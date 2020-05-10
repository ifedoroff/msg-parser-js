import {PropertiesStream} from "./PropertiesStream";
import {StreamDirectoryEntry} from "compound-binary-file-js";
import * as Long from "long"

export class RootStoragePropertyStream extends PropertiesStream {
    public static readonly HEADER_LENGTH = 32;
    private readonly header: any;

    constructor(stream: StreamDirectoryEntry) {
        super(stream, RootStoragePropertyStream.HEADER_LENGTH);
        const data = stream.read(0, 32)
        this.header = {
            nextRecipientId: () => Long.fromBytesLE(data.slice(8, 12)).toNumber(),
            nextAttachmentId: () => Long.fromBytesLE(data.slice(12, 16)).toNumber(),
            recipientCount: () => Long.fromBytesLE(data.slice(16, 20)).toNumber(),
            attachmentCount: () => Long.fromBytesLE(data.slice(20, 24)).toNumber()
        }
    }

}