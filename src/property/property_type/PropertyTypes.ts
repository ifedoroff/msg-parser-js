import {PtypInteger16} from "./PtypInteger16";
import {PtypInteger32} from "./PtypInteger32";
import {PtypFloating32} from "./PtypFloating32";
import {PtypFloating64} from "./PtypFloating64";
import {PtypBoolean} from "./PtypBoolean";
import {PtypCurrency} from "./PtypCurrency";
import {PtypFloatingTime} from "./PtypFloatingTime";
import {PtypTime} from "./PtypTime";
import {PtypInteger64} from "./PtypInteger64";
import {PtypErrorCode} from "./PtypErrorCode";
import {PtypString} from "./PtypString";
import {PtypBinary} from "./PtypBinary";
import {PtypString8} from "./PtypString8";
import {PtypGuid} from "./PtypGuid";
import {PtypObject} from "./PtypObject";
import {PtypMultipleInteger16} from "./PtypMultipleInteger16";
import {PtypMultipleInteger32} from "./PtypMultipleInteger32";
import {PtypMultipleFloating32} from "./PtypMultipleFloating32";
import {PtypMultipleFloating64} from "./PtypMultipleFloating64";
import {PtypMultipleBoolean} from "./PtypMultipleBoolean";
import {PtypMultipleCurrency} from "./PtypMultipleCurrency";
import {PtypMultipleFloatingTime} from "./PtypMultipleFloatingTime";
import {PtypMultipleTime} from "./PtypMultipleTime";
import {PtypMultipleInteger64} from "./PtypMultipleInteger64";
import {PtypMultipleString} from "./PtypMultipleString";
import {PtypMultipleBinary} from "./PtypMultipleBinary";
import {PtypMultipleString8} from "./PtypMultipleString8";
import {PtypMultipleGuid} from "./PtypMultipleGuid";
import {PropertyType} from "./PropertyType";

interface PropertyTypes<T extends PropertyType<any>> {
    [key: number]: T;
}

export const PROPERTY_TYPES:PropertyTypes<any> = {
    0x0002: new PtypInteger16(),
    0x0003: new PtypInteger32(),
    0x0004: new PtypFloating32(),
    0x0005: new PtypFloating64(),
    0x000B: new PtypBoolean(),
    0x0006: new PtypCurrency(),
    0x0007: new PtypFloatingTime(),
    0x0040: new PtypTime(),
    0x0014: new PtypInteger64(),
    0x000A: new PtypErrorCode(),
    0x001F: new PtypString(),
    0x0102: new PtypBinary(),
    0x001E: new PtypString8(),
    0x0048: new PtypGuid(),
    0x000D: new PtypObject(),
    0x1002: new PtypMultipleInteger16(),
    0x1003: new PtypMultipleInteger32(),
    0x1004: new PtypMultipleFloating32(),
    0x1005: new PtypMultipleFloating64(),
    0x100B: new PtypMultipleBoolean(),
    0x1006: new PtypMultipleCurrency(),
    0x1007: new PtypMultipleFloatingTime(),
    0x1040: new PtypMultipleTime(),
    0x1014: new PtypMultipleInteger64(),
    0x101F: new PtypMultipleString(),
    0x1102: new PtypMultipleBinary(),
    0x101E: new PtypMultipleString8(),
    0x1048: new PtypMultipleGuid()
};

export function propertyTypeForId<U extends PropertyType<any>>(id: number): U {
    return PROPERTY_TYPES[id] as U;
}