import {BlogModel} from "../blog/output";
import {PostModel} from "../post/output";
import {VideoModel} from "../videos/output";

export type DBType = {
    blogs: BlogModel[],
    posts: PostModel[],
    videos: VideoModel[]
}
