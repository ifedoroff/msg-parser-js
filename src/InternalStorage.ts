import {PropertiesStream} from "./property/PropertiesStream";
import {StreamDirectoryEntry, StorageDirectoryEntry} from "compound-binary-file-js";
import {AbstractMessage} from "./AbstractMessage";
import {SimplePropertiesStream} from "./property/SimplePropertiesStream";
import {EmbeddedMessage} from "./EmbeddedMessage";
import {Msg} from "./Msg";

export class InternalStorage extends AbstractMessage {

    constructor(directoryEntry: StorageDirectoryEntry) {
        super(directoryEntry);
    }

    protected createPropertiesStream(stream: StreamDirectoryEntry): PropertiesStream {
        return new SimplePropertiesStream(stream, 24);
    }


    public embeddedMessages(): EmbeddedMessage[] {
        return Msg.embeddedMessages(this);
    }

}