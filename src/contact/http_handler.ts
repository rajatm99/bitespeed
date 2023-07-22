import { httpResponse } from "../dto/common"
import { IdentifyContactRequest } from "../dto/contact"
import { Identify } from "./contact"

export async function HandleIdentify(req) :Promise<httpResponse>{
    const body = req.body as IdentifyContactRequest
    
    if(!(body?.email || body?.phonenumber)){
        const response : httpResponse = {
            StatusCode : 400,
            ResponseBody : {
                "error" : "fields are missing"
            }
        }
       return response
    }
    
    const response =  await Identify(body)

    return response

}