
import { DB_CLIENT } from "../db/init_db";
import {pg as sqlBuilder} from 'yesql'

const getContactsByEmailAndPhoneNumber = 'SELECT id, phone_number, email, linked_id, link_precedence, created_at FROM contact where'

const createNewContactQuery = 'INSERT INTO contact(phone_number,email,linked_id, link_precedence) VALUES (:phoneNumber , :email , :linkedID , :linkPrecedence) RETURNING id, phone_number, email, linked_id, link_precedence'

interface StoreResponse{
    Error : boolean,
    DbResponse : any
}


export async function createNewContact(email : string, phoneNumber : string, linkedID : string , linkPrecedence : string) : Promise<StoreResponse>{
    let dbResponse : StoreResponse = {
        Error : true,
        DbResponse : {}
    }
    try {
        const resp = await DB_CLIENT.query(sqlBuilder(createNewContactQuery)({
            email : email,
            phoneNumber : phoneNumber,
            linkedID : linkedID,
            linkPrecedence : linkPrecedence
        }))  
        dbResponse.Error = false
        dbResponse.DbResponse = resp?.rows     
    } catch (error) {
        console.log("error querying", error)
        dbResponse.Error = true
    }
    return dbResponse
}

export async function getContacts(email : string, phoneNumber : number) : Promise<StoreResponse>{
    let dbResponse : StoreResponse = {
        Error : true,
        DbResponse : {}
    }
    let whereQ = ""
    let args : any = {}
    if(email && email !== ""){
        whereQ += " email = :email "
        args.email = email
    }

    if(phoneNumber && phoneNumber !== 0){
        if(whereQ.length != 0){
            whereQ += " AND "
        }
        whereQ += " phone_number = :phoneNumber"
        args.phoneNumber = phoneNumber
    }
    const query = getContactsByEmailAndPhoneNumber + whereQ
    console.log(query)
    try {
        const resp = await DB_CLIENT.query(sqlBuilder(query)(args))   
        dbResponse.Error = false
        dbResponse.DbResponse = resp?.rows     
    } catch (error) {
        console.log("error querying", error)
        dbResponse.Error = true
    }
    return dbResponse
}