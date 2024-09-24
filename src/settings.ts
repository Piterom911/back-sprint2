export const SETTINGS = {
    port: process.env.PORT || 3000,
    jwt: {
        secret: process.env.JWT_SECRET || 'ee9526dc8df740ad5c89cd465c8a1494aae4a6aa966'
    },
    mongoURI: process.env.MONGO_URI || 'mongodb://0.0.0.0:27017'
}