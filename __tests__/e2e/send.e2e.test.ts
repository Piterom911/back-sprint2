import {createMongoMemoryServer} from "../utils/create-mongo-memory-server";
import {CreateEmailModel} from "../../src/features/email/types/create-email-model";
import request from "supertest";
import {app} from "../../src/app";
import {URI_PATHS} from "../../src/constants/uri-paths";

describe("send email endpoints", () => {
    createMongoMemoryServer();

    it("returns the same email data object that was sent", async () => {
        const emailData: CreateEmailModel = {
            email: "here should be an email address",
            message: "Hello my little friend! I'm so glad to write you this message...",
            subject: "My Happiness"
        }

        request(app)
            .post(URI_PATHS.email)
            .send(emailData)
            .expect(emailData)
    })
})