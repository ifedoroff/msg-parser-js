import {PropertySet} from "./PropertySet";
import {PropertyType} from "./property_type/PropertyType";

export class PropertyNameString {

    readonly propertySet: PropertySet;
    readonly propertyName: string;
    readonly propertyType: PropertyType<any>;

    constructor(propertySet: PropertySet, propertyName: string, propertyType: PropertyType<any>) {
        this.propertySet = propertySet;
        this.propertyName = propertyName;
        this.propertyType = propertyType;
    }

    toString(): string {
        return `${this.propertyName} (prop set: ${this.propertySet})`;
    }
}