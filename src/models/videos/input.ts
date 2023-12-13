import {AvailableResolutions} from "../common";

export type VideoCreateModel = {
    title: string,
    author: string,
    availableResolutions: typeof AvailableResolutions
}
export type VideoUpdateModel = VideoCreateModel & {
    canBeDownloaded: boolean,
    minAgeRestriction: number | null,
    publicationDate: string
}