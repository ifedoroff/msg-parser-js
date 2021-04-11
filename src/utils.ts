import UUID from "pure-uuid";
import {initializedWidth} from "compound-binary-file-js";
import Long from "long";

const DIFF_BETWEEN_EPOCHS_1970_1601 = 11644473599996;

export function uuidFromByteLE(sourceBytes: number[]):UUID {
    const mostSignificant = initializedWidth(8, 0);
    mostSignificant[0] = sourceBytes[3];
    mostSignificant[1] = sourceBytes[2];
    mostSignificant[2] = sourceBytes[1];
    mostSignificant[3] = sourceBytes[0];
    mostSignificant[4] = sourceBytes[5];
    mostSignificant[5] = sourceBytes[4];
    mostSignificant[6] = sourceBytes[7];
    mostSignificant[7] = sourceBytes[6];
    const leastSignificant = [];
    leastSignificant.push(...sourceBytes.slice(8));
    mostSignificant.push(...leastSignificant);
    return new UUID().import(mostSignificant);
}

export function uuidToBytesLE(uuid: UUID): number[] {
    const bytes = uuid.export();
    const mostSignificantBits = bytes.slice(0, 8);
    const leastSignificantBits = bytes.slice(8);
    [mostSignificantBits[0], mostSignificantBits[3]] = [mostSignificantBits[3], mostSignificantBits[0]];
    [mostSignificantBits[1], mostSignificantBits[2]] = [mostSignificantBits[2], mostSignificantBits[1]];
    [mostSignificantBits[4], mostSignificantBits[5]] = [mostSignificantBits[5], mostSignificantBits[4]];
    [mostSignificantBits[6], mostSignificantBits[7]] = [mostSignificantBits[7], mostSignificantBits[6]];
    mostSignificantBits.push(...leastSignificantBits);
    return mostSignificantBits;
}

export function toTime(bytes: number[]): Date {
    return new Date(Long.fromBytesLE(bytes).toNumber() / 10000 - DIFF_BETWEEN_EPOCHS_1970_1601);
}

export function toHex(val: number, toUpper: boolean = false, maxDigits: number = 4) {
    let result = Long.fromValue(val).toString(16);
    if(result.length < maxDigits) {
        result = "0".repeat(maxDigits - result.length) + result;
    } else if(result.length > maxDigits) {
        throw new Error("Expect not more then " + maxDigits + "-digit hex number: " + result);
    }
    return toUpper ? result.toUpperCase() : result;
}

export function fromHex(str: string): number {
    return Long.fromString(str.toLowerCase(), false, 16).toInt();
}