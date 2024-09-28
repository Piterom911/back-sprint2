import {Router} from "express"
import {authMiddleware} from "../../../middlewares/auth/auth-middleware";
import {blogValidation} from "../validators/blog-validator";
import {mongoIdParamValidation, mongoIDValidation} from "../validators/id-param-validator";
import {postToBlogValidation} from "../../../validators/post-to-blog-validator";
import {getAllBlogsController} from "../controller/getAllBlogsController";
import {getBlogByIdController} from "../controller/getBlogByIdController";
import {getPostsByBlogIdController} from "../controller/getPostsByBlogIdController";
import {createBlogController} from "../controller/createBlogController";
import {createPostByBlogIdController} from "../controller/createPostByBlogIdController";
import {updateBlogController} from "../controller/updateBlogController";
import {deleteBlogController} from "../controller/deleteBlogController";

export const blogRouter = Router({})

// Blog controllers
blogRouter.get('/', getAllBlogsController)
blogRouter.get('/:id', mongoIdParamValidation(), getBlogByIdController)
blogRouter.post('/', authMiddleware, blogValidation(), createBlogController)
blogRouter.put('/:id', mongoIdParamValidation(), authMiddleware, blogValidation(), updateBlogController)
blogRouter.delete('/:id', mongoIdParamValidation(), authMiddleware, deleteBlogController)

// Blog Post controllers
blogRouter.get('/:id/posts', getPostsByBlogIdController)
blogRouter.post('/:id/posts', authMiddleware, mongoIDValidation, postToBlogValidation(), createPostByBlogIdController)















