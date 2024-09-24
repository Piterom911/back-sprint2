import {Collection, MongoClient} from "mongodb";
import {BlogDBType, PostDBType, UserDBType} from "../models/db/db";
import dotenv from "dotenv";
import {SETTINGS} from "../settings";

dotenv.config()

const port = 3000

const uri = SETTINGS.mongoURI

const client = new MongoClient(uri)

export const database = client.db('blogs-hws');

export const blogCollection: Collection<BlogDBType> = database.collection<BlogDBType>('blogs')
export const postCollection: Collection<PostDBType> = database.collection<PostDBType>('posts')
export const userCollection: Collection<UserDBType> = database.collection<UserDBType>('users')

export const runDb = async () => {
    try {
        await client.connect()
        console.log('Client connected to DB')
        console.log(`This App is listening on port ${port}`)
    } catch (error) {
        console.log(`Some error occurred: ${error}`)
        await client.close()
    }
}