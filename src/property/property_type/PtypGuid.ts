import {PropertyType} from "./PropertyType";
import UUID from "pure-uuid";
import {MessageStorage} from "../../MessageStorage";
import {PropertyTag} from "../PropertyTag";
import {uuidFromByteLE} from "../../utils";

export class PtypGuid extends PropertyType<UUID>{

    constructor() {
        super(0x0048, "PtypGuid");
    }
    resolveValue(container: MessageStorage, propertyTag: PropertyTag): UUID {
        const streamName = MessageStorage.VALUE_STREAM_PREFIX + propertyTag.toString();
        return uuidFromByteLE(container.streams().find(streamDirectoryEntry => streamDirectoryEntry.getDirectoryEntryName().toUpperCase() === streamName.toUpperCase()).read(0, 16));
    }

}