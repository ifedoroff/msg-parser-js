import {StreamDirectoryEntry} from "compound-binary-file-js";
import UUID from "pure-uuid";
import {PropertySet} from "../property/PropertySet";
import {uuidFromByteLE} from "../utils";

export class GUIDStream {

    public static readonly STREAM_NAME = "__substg1.0_00020102";
    public static readonly MAGICAL_SHIFT_INSIDE_STREAM = 3;
    public static readonly GUID_LENGTH = 16;

    private stream: StreamDirectoryEntry;

    constructor(stream: StreamDirectoryEntry) {
        this.stream = stream;
    }

    getGuidAt(index: number): UUID {
        if(index === 1) {
            return PropertySet.PS_MAPI.id;
        } else if(index === 2) {
            return PropertySet.PUBLIC_STRINGS.id;
        } else {
            return uuidFromByteLE(this.getGuidBytes(index));
        }
    }

    getGuidBytes(index: number): number[] {
        if(index === 1 || index === 2) {
            throw new Error("Not implemented property type: PS_MAPI or PS_PUBLIC_STRINGS (" + index + ")");
        }
        const position = index - GUIDStream.MAGICAL_SHIFT_INSIDE_STREAM;
        return this.stream.read(position * GUIDStream.GUID_LENGTH, (position + 1) * GUIDStream.GUID_LENGTH);
    }
    getIndexFor(uid: UUID): number {
        for(let i = 3; i < 3 + this.stream.getStreamSize() / 16; i++) {
            const bytes = this.getGuidBytes(i);
            if(uid.equal(uuidFromByteLE(bytes))) {
                return i;
            }
        }
        return -1;
    }
}