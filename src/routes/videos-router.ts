import {Request, Response, Router} from "express";
import {
    AvailableResolutions,
    ErrorType,
    RequestWithBody,
    RequestWithParams,
    RequestWithParamsAndBody
} from "../models/common";
import {app} from "../app";
import {db} from "../db/db";
import {VideoCreateModel, VideoUpdateModel} from "../models/videos/input";
import {VideoModel} from "../models/videos/output";

export const videosRouter = Router({})


videosRouter.get('/', (req: Request, res: Response) => {
    res.send(db.videos)
})
videosRouter.get('/:id', (req: RequestWithParams<{ id: number }>, res: Response) => {
    const videoId: number = +req.params.id

    if (!videoId) {
        res.sendStatus(404)
        return
    }

    const targetVideo = db.videos.find(v => v.id === videoId)

    if (!targetVideo) {
        res.sendStatus(404)
        return
    }
    res.send(targetVideo)
})
videosRouter.post('/', (req: RequestWithBody<VideoCreateModel>, res: Response) => {
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

    const newVideo: VideoModel = {
        id: +(new Date()),
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: createdAt.toISOString(),
        publicationDate: publicationDate.toISOString(),
        title,
        author,
        availableResolutions
    }

    db.videos.push(newVideo)

    res.status(201).send(newVideo)
})
videosRouter.put('/:id', (req: RequestWithParamsAndBody<{ id: string }, VideoUpdateModel>, res: Response) => {
    const errors: ErrorType = {
        errorsMessages: []
    }

    try {
        const videoId: number = +req.params.id

        if (!videoId) {
            res.sendStatus(404)
            return
        }

        const targetVideo: VideoModel | undefined = db.videos.find(v => v.id === videoId)
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

videosRouter.delete('/:id', (req: RequestWithParams<{ id: string }>, res: Response) => {
    const videoId: number = +req.params.id

    if (!videoId) {
        res.sendStatus(404)
        return
    }

    const targetVideo: VideoModel | undefined = db.videos.find(v => v.id === videoId)

    if (!targetVideo) {
        res.sendStatus(404)
        return
    }

    db.videos = db.videos.filter(v => v.id !== videoId)
    res.sendStatus(204)
})
