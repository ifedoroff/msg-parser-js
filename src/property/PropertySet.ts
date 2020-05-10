import UUID from "pure-uuid";

interface PropertySetList {
    [index: string]: PropertySet
}

export class PropertySet {

    public static readonly PUBLIC_STRINGS = new PropertySet("PS_PUBLIC_STRINGS", new UUID("00020329-0000-0000-C000-000000000046"));
    public static readonly COMMON = new PropertySet("PSETID_Common", new UUID("00062008-0000-0000-C000-000000000046"));
    public static readonly ADDRESS = new PropertySet("PSETID_Address", new UUID("00062004-0000-0000-C000-000000000046"));
    public static readonly HEADERS = new PropertySet("PS_INTERNET_HEADERS", new UUID("00020386-0000-0000-C000-000000000046"));
    public static readonly APPOINTMENT = new PropertySet("PSETID_Appointment", new UUID("00062002-0000-0000-C000-000000000046"));
    public static readonly MEETING = new PropertySet("PSETID_Meeting", new UUID("6ED8DA90-450B-101B-98DA-00AA003F1305"));
    public static readonly LOG = new PropertySet("PSETID_Log", new UUID("0006200A-0000-0000-C000-000000000046"));
    public static readonly MESSAGING = new PropertySet("PSETID_Messaging", new UUID("41F28F13-83F4-4114-A584-EEDB5A6B0BFF"));
    public static readonly NOTE = new PropertySet("PSETID_Note", new UUID("0006200E-0000-0000-C000-000000000046"));
    public static readonly POST_RSS = new PropertySet("PSETID_PostRss", new UUID("00062041-0000-0000-C000-000000000046"));
    public static readonly TASK = new PropertySet("PSETID_Task", new UUID("00062003-0000-0000-C000-000000000046"));
    public static readonly UNIFIED_MESSAGING = new PropertySet("PSETID_UnifiedMessaging", new UUID("4442858E-A9E3-4E80-B900-317A210CC15B"));
    public static readonly PS_MAPI = new PropertySet("PS_MAPI", new UUID("00020328-0000-0000-C000-000000000046"));
    public static readonly AIR_SYNC = new PropertySet("PSETID_AirSync", new UUID("71035549-0739-4DCB-9163-00F0580DBBDF"));
    public static readonly SHARING = new PropertySet("PSETID_Sharing", new UUID("00062040-0000-0000-C000-000000000046"));
    public static readonly XML_EXTR_ENTITIES = new PropertySet("PSETID_XmlExtractedEntities", new UUID("23239608-685D-4732-9C55-4C95CB4E8E33"));
    public static readonly ATTACHMENT = new PropertySet("PSETID_Attachment", new UUID("96357F7F-59E1-47D0-99A7-46515C183B54"));
    public static readonly CALENDAR_ASSISTANT = new PropertySet("PSETID_Attachment", new UUID("11000E07-B51B-40D6-AF21-CAA85EDAB1D0"));

    private static readonly PROPERTY_SETS: PropertySetList = {
        "00020329-0000-0000-C000-000000000046": PropertySet.PUBLIC_STRINGS,
        "00062008-0000-0000-C000-000000000046": PropertySet.COMMON,
        "00062004-0000-0000-C000-000000000046": PropertySet.ADDRESS,
        "00020386-0000-0000-C000-000000000046": PropertySet.HEADERS,
        "00062002-0000-0000-C000-000000000046": PropertySet.APPOINTMENT,
        "6ED8DA90-450B-101B-98DA-00AA003F1305": PropertySet.MEETING,
        "0006200A-0000-0000-C000-000000000046": PropertySet.LOG,
        "41F28F13-83F4-4114-A584-EEDB5A6B0BFF": PropertySet.MESSAGING,
        "0006200E-0000-0000-C000-000000000046": PropertySet.NOTE,
        "00062041-0000-0000-C000-000000000046": PropertySet.POST_RSS,
        "00062003-0000-0000-C000-000000000046": PropertySet.TASK,
        "4442858E-A9E3-4E80-B900-317A210CC15B": PropertySet.UNIFIED_MESSAGING,
        "00020328-0000-0000-C000-000000000046": PropertySet.PS_MAPI,
        "71035549-0739-4DCB-9163-00F0580DBBDF": PropertySet.AIR_SYNC,
        "00062040-0000-0000-C000-000000000046": PropertySet.SHARING,
        "23239608-685D-4732-9C55-4C95CB4E8E33": PropertySet.XML_EXTR_ENTITIES,
        "96357F7F-59E1-47D0-99A7-46515C183B54": PropertySet.ATTACHMENT,
        "11000E07-B51B-40D6-AF21-CAA85EDAB1D0": PropertySet.CALENDAR_ASSISTANT
    };

    static forUUID(uuid: UUID): PropertySet {
        return PropertySet.PROPERTY_SETS[uuid.toString()];
    }

    public readonly id: UUID;
    public readonly name: string;

    constructor(name: string, id: UUID) {
        this.id = id;
        this.name = name;
    }

    toString(): string {
        return this.name + " " + this.id;
    }
}