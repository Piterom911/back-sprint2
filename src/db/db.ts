import {MongoClient} from "mongodb";
import {BlogDBType, DBType, PostDBType, VideoDBType} from "../models/db/db";

const port = 3000

export const db: DBType = {
    blogs: [
        {
            id: 'id12345',
            name: 'Romandus Romius',
            websiteUrl: "https://www.dogodadev.me",
            description: 'this was one of my websites, But now I have nothing('
        },
        {
            id: 'id2',
            name: 'Dogodovich Brauchman',
            websiteUrl: "https://www.mnogonado.me",
            description: 'This will be my first time hiking in the mountains'
        }
    ],
    posts: [
        {
            id: 'id123',
            blogId: 'Some blogId123',
            blogName: 'Blog Name 123',
            title: 'Some post title 123',
            content: 'I want to show you how I can do my work',
            shortDescription: 'I can explain you whatever you want but it can be not true)))'
        },
        {
            id: 'id234',
            blogId: 'Some blogId234',
            blogName: 'Blog Name 234',
            title: 'Some post title 234',
            content: 'Salam popalam',
            shortDescription: 'I would like to add some text here but I do not have any'
        }
    ],
    videos: [
        {
            id: 1,
            title: "The First Video",
            author: "It's me",
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: "2023-12-08T19:46:21.116Z",
            publicationDate: "2023-12-08T19:46:21.116Z",
            availableResolutions: [
                "P144"
            ]
        },
        {
            id: 2,
            title: "Zweites Video",
            author: "Auf jeden Fall bin ich das",
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: "2023-12-08T19:46:21.116Z",
            publicationDate: "2023-12-08T19:46:21.116Z",
            availableResolutions: [
                "P2160"
            ]
        }
    ]
}

const uri = process.env.MONGO_URI || 'mongodb+srv://piterom911:mongo123@cluster0.njxr62w.mongodb.net/' || 'mongodb://localhost:27017';

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