import {MessageStorage} from "./MessageStorage";
import {StorageDirectoryEntry} from "compound-binary-file-js";
import {Attachment} from "./Attachment";
import {EmbeddedMessage} from "./EmbeddedMessage";
import {propertyTypeForId} from "./property/property_type/PropertyTypes";
import {PidTagAttachMethod} from "./property/KnownProperties";
import {Recipient} from "./Recipient";
import {PropertyType} from "./property/property_type/PropertyType";

export abstract class AbstractMessage extends MessageStorage {

    protected constructor(storage: StorageDirectoryEntry) {
        super(storage);
    }

    public attachments(): Attachment[] {
        return this.underlyingDirectoryEntry().storages().filter(storageDirectoryEntry => storageDirectoryEntry.getDirectoryEntryName().startsWith(MessageStorage.ATTACHMENT_STORAGE_PREFIX))
            .filter(storageDirectoryEntry => storageDirectoryEntry.storages().filter(substorage => substorage.getDirectoryEntryName() === MessageStorage.INTERNAL_STORAGE_NAME).length === 0)
            .map(directoryEntry => new Attachment(directoryEntry));
    }

    recipients() {
        return this.underlyingDirectoryEntry().storages().filter(storageDirectoryEntry => storageDirectoryEntry.getDirectoryEntryName().startsWith(Recipient.RECIPIENT_STORAGE_PREFIX))
            .map(directoryEntry => new Recipient(directoryEntry));
    }
}