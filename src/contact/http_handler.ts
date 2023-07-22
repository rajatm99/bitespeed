import { httpResponse } from "../dto/common"
import { IdentifyContactRequest } from "../dto/contact"

export function HandleIdentify(req) : httpResponse{
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
    

}