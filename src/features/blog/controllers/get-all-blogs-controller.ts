import {RequestWithQuery, ResponseType} from "../../../models/common";
import {QueryBlogModel} from "../types/query-blog-model";
import {BlogSortResponseType} from "../types/blog-sort-response-type";
import {QueryBlogRepository} from "../repostitories/query-blog-repository";

export const getAllBlogsController = async (req: RequestWithQuery<QueryBlogModel>, res: ResponseType<BlogSortResponseType>) => {
    const sortData = {
        searchNameTerm: req.query.searchNameTerm,
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize,
    }
    const bloggers: BlogSortResponseType = await QueryBlogRepository.getAllEntities(sortData)
    res.send(bloggers)
}

