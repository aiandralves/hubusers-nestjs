import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./app/modules/auth/auth.module";
import { ImageModule } from "./app/modules/image/image.module";
import { SectorModule } from "./app/modules/sector/sector.module";
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
        ImageModule,
        SectorModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
