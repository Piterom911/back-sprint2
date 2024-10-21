import nodemailer from "nodemailer";

export const emailAdapter = {

    async sendEmail(email: string, message: string, subject: string) {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "piterom911@gmail.com",
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        async function main() {
            const info = await transporter.sendMail({
                from: 'dogodadev.de 👻 / <dogodadev@gmail.com>',
                to: email,
                subject: subject,
                html: message,
            });
        }

        await main().catch(console.error);
    }
}