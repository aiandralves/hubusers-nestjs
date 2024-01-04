import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import * as dotenv from "dotenv";
import envConfig from "src/config/env/env.config";
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
        JwtModule.register({
            privateKey: envConfig().security.jwt.secret,
            signOptions: { expiresIn: "1h" },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JWTStrategy],
    exports: [AuthService],
})
export class AuthModule {}
