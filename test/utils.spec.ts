import UUID from "pure-uuid";
import {uuidFromByteLE, uuidToBytesLE} from "../src/utils";

describe('', () => {
    it('', () => {
        const uuid = new UUID("00020386-0000-0000-C000-000000000046");
        console.log(uuidFromByteLE(uuidToBytesLE(uuid)).equal(uuid));
        // console.log(.equal(new UUID("00020386-0000-0000-C000-000000000046")));
    })
});