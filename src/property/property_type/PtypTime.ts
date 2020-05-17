import {PropertyType} from "./PropertyType";
import {PropertyTag} from "../PropertyTag";
import {MessageStorage} from "../../MessageStorage";
import {toTime} from "../../utils";

export class PtypTime extends PropertyType<Date> {

    constructor() {
        super(0x0040, "PtypTime");
    }

    resolveValue(container: MessageStorage, propertyTag: PropertyTag): Date {
        const property = container.propertiesStream().properties().find(propertyInfo => PropertyTag.equal(propertyInfo.propertyTag(), propertyTag));
        if(property === undefined) {
            return undefined;
        } else {
            return toTime(property.data());
        }
    }

}