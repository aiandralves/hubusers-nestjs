export default () => ({
    app: {
        port: Number(process.env.PORT) || 3333,
    },
    database: {
        type: process.env.DB_TYPE as any,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        schema: process.env.DB_SCHEMA,
        password: process.env.DB_PASS,
    },
    security: {
        jwt: {
            expiration: process.env.JWT_EXPIRATION,
            secret: process.env.JWT_SECRET_KEY,
        },
    },
    cloudinary: {
        name: process.env.CLOUDINARY_NAME,
        key: process.env.CLOUDINARY_KEY,
        secret: process.env.CLOUDINARY_SECRET,
        ev: process.env.CLOUDINARY_EV,
        rootFolder: process.env.CLOUDINARY_ROOT_FOLDER,
    },
});
