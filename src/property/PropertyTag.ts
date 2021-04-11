import {NamedPropertyMappingStorage} from "../nameid_mapping/NamedPropertyMappingStorage";
import Long from "long";
import {toHex} from "../utils";
import {PropertyType} from "./property_type/PropertyType";

export class PropertyTag {

    public static readonly MV_PROPERTY_TYPE_BASE = 0x1000;
    public readonly propertyId: number;
    public readonly propertyType: PropertyType<any>;

    constructor(propertyId: number, propertyType: PropertyType<any>) {
        this.propertyId = propertyId;
        this.propertyType = propertyType;
    }

    isNamed(): boolean {
        return (this.propertyId & NamedPropertyMappingStorage.NAMED_PROPERTY_ID_BASE) === NamedPropertyMappingStorage.NAMED_PROPERTY_ID_BASE;
    }

    isMultiValued(): boolean {
        return (this.propertyType.id & PropertyTag.MV_PROPERTY_TYPE_BASE) === PropertyTag.MV_PROPERTY_TYPE_BASE;
    }

    static equal(tag1: PropertyTag, tag2:PropertyTag): boolean {
        if(tag1 == null || tag2 == null) {
            return false;
        } else {
            return tag1.propertyId === tag2.propertyId &&
                tag1.propertyType.id === tag2.propertyType.id;
        }
    }

    toString(): any {
        return toHex(this.propertyId).toUpperCase() + toHex(this.propertyType.id).toUpperCase();
    }

}