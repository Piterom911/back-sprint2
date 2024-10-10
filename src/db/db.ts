import {Collection, Db, MongoClient} from "mongodb";
import {BlogDBType, CommentDBType, PostDBType, UserDBType} from "./db-models";
import dotenv from "dotenv";
import {SETTINGS} from "../settings";

dotenv.config()

const port = SETTINGS.port

let client: MongoClient = {} as MongoClient
let  database: Db= {} as Db

export let blogCollection: Collection<BlogDBType> = {} as Collection<BlogDBType>
export let postCollection: Collection<PostDBType> = {} as Collection<PostDBType>
export let userCollection: Collection<UserDBType> = {} as Collection<UserDBType>
export let commentCollection: Collection<CommentDBType> = {} as Collection<CommentDBType>

export const runDb = async (MONGO_URL: string) => {
    try {
        client = new MongoClient(MONGO_URL)
        database = client.db(process.env.DB_NAME);
        blogCollection = database.collection<BlogDBType>('blogs')
        postCollection = database.collection<PostDBType>('posts')
        userCollection = database.collection<UserDBType>('users')
        commentCollection = database.collection<CommentDBType>('comments')

        await client.connect()
        console.log('Client connected to DB')
        console.log(`This App is listening on port ${port}`)
    } catch (error) {
        console.log(`Some error occurred: ${error}`)
        await client.close()
    }
}

export const eraseDB = async() => {
    await blogCollection.deleteMany()
    await postCollection.deleteMany()
    await userCollection.deleteMany()
    await commentCollection.deleteMany()

}