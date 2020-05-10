import * as fs from 'fs';
import * as path from 'path';
import {CompoundFile} from "compound-binary-file-js";
import {Msg} from "../src/Msg";
import {PidTagAttachFilename, PidTagSubject} from "../src/property/KnownProperties";
import * as os from "os";
import {propertyTypeForId} from "../src/property/property_type/PropertyTypes";

describe('usage example', () => {
   it('extract attachments from an email', () => {
        fs.readFile(path.join(__dirname, "Top level email.msg"), (err, data) => {
            const compoundFile = CompoundFile.fromBytes([].slice.call(new Uint8Array(data)));
            const msg = Msg.fromUint8Array(data);
            msg.attachments()
                .forEach(attachment => {
                    let subject = "";
                    let fileNameProperty = attachment.propertiesStream().findProperty(PidTagAttachFilename);
                    if(!!fileNameProperty) {
                        subject = propertyTypeForId(PidTagAttachFilename.propertyType).resolveValue(attachment, PidTagAttachFilename);
                    } else {
                        subject = "Untitled";
                    }

                    const outputFileName = path.join(os.tmpdir(), subject.replace("[\\/:]", "_"));
                    console.log(outputFileName);
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
                        subject = propertyTypeForId(PidTagSubject.propertyType).resolveValue(internalStorage, PidTagSubject);
                    } else if(embeddedMessage.propertiesStream().findProperty(PidTagAttachFilename) !== undefined) {
                        subject = propertyTypeForId(PidTagAttachFilename.propertyType).resolveValue(embeddedMessage, PidTagAttachFilename);
                    } else {
                        subject = "Untitled";
                    }


                    const outputFileName = path.join(os.tmpdir(), subject.replace("[\\/:]", "_") + ".msg");
                    console.log(outputFileName);
                    fs.writeFile(outputFileName, new Uint8Array(msg.extractEmbeddedMessage(embeddedMessage)), () => {
                        fs.readFile(outputFileName, (err, dataCopy) => {
                            const compoundFile = CompoundFile.fromBytes([].slice.call(new Uint8Array(dataCopy)));
                            const msg = new Msg(compoundFile);
                            console.log();
                        });
                    });
                });
        })
    });
});