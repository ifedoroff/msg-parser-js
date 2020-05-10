import {StreamDirectoryEntry} from "compound-binary-file-js";
import {PropertyInfo} from "./PropertyInfo";
import {PropertyTag} from "./PropertyTag";

export abstract class PropertiesStream {

    public static readonly STREAM_NAME = "__properties_version1.0";
    protected readonly stream: StreamDirectoryEntry;
    private headerLength: number;

    protected constructor(stream: StreamDirectoryEntry, headerLength: number) {
        this.stream = stream;
        this.headerLength = headerLength;
    }

    properties(): PropertyInfo[] {
        const data = this.stream.read(this.headerLength, this.stream.getStreamSize());
        const result = [];
        for(let i = 0; i < data.length / 16; i ++) {
            result.push(new PropertyInfo(data.slice(i * 16, (i + 1) * 16)));
        }
        return result;
    }

    getProperty(tag: PropertyTag): PropertyInfo {
        return this.properties().find(propertyInfo => PropertyTag.equal(propertyInfo.propertyTag(), tag));
    }

    findProperty(tag: PropertyTag) {
        return this.properties().find(propertyInfo => PropertyTag.equal(propertyInfo.propertyTag(), tag));
    }

}
