import { PropertyMultipleType } from "./PropertyMultipleType";
import {MessageStorage} from "../../MessageStorage";
import {PropertyTag} from "../PropertyTag";
import {PropertyType} from "./PropertyType";

export class UnsupportedPropertyType<U> extends PropertyType<U> {

    constructor(id: number, name: string) {
        super(id, name);
    }

    resolveValue(container: MessageStorage,  propertyTag: PropertyTag): U {
        throw new Error("Unsupported property type");
    }
}