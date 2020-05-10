import {PropertiesStream} from "./PropertiesStream";
import {StreamDirectoryEntry} from "compound-binary-file-js";

export class SimplePropertiesStream extends PropertiesStream {
    constructor(stream: StreamDirectoryEntry, headerLength: number) {
        super(stream, headerLength);
    }
}