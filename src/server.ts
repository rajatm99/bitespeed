import express from 'express'

export function startServer() {
    const app = express()

    app.get('/health', function(req, res){
        res.status(200).send({"status" : "OK"})
    })
    
    app.listen(3000, () => {
        console.log("starting server at 3000")
    })    
}

