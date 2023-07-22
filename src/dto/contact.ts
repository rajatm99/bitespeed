
export interface IdentifyContactRequest {
    email ? : string,
    phonenumber ? : number
}

export interface Contact {
    primaryContactID : number,
    emails : string[],
    phoneNumbers : string[],
    secondaryContactIDs : number[]
}

export interface IdentifyContactResponse {
    contact : Contact
}