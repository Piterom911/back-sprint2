import {createMongoMemoryServer} from "../utils/create-mongo-memory-server";
import {CreateEmailModel} from "../../src/features/email/types/create-email-model";
import request from "supertest";
import {app} from "../../src/app";
import {URI_PATHS} from "../../src/constants/uri-paths";

describe("check email endpoints", () => {
    createMongoMemoryServer();

    const emailData: CreateEmailModel = {
        email: "piterom911@gmail.com",
        message: `<h1>This is the second Email that I've sent.</h1>
                  <p>Hello my little friend! I'm so glad to write this message to you...</p>
                  <a href='https://github.com/Piterom911/back-sprint2'>Click me</a>`,
        subject: "Second nodemailer message"
    }

    it("send email and returns the same email data", async () => {
        await request(app)
            .post(URI_PATHS.email)
            .send(emailData)
            .expect(emailData)
    })
})