import {StreamDirectoryEntry, toUTF16String} from "compound-binary-file-js";
import * as Long from "long"

export class StringStream {
    public static readonly STREAM_NAME = "__substg1.0_00040102";
    private readonly stream: StreamDirectoryEntry;

    constructor(_this: StreamDirectoryEntry) {
        this.stream = _this;
    }

    getPropertyNameAt(startingOffset: number): string {
        const streamData = this.stream.getStreamData();
        const length = Long.fromBytesLE(streamData.slice(startingOffset, startingOffset + 4)).toNumber();
        const bytes = streamData.slice(startingOffset + 4, startingOffset + 4 + length);
        return toUTF16String(bytes);
    }
}