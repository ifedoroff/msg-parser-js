import {PropertyTag} from "../PropertyTag";
import {MessageStorage} from "../../MessageStorage";

export abstract class PropertyType<T> {

    public readonly id: number;
    public readonly name: string;

    protected constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    abstract resolveValue(container: MessageStorage, propertyTag: PropertyTag): T;

}