import {DBType} from "../models/db/db";

export const db: DBType = {
    blogs: [],
    posts: [],
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