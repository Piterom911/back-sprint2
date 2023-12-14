import {AvailableVideoResolutions} from "../common";

export type VideoCreateModel = {
    title: string,
    author: string,
    availableResolutions: typeof AvailableVideoResolutions
}
export type VideoUpdateModel = VideoCreateModel & {
    canBeDownloaded: boolean,
    minAgeRestriction: number | null,
    publicationDate: string
}