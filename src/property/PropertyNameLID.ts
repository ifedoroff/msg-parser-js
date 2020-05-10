import {PropertySet} from "./PropertySet";

export class PropertyNameLID {

    readonly propertySet: PropertySet;
    readonly propertyLID: number;
    readonly propertyType: number;

    constructor(propertySet: PropertySet, propertyLID: number, propertyTypeId: number) {
        this.propertySet = propertySet;
        this.propertyLID = propertyLID;
        this.propertyType = propertyTypeId;
    }
}