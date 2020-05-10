import {PropertyMultipleType} from "./PropertyMultipleType";
import {PropertyTag} from "../PropertyTag";
import {MessageStorage} from "../../MessageStorage";

export abstract class PropertyMultipleVariableLengthType<U> extends PropertyMultipleType<U> {

    protected constructor(id: number, name: string) {
        super(id, name);
    }

    resolveValue(container: MessageStorage, propertyTag: PropertyTag): U[] {
        return container.streams().filter(streamDirectoryEntry => streamDirectoryEntry.getDirectoryEntryName().startsWith(MessageStorage.VALUE_STREAM_PREFIX + propertyTag.toString() + "-"))
            .map(stream => stream.getStreamData()).map(data => this.resolveSingleValue(data));
    }

    protected abstract resolveSingleValue(bytes: number[]): U;
}