import {AbstractMessage} from "./AbstractMessage";
import {CompoundFile, StorageDirectoryEntry, DirectoryEntry, StreamDirectoryEntry, initializedWidth} from "compound-binary-file-js";
import {PropertiesStream} from "./property/PropertiesStream";
import {NamedPropertyMappingStorage} from "./nameid_mapping/NamedPropertyMappingStorage";
import {EmbeddedMessage} from "./EmbeddedMessage";
import {RootStoragePropertyStream} from "./property/RootStoragePropertyStream";
import {MessageStorage} from "./MessageStorage";
import {propertyTypeForId} from "./property/property_type/PropertyTypes";
import {PropertyType} from "./property/property_type/PropertyType";
import {PidTagAttachMethod} from "./property/KnownProperties";
import {PropertyTag} from "./property/PropertyTag";

export class Msg extends AbstractMessage {

    public static readonly ATTACHMENT_STORAGE_PREFIX = "__attach_version1.0";

    private compoundFile: CompoundFile;

    constructor(compoundFile: CompoundFile) {
        super(compoundFile.getRootStorage(), Msg.namedPropertyMappingStorage(compoundFile.getRootStorage()));
        this.compoundFile = compoundFile;
    }

    static fromBytes(bytes: number[]): Msg {
        return new Msg(CompoundFile.fromBytes(bytes));
    }

    static fromUint8Array(bytes: Uint8Array): Msg {
        return new Msg(CompoundFile.fromUint8Array(new Uint8Array(bytes)));
    }

    protected createPropertiesStream(stream: StreamDirectoryEntry): PropertiesStream {
        return new RootStoragePropertyStream(stream);
    }

    public getNamedPropertyMappingStorage(): NamedPropertyMappingStorage {
        return Msg.namedPropertyMappingStorage(this.underlyingDirectoryEntry());
    }

    private static namedPropertyMappingStorage(storageDirectoryEntry: StorageDirectoryEntry): NamedPropertyMappingStorage {
        return new NamedPropertyMappingStorage(storageDirectoryEntry.findChild(directoryEntry => directoryEntry.getDirectoryEntryName().toUpperCase() === NamedPropertyMappingStorage.STORAGE_NAME.toUpperCase()));
    }

    asBytes(): number[] {
        return this.compoundFile.asBytes();
    }

    extractEmbeddedMessage(embeddedMessage: EmbeddedMessage): Msg {
        const nameidmapping: StorageDirectoryEntry = this.underlyingDirectoryEntry().findChild((directoryEntry => NamedPropertyMappingStorage.STORAGE_NAME.toUpperCase() === directoryEntry.getDirectoryEntryName().toUpperCase()));
        const copy = new CompoundFile();
        const nameidmappingCopy = copy.getRootStorage().addStorage(NamedPropertyMappingStorage.STORAGE_NAME);
        nameidmapping.eachChild(this.copyConsumer(nameidmappingCopy));
        embeddedMessage.internalStorage().underlyingDirectoryEntry().eachChild(this.copyConsumer(copy.getRootStorage()));
        const propertiesStream: StreamDirectoryEntry = copy.getRootStorage().findChild(directoryEntry => directoryEntry.getDirectoryEntryName() === PropertiesStream.STREAM_NAME);
        const streamData = propertiesStream.getStreamData();
        const adjustedData = [];
        adjustedData.push(...streamData.slice(0, 24));
        adjustedData.push(...initializedWidth(8, 0));
        adjustedData.push(...streamData.slice(24, streamData.length));
        propertiesStream.setStreamData(adjustedData);
        return new Msg(copy);
    }

    private copyConsumer(parent: StorageDirectoryEntry): (p: DirectoryEntry) => void {
        const me = this;
        return (directoryEntry: DirectoryEntry) => {
            let copy: DirectoryEntry = null;
            if(directoryEntry instanceof StorageDirectoryEntry) {
                copy = parent.addStorage(directoryEntry.getDirectoryEntryName());
                directoryEntry.eachChild(me.copyConsumer(copy as StorageDirectoryEntry));
            } else {
                copy = parent.addStream(directoryEntry.getDirectoryEntryName(), (directoryEntry as StreamDirectoryEntry).getStreamData());
            }
            copy.setCLSID(directoryEntry.getCLSID());
            copy.setStateBits(directoryEntry.getStateBits());
            copy.setCreationTime(directoryEntry.getCreationTime());
            copy.setModifiedTime(directoryEntry.getModifiedTime());
        }
    }

    public embeddedMessages(): EmbeddedMessage[] {
        return Msg.embeddedMessages(this, this.namedPropertyMappingStorage);
    }

    public static embeddedMessages(messageStorage: MessageStorage, namedPropertyMappingStorage: NamedPropertyMappingStorage): EmbeddedMessage[] {
        return messageStorage.underlyingDirectoryEntry().storages().filter(storageDirectoryEntry => storageDirectoryEntry.getDirectoryEntryName().startsWith(MessageStorage.ATTACHMENT_STORAGE_PREFIX))
            .filter(storageDirectoryEntry => storageDirectoryEntry.storages().filter(substorage => substorage.getDirectoryEntryName() === EmbeddedMessage.INTERNAL_STORAGE_NAME).length === 1)
            .map(directoryEntry => new EmbeddedMessage(directoryEntry, namedPropertyMappingStorage))
            .filter(embeddedMsg => PidTagAttachMethod.propertyType.resolveValue(embeddedMsg, PidTagAttachMethod) !== EmbeddedMessage.ATTACH_METHOD_CUSTOM);
    }
}