import {MessageStorage} from "./MessageStorage";
import {StorageDirectoryEntry} from "compound-binary-file-js";
import {Attachment} from "./Attachment";
import {EmbeddedMessage} from "./EmbeddedMessage";
import {propertyTypeForId} from "./property/property_type/PropertyTypes";
import {PidTagAttachMethod} from "./property/KnownProperties";
import {Recipient} from "./Recipient";
import {PropertyType} from "./property/property_type/PropertyType";
import {NamedPropertyMappingStorage} from "./nameid_mapping/NamedPropertyMappingStorage";

export abstract class AbstractMessage extends MessageStorage {

    protected constructor(storage: StorageDirectoryEntry, namedPropertyMappingStorage: NamedPropertyMappingStorage) {
        super(storage, namedPropertyMappingStorage);
    }

    public attachments(): Attachment[] {
        return this.underlyingDirectoryEntry().storages().filter(storageDirectoryEntry => storageDirectoryEntry.getDirectoryEntryName().startsWith(MessageStorage.ATTACHMENT_STORAGE_PREFIX))
            .filter(storageDirectoryEntry => storageDirectoryEntry.storages().filter(substorage => substorage.getDirectoryEntryName() === MessageStorage.INTERNAL_STORAGE_NAME).length === 0)
            .map(directoryEntry => new Attachment(directoryEntry, this.namedPropertyMappingStorage));
    }

    recipients() {
        return this.underlyingDirectoryEntry().storages().filter(storageDirectoryEntry => storageDirectoryEntry.getDirectoryEntryName().startsWith(Recipient.RECIPIENT_STORAGE_PREFIX))
            .map(directoryEntry => new Recipient(directoryEntry, this.namedPropertyMappingStorage));
    }
}