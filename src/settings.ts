import express, {Request, Response} from 'express'
import {log} from "util";

export const app = express()
app.use(express.json())

const AvailableResolutions = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160']

type VideoDbType = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: number | null,
    createdAt: string,
    publicationDate: string,
    availableResolutions: typeof AvailableResolutions
}

type RequestWithParams<P> = Request<P, {}, {}, {}>
type RequestWithBody<B> = Request<{}, {}, B, {}>
type RequestWithParamsAndBody<P, B> = Request<P, {}, B, {}>

export type CreateVideoType = {
    title: string,
    author: string,
    availableResolutions: typeof AvailableResolutions
}
export type UpdateVideoType = CreateVideoType & {
    canBeDownloaded: boolean,
    minAgeRestriction: number | null,
    publicationDate: string
}
type ErrorMessage = {
    message: string,
    field: string
}

type ErrorType = {
    errorsMessages: ErrorMessage[]
}

export const videoUris = {
    allVideosForTests: '/testing/all-data',
    videos: '/videos',
    videoById: '/videos/:id',
}


let videos: VideoDbType[] = [
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

app.delete(videoUris.allVideosForTests, (req: Request, res: Response) => {
    videos = []
    res.sendStatus(204)
})

app.get('/', (req: Request, res: Response) => {
    res.send("all right")
})
app.get(videoUris.videos, (req: Request, res: Response) => {
    res.send(videos)
})
app.get(videoUris.videoById, (req: RequestWithParams<{ id: string }>, res: Response) => {
    const videoId: number = +req.params.id

    if (!videoId) {
        res.sendStatus(404)
        return
    }

    const targetVideo = videos.find(v => v.id === videoId)

    if (!targetVideo) {
        res.sendStatus(404)
        return
    }
    res.send(targetVideo)
})
app.post(videoUris.videos, (req: RequestWithBody<CreateVideoType>, res: Response) => {
    const errors: ErrorType = {
        errorsMessages: []
    }

    let {title, author, availableResolutions} = req.body

    if (!title || typeof title !== 'string' || !title.trim() || title.length > 40) {
        errors.errorsMessages.push({message: 'Invalid value', field: 'title'})
    }

    if (!author || typeof author !== 'string' || !author.trim() || author.length > 20) {
        errors.errorsMessages.push({message: 'Invalid value', field: 'author'})
    }

    if (availableResolutions && Array.isArray(availableResolutions)) {
        availableResolutions.map(r => {
            !AvailableResolutions.includes(r)
            && errors.errorsMessages.push({message: 'Invalid Resolutions', field: 'availableResolutions'})
        })
    } else {
        availableResolutions = []
    }

    if (errors.errorsMessages.length) {
        res.status(400).send(errors)
        return
    }

    const createdAt: Date = new Date()
    const publicationDate: Date = new Date()

    publicationDate.setDate(createdAt.getDate() + 1)

    const newVideo: VideoDbType = {
        id: +(new Date()),
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: createdAt.toISOString(),
        publicationDate: publicationDate.toISOString(),
        title,
        author,
        availableResolutions
    }

    videos.push(newVideo)

    res.status(201).send(newVideo)
})
app.put(videoUris.videoById, (req: RequestWithParamsAndBody<{ id: string }, UpdateVideoType>, res: Response) => {
    const errors: ErrorType = {
        errorsMessages: []
    }

    try {
        const videoId: number = +req.params.id

        if (!videoId) {
            res.sendStatus(404)
            return
        }

        const targetVideo: VideoDbType | undefined = videos.find(v => v.id === videoId)
        const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/

        if (!targetVideo) {
            res.sendStatus(404)
            return
        }

        let {
            title,
            author,
            availableResolutions,
            canBeDownloaded,
            minAgeRestriction,
            publicationDate
        } = req.body

        if (title) {
            targetVideo.title = title
        } else {
            errors.errorsMessages.push({message: 'Must be', field: 'title'})
        }
        if (title && title.length > 40) errors.errorsMessages.push({message: 'The Title ist to long', field: 'title'})
        if (author && author.length > 20) errors.errorsMessages.push({message: 'The Author Name ist to long', field: 'author'})
        if (minAgeRestriction && minAgeRestriction > 18 || minAgeRestriction && minAgeRestriction < 1) {
            errors.errorsMessages.push({message: 'Check the age', field: 'minAgeRestriction'})
        }
        if (minAgeRestriction) targetVideo.minAgeRestriction = minAgeRestriction
        if (author) {
            targetVideo.author = author
        } else {
            errors.errorsMessages.push({message: 'Must be', field: 'author'})
        }
        if (canBeDownloaded && typeof canBeDownloaded === 'boolean') {
            targetVideo.canBeDownloaded = canBeDownloaded
        } else {
            errors.errorsMessages.push({message: 'Must be a boolean type', field: 'canBeDownloaded'})
        }
        if (availableResolutions) targetVideo.availableResolutions = availableResolutions
        if (publicationDate && isoDateRegex.test(publicationDate)) {
            targetVideo.publicationDate = publicationDate
        } else {
            errors.errorsMessages.push({message: 'Date format is wrong', field: 'publicationDate'})
        }

        if (errors.errorsMessages.length) {
            res.status(400).send(errors)
            return
        }

        res.sendStatus(204)
    } catch (error) {
        console.error('Error in update video data:', error);
        res.sendStatus(500);
    }
})

app.delete(videoUris.videoById, (req: RequestWithParams<{ id: string }>, res: Response) => {
    const videoId: number = +req.params.id

    if (!videoId) {
        res.sendStatus(404)
        return
    }

    const targetVideo: VideoDbType | undefined = videos.find(v => v.id === videoId)

    if (!targetVideo) {
        res.sendStatus(404)
        return
    }

    videos = videos.filter(v => v.id !== videoId)
    res.sendStatus(204)
})
app.delete('/__test__/data', (req: Request, res: Response) => {
    videos = []
    res.sendStatus(404)
})






















