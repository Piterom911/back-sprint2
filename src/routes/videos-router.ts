import {Request, Response, Router} from "express";
import {
    AvailableVideoResolutions,
    ErrorType, HTTP_REQUEST_STATUS,
    RequestWithBody,
    RequestWithParams,
    RequestWithParamsAndBody
} from "../models/common";
import {app} from "../app";
import {db} from "../db/db";
import {VideoCreateModel, VideoUpdateModel} from "../models/videos/input";
import {OutputVideoType} from "../models/videos/output";
import {VideosRepository} from "../repositories/videos-repository";
import {videoUpdateValidation, videoValidation} from "../validators/video-validator";

export const videosRouter = Router({})


videosRouter.get('/', (req: Request, res: Response) => {
    res.send(VideosRepository.getAllVideos())
})
videosRouter.get('/:id', (req: RequestWithParams<{ id: string }>, res: Response) => {
    const targetVideo = VideosRepository.getVideoById(req.params.id)

    if (!targetVideo) {res.sendStatus(HTTP_REQUEST_STATUS.NOT_FOUND)} else {res.send(targetVideo)}
})
videosRouter.post('/', videoValidation(), (req: RequestWithBody<VideoCreateModel>, res: Response) => {
    const result = VideosRepository.postNewVideo(req.body)

    res.status(HTTP_REQUEST_STATUS.CREATED).send(result)
})
videosRouter.put('/:id', videoUpdateValidation(), videoValidation(), (req: RequestWithParamsAndBody<{ id: string }, VideoUpdateModel>, res: Response) => {
    try {
        const isVideoUpdated = VideosRepository.updateVideoById(req.params.id, req.body)
        !isVideoUpdated ? res.sendStatus(HTTP_REQUEST_STATUS.NOT_FOUND) : res.sendStatus(HTTP_REQUEST_STATUS.NO_CONTENT)
    } catch (error) {
        console.error('Error in update video data:', error);
        res.sendStatus(500);
    }
})

videosRouter.delete('/:id', (req: RequestWithParams<{ id: string }>, res: Response) => {
    const videoId: string = req.params.id

    const deleteResult = VideosRepository.deleteVideoById(videoId)
    deleteResult ? res.sendStatus(HTTP_REQUEST_STATUS.NO_CONTENT) : res.sendStatus(HTTP_REQUEST_STATUS.NOT_FOUND)
})
