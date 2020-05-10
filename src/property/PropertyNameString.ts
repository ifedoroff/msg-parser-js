import {PropertySet} from "./PropertySet";

export class PropertyNameString {

    readonly propertySet: PropertySet;
    readonly propertyName: string;
    readonly propertyType: number;

    constructor(propertySet: PropertySet, propertyName: string, propertyTypeId: number) {
        this.propertySet = propertySet;
        this.propertyName = propertyName;
        this.propertyType = propertyTypeId;
    }
}