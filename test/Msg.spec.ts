import fs from "fs";
import path from "path";
import {CompoundFile} from "compound-binary-file-js";
import {Msg, PropertyNameLID, PropertyNameString} from "../src";
import { expect } from "chai";
import {toHex} from "../src/utils";

describe('test retrieval of Named Properties', () => {
    it('property name by property id retrieval should match property id by property name retrieval', () => {
        // const data = fs.readFileSync(path.join(__dirname, "Top level email.msg"));
        const data = fs.readFileSync(path.join("c:\\Users\\Ilya Fedorov\\Downloads\\test emails\\", "test Doc Export Email Doc-01.msg"));
        const compoundFile = CompoundFile.fromBytes([].slice.call(new Uint8Array(data)));
        const msg = new Msg(compoundFile);
        var namedPropertyMappingStorage = msg.getNamedPropertyMappingStorage();
        msg.propertiesStream().properties().forEach(propertyInfo => {
            let propertyTag = propertyInfo.propertyTag();
            if(propertyTag.isNamed()) {
                // Retrieve property name by property id
                let namedProperty = namedPropertyMappingStorage.getNamedPropertyByPropertyTag(propertyTag);
                // Retrieve property id by property name
                expect(namedPropertyMappingStorage.getPropertyTagByPropertyName(namedProperty).propertyId).eq(propertyTag.propertyId);
            }
        })
    });

});