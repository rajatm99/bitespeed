import { configDotenv } from 'dotenv'
import { initDB } from "./db/init_db"
import { startServer } from "./server"

console.log("starting !")

function main(){
    configDotenv()

    startServer()
    
    initDB()
    
}

main()