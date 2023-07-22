import { httpResponse } from "../dto/common";
import { Contact, IdentifyContactRequest } from "../dto/contact";
import { createNewContact, getContacts } from "./store";


export async function Identify(request : IdentifyContactRequest) :Promise<httpResponse>{
   
    const resp = await getContacts(request.email, request.phonenumber)
    if(resp.Error){
        return {
            StatusCode : 500,
            ResponseBody : {
                "error" : "error from db"
            }
        } as httpResponse
    }

    if(resp.DbResponse?.length === 0){
        console.log(request.phonenumber)
        const resp = await createNewContact(request.email, request.phonenumber?.toString(), null, 'primary')
        if(resp.Error){
            return {
                StatusCode : 500,
                ResponseBody : {
                    "error" : "error creating new contact"
                }
            } as httpResponse
        }
        const contactDetail : Contact = {
            primaryContactID : resp.DbResponse[0]?.id,
            phoneNumbers : [resp.DbResponse[0].phone_number],
            emails : [resp.DbResponse[0].email],
            secondaryContactIDs : []            
        }
        return {
            StatusCode : 201,
            ResponseBody : contactDetail
        } as httpResponse
    }

    // if email and phonenumber exists and for same contact - return details

    // if email and phonenumber exists and for different contacts
        // if multiple primary - check created at and make primary, others secondary
        // if single primary - return details

    // if only one exists - create a new contact and make it secondary
    
    console.log(resp)
}
