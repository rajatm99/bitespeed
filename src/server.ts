import express from 'express'
import bodyParser from 'body-parser'
import { HandleIdentify } from './contact/http_handler'

export function startServer() {
    const app = express()
    app.use(bodyParser.json());

    app.post('/identify', async function(req, res){
        const resp = HandleIdentify(req)
        res.status(resp.StatusCode).send(resp.ResponseBody)
    })

    app.get('/health', function(req, res){
        res.status(200).send({"status" : "OK"})
    })
    
    app.listen(3000, () => {
        console.log("starting server at 3000")
    })    
}

