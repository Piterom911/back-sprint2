import {MongoClient} from "mongodb";
import {BlogDBType, PostDBType, VideoDBType} from "../models/db/db";

const port = 3000

const uri = 'mongodb+srv://piterom911:mongo123@cluster0.njxr62w.mongodb.net' || 'mongodb://0.0.0.0:27017'

const client = new MongoClient(uri)

export const database = client.db('blogs-hws');

export const blogCollection = database.collection<BlogDBType>('blogs')
export const postCollection = database.collection<PostDBType>('posts')
export const videoCollection = database.collection<VideoDBType>('videos')

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