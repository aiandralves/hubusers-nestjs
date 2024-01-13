import { diskStorage } from "multer";
import { v4 as uuid } from "uuid";
import path = require("path");

export const StorageHelper = {
    storage: diskStorage({
        destination: "./upload/avatar",
        filename: (req, file, cb) => {
            const filename: string = path.parse(file.originalname).name.replace(/\s/g, "") + uuid();
            const extension: string = path.parse(file.originalname).ext;

            cb(null, `${filename}${extension}`);
        },
    }),
};
