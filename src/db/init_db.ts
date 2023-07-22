import {Client} from 'pg'

export let DB_CLIENT

export async function initDB(){
    try{
        DB_CLIENT = new Client({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGNAME,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT
        })
        await DB_CLIENT.connect()
        return DB_CLIENT
    }
    catch{
        console.error("COULDNT INIT DB")
    }
}