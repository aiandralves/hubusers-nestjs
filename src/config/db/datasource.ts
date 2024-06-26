import * as dotenv from "dotenv";
import { Image } from "src/app/modules/image/image";
import { Sector } from "src/app/modules/sector/sector";
import { User } from "src/app/modules/user/user";
import { DataSource } from "typeorm";
import envConfig from "../env/env.config";
dotenv.config();

const MysqlDataSource = new DataSource({
    type: envConfig().database.type,
    host: envConfig().database.host,
    port: Number(envConfig().database.port),
    username: envConfig().database.user,
    password: envConfig().database.password,
    database: envConfig().database.schema,
    entities: [User, Image, Sector],
    synchronize: true,
});

export default MysqlDataSource;
