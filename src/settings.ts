import express, {Request, Response} from 'express'

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

const videos: VideoDbType[] = [
    {
        id: 0,
        title: "string",
        author: "string",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2023-12-08T19:46:21.116Z",
        publicationDate: "2023-12-08T19:46:21.116Z",
        availableResolutions: [
            "P144"
        ]
    }
]

type RequestWithParams<P> = Request<P, {}, {}, {}>
type RequestWithBody<B> = Request<{}, {}, B, {}>

type CreateVideoType = {
    title: string,
    author: string,
    availableResolutions: typeof AvailableResolutions
}

type ErrorMessage = {
    message: string,
    field: string
}

type ErrorType = {
    errorMessages: ErrorMessage[]
}

app.get('/videos', (req: Request, res: Response) => {
    res.send(videos)
})

app.get('/videos/:id', (req: RequestWithParams<{id: string }>, res: Response) => {
    const videoId: number = +req.params.id

    if (!videoId) {
        res.sendStatus(404)
        return
    }

    res.send(videos.find(v => v.id === videoId))
})

app.post('/videos', (req: RequestWithBody<CreateVideoType>, res: Response) => {
    const errors: ErrorType = {
        errorMessages: [

        ]
    }

    let {title, author, availableResolutions } = req.body

    if (!title || typeof title !== 'string' || !title.trim() || title.length > 40) {
        errors.errorMessages.push({message: 'Invalid value', field: 'title'})
    }

    if (!author || typeof author !== 'string' || !author.trim() || author.length > 20) {
        errors.errorMessages.push({message: 'Invalid value', field: 'author'})
    }

    if (availableResolutions && Array.isArray(availableResolutions)) {
        availableResolutions.map(r => {
            !AvailableResolutions.includes(r)
            && errors.errorMessages.push({message: 'Invalid Resolutions', field: 'Available Resolutions'})
        })
    } else {
        availableResolutions = []
    }

    if (errors.errorMessages.length) res.status(400).send(errors)

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
























