import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./app/modules/auth/auth.module";
import { UserModule } from "./app/modules/user/user.module";
import MysqlDataSource from "./config/db/datasource";
import ConfigurationSettings from "./config/env/env.config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [ConfigurationSettings],
        }),
        TypeOrmModule.forRoot(MysqlDataSource.options),
        UserModule,
        AuthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
