import {PropertyType} from "./PropertyType";

export abstract class PropertyMultipleType<U> extends PropertyType<U[]> {
    protected constructor(id: number, name: string) {
        super(id, name);
    }
}