import {StreamDirectoryEntry} from "compound-binary-file-js";
import {Entry} from "./Entry";

export class EntryStream {

    public static readonly STREAM_NAME = "__substg1.0_00030102";
    private stream: StreamDirectoryEntry;

    constructor(_this: StreamDirectoryEntry) {
        this.stream = _this;
    }

    getEntry(index: number): Entry {
        return new Entry(this.stream.read(index * 8, (index + 1) * 8));
    }

    entries(): Entry[] {
        const entries: Entry[] = [];
        for (let i = 0; i < this.stream.getStreamSize() / 8; i++) {
            entries.push(this.getEntry(i));
        }
        return entries;
    }

}