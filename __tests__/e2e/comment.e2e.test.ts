import request from 'supertest'
import {app} from "../../src/app";
import {createMongoMemoryServer} from "../utils/create-mongo-memory-server";

const getRequest = () => request(app)

describe('Comment endpoints', () => {
    createMongoMemoryServer();

    let startArrayWithNoComment = {
        pagesCount: 0,
        page: 1,
        pageSize: 10,
        totalCount: 0,
        items: []
    }

})