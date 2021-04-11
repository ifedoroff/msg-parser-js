import UUID from "pure-uuid";
import {fromHex, uuidFromByteLE, uuidToBytesLE, toHex} from "../src/utils";
import {expect} from "chai";

describe('', () => {
    it('', () => {
        const uuid = new UUID("00020386-0000-0000-C000-000000000046");
        console.log(uuidFromByteLE(uuidToBytesLE(uuid)).equal(uuid));
        // console.log(.equal(new UUID("00020386-0000-0000-C000-000000000046")));
    })
    it('test to/from hex functions', () => {
        expect(fromHex(toHex(0x8000, true, 4))).eq(0x8000);
        expect(fromHex(toHex(0x8000, true, 8))).eq(0x8000);
        expect(fromHex(toHex(0x10000000, true, 8))).eq(0x10000000);
        expect(() => fromHex(toHex(0x110000000, true, 8))).to.throw();
    })
});