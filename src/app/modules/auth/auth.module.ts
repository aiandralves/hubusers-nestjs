import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import * as dotenv from "dotenv";
import envConfig from "src/config/env/env.config";
import { SectorModule } from "../sector/sector.module";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JWTStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";
dotenv.config();

@Module({
    imports: [
        ConfigModule.forRoot(),
        PassportModule,
        UserModule,
        SectorModule,
        JwtModule.register({
            privateKey: envConfig().security.jwt.secret,
            signOptions: { expiresIn: envConfig().security.jwt.expiration },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JWTStrategy],
    exports: [AuthService],
})
export class AuthModule {}
