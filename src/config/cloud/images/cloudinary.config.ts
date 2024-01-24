import { ConfigOptions } from "cloudinary";
import envConfig from "src/config/env/env.config";

export const CloudinaryCredentials: ConfigOptions = {
    cloud_name: envConfig().cloudinary.name,
    api_key: envConfig().cloudinary.key,
    api_secret: envConfig().cloudinary.secret,
};
