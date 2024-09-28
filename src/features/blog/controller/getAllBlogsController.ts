import {RequestWithQuery, ResponseType} from "../../../models/common";
import {QueryBlogModel} from "../types/query-blog-model";
import {BlogSortType} from "../types/blog-sort-type";
import {QueryBlogRepository} from "../../../repostitories/query-repositories/blog-repository";

export const getAllBlogsController = async (req: RequestWithQuery<QueryBlogModel>, res: ResponseType<BlogSortType>) => {
    const sortData = {
        searchNameTerm: req.query.searchNameTerm,
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize,
    }
    const bloggers: BlogSortType = await QueryBlogRepository.getAllEntities(sortData)
    res.send(bloggers)
}

