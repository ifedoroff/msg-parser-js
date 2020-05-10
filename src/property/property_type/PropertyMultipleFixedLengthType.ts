import {PropertyMultipleType} from "./PropertyMultipleType";
import {MessageStorage} from "../../MessageStorage";
import {PropertyTag} from "../PropertyTag";

export abstract class PropertyMultipleFixedLengthType<U> extends PropertyMultipleType<U> {

    private readonly valueLength: number;

    protected constructor(id: number, name: string, valueLength: number) {
        super(id, name);
        this.valueLength = valueLength;
    }

    resolveValue(container: MessageStorage, propertyTag: PropertyTag): U[] {
        const stream = container.findByName(MessageStorage.VALUE_STREAM_PREFIX + propertyTag.toString());
        const result = [];
        for(let i = 0; i < stream.getStreamSize() / this.valueLength; i++) {
            result.push(this.resolveSingleValue(stream.read(i * this.valueLength, (i + 1) * this.valueLength)));
        }
        return result;
    }

    protected abstract resolveSingleValue(bytes: number[]): U;
}