import {PropertyType} from "./PropertyType";
import {PropertyTag} from "../PropertyTag";
import {MessageStorage} from "../../MessageStorage";
import {toTime} from "../../utils";

export class PtypTime extends PropertyType<Date> {

    constructor() {
        super(0x0040, "PtypTime");
    }

    resolveValue(container: MessageStorage, propertyTag: PropertyTag): Date {
        return toTime(container.propertiesStream().properties().find(propertyInfo => PropertyTag.equal(propertyInfo.propertyTag(), propertyTag)).data());
    }

}