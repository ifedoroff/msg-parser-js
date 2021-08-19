import * as fs from 'fs';
import * as path from 'path';
import {CompoundFile} from "compound-binary-file-js";
import {Msg} from "../src/Msg";
import {PidTagAttachFilename, PidTagSubject} from "../src/property/KnownProperties";
import * as os from "os";
import {toHex} from "../src/utils";
import {PropertyNameLID, PtypString8} from "../src";

describe('usage example', () => {
   it('extract attachments from an email', () => {
        fs.readFile(path.join(__dirname, "Top level email.msg"), (err, data) => {
            const compoundFile = CompoundFile.fromBytes([].slice.call(new Uint8Array(data)));
            const msg = Msg.fromUint8Array(data);
            msg.attachments()
                .forEach(attachment => {
                    let subject = "";
                    let fileNameProperty = attachment.getProperty(PidTagAttachFilename);
                    if(!!fileNameProperty) {
                        subject = attachment.getProperty(PidTagAttachFilename);
                    } else {
                        subject = "Untitled";
                    }

                    const outputFolder = path.join(os.tmpdir(), "test_msg_parser");
                    const outputFileName = path.join(outputFolder, subject.replace("[\\/:]", "_"));
                    console.log(outputFileName);
                    if(!fs.existsSync(outputFolder)) {
                        fs.mkdirSync(outputFolder);
                    }
                    fs.writeFile(outputFileName, new Uint8Array(attachment.content()), () => {

                    });
                });
        })
    });

    it('extract embedded messages from an email', () => {
        fs.readFile(path.join(__dirname, "Top level email.msg"), (err, data) => {
            const compoundFile = CompoundFile.fromBytes([].slice.call(new Uint8Array(data)));
            const msg = new Msg(compoundFile);
            msg.embeddedMessages()
                .forEach(embeddedMessage => {
                    const internalStorage = embeddedMessage.internalStorage();
                    let subject = "";
                    if(internalStorage.propertiesStream().findProperty(PidTagSubject) !== undefined) {
                        subject = internalStorage.getProperty(PidTagSubject);
                    } else if(embeddedMessage.propertiesStream().findProperty(PidTagAttachFilename) !== undefined) {
                        subject = embeddedMessage.getProperty(PidTagAttachFilename);
                    } else {
                        subject = "Untitled";
                    }


                    const outputFolder = path.join(os.tmpdir(), "test_msg_parser");
                    const outputFileName = path.join(outputFolder, subject.replace("[\\/:]", "_") + ".msg");
                    console.log(outputFileName);
                    if(!fs.existsSync(outputFolder)) {
                        fs.mkdirSync(outputFolder);
                    }
                    fs.writeFile(outputFileName, new Uint8Array(msg.extractEmbeddedMessage(embeddedMessage).asBytes()), () => {
                    });
                });
        })
    });

    it('traversing all properties available in a storage', () => {
        const data = fs.readFileSync(path.join(__dirname, "Top level email.msg"));
        const compoundFile = CompoundFile.fromBytes([].slice.call(new Uint8Array(data)));
        const msg = new Msg(compoundFile);


        // msg.propertiesStream().properties().forEach(propertyInfo => console.log((propertyInfo.propertyId() - 0x8000) + ': 0x' + toHex(propertyInfo.propertyId())));
        // Print property values
        msg.propertiesStream().properties().filter(propertyInfo => propertyInfo.propertyTag().propertyType.id === new PtypString8().id)
            .forEach(propertyInfo => console.log(propertyInfo.propertyTag() + ": " + msg.getProperty(propertyInfo.propertyTag())));
    });

    it('traversing available named properties for a MSG file', () => {
        fs.readFile(path.join(__dirname, "Top level email.msg"), (err, data) => {
            const compoundFile = CompoundFile.fromBytes([].slice.call(new Uint8Array(data)));
            const msg = new Msg(compoundFile);
            let namedPropertyMappingStorage = msg.getNamedPropertyMappingStorage();
            namedPropertyMappingStorage.propertyNames().forEach(prop => {
                if(prop instanceof PropertyNameLID) {
                    console.log(`${prop.propertyLID} / ${prop.propertySet} / ${prop.propertyType.name}`);
                } else {
                    console.log(`${prop.propertyName} / ${prop.propertySet} / ${prop.propertyType.name}`);
                }
            });
        })
    })
});