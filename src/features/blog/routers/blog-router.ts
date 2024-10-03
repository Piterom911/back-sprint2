import {Router} from "express"
import {authMiddleware} from "../../../middlewares/auth/auth-middleware";
import {blogValidation} from "../validators/blog-validator";
import {mongoIdParamValidation} from "../../../middlewares/mongo-id-param-validator";
import {postToBlogValidation} from "../../../validators/post-to-blog-validator";
import {getAllBlogsController} from "../controllers/get-all-blogs-controller";
import {getBlogByIdController} from "../controllers/get-blog-by-id-controller";
import {getPostsByBlogIdController} from "../controllers/get-posts-by-blog-id-controller";
import {createBlogController} from "../controllers/create-blog-controller";
import {createPostByBlogIdController} from "../controllers/create-post-by-blog-id-controller";
import {updateBlogController} from "../controllers/update-blog-controller";
import {deleteBlogController} from "../controllers/delete-blog-controller";

export const blogRouter = Router({})

// Blog controllers
blogRouter.get('/', getAllBlogsController)
blogRouter.get('/:id', mongoIdParamValidation(), getBlogByIdController)
blogRouter.post('/', authMiddleware, blogValidation(), createBlogController)
blogRouter.put('/:id', mongoIdParamValidation(), authMiddleware, blogValidation(), updateBlogController)
blogRouter.delete('/:id', mongoIdParamValidation(), authMiddleware, deleteBlogController)

// Blog Post controllers
blogRouter.get('/:id/posts', getPostsByBlogIdController)
blogRouter.post('/:id/posts', authMiddleware, mongoIdParamValidation(), postToBlogValidation(), createPostByBlogIdController)















