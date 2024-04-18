import { Client } from 'pg';
import dotenv from 'dotenv'


dotenv.config();

const client = new Client({
    user: process.env.DBUSER,
    host: process.env.DBHOST,
    database: process.env.DATABASE,
    password: process.env.DBPASS,
    port: process.env.DBPORT as number | undefined
});

async function connect() {
    try {
        await client.connect()
        console.log('Connecting to PostgreSQL')
    } catch (error) {
        console.error('Error connecting to PosgreSQL:', error)
    }
}
connect()

export function getClient(): Client {
    return client;
}