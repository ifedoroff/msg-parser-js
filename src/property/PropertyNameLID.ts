import {PropertySet} from "./PropertySet";
import {toHex} from "../utils";
import {PropertyType} from "./property_type/PropertyType";

export class PropertyNameLID {

    readonly propertySet: PropertySet;
    readonly propertyLID: number;
    readonly propertyType: PropertyType<any>;

    constructor(propertySet: PropertySet, propertyLID: number, propertyType: PropertyType<any>) {
        this.propertySet = propertySet;
        this.propertyLID = propertyLID;
        this.propertyType = propertyType;
    }

    toString(): string {
        return `0x${toHex(this.propertyLID, true, 4)} (prop set: ${this.propertySet})`
    }
}