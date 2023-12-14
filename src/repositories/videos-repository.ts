import {db} from "../db/db";
import {VideoModel} from "../models/videos/output";
import {VideoCreateModel, VideoUpdateModel} from "../models/videos/input";

export class VideosRepository {
    static getAllVideos() {
        return db.videos
    }

    static getVideoById(id: string) {
        return (!id || typeof +id !== 'number') ? undefined : db.videos.find(v => v.id === +id)
    }

    static postNewVideo(newVideo: VideoCreateModel) {
        let {title, author, availableResolutions} = newVideo
        const createdAt: Date = new Date()
        const publicationDate: Date = new Date()
        publicationDate.setDate(createdAt.getDate() + 1)

        const createdVideo: VideoModel = {
            id: +(new Date()),
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: createdAt.toISOString(),
            publicationDate: publicationDate.toISOString(),
            title,
            author,
            availableResolutions
        }
        db.videos.push(createdVideo)

        return createdVideo
    }

    static updateVideoById(id: string, body: VideoUpdateModel) {
        const targetVideo = db.videos.find(v => v.id === +id)
        if (!targetVideo || !id || typeof +id !== 'number') {
            return false
        }

        let {
            title,
            author,
            availableResolutions,
            canBeDownloaded,
            minAgeRestriction,
            publicationDate
        } = body

        targetVideo.title = title
        targetVideo.author = author
        if (availableResolutions) targetVideo.availableResolutions = availableResolutions
        if (canBeDownloaded) targetVideo.canBeDownloaded = canBeDownloaded
        if (minAgeRestriction) targetVideo.minAgeRestriction = minAgeRestriction
        if (publicationDate) targetVideo.publicationDate = publicationDate

        return true
    }

    static deleteVideoById(id: string) {
        for (let i = 0; i  < db.videos.length; i++) {
            if (db.videos[i].id === +id) {
                db.videos.splice(i, 1)
                return true
            }
        }
        return false
    }
}