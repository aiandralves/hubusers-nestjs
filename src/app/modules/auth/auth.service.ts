import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compareSync } from "bcrypt";
import { v4 as uuid } from "uuid";
import { User } from "../user/user";
import { UserService } from "../user/user.service";
import { IJwtPayload } from "./interfaces/jwt-payload.interface";
import { IRefreshJwtPayload } from "./interfaces/refresh-jwt-payload.interface";

@Injectable()
export class AuthService {
    constructor(private _userService: UserService, private _jwtService: JwtService) {}

    login(jwtPayload: IJwtPayload) {
        return {
            token: this._generateToken(jwtPayload),
            refreshToken: this._generateRefreshToken(jwtPayload.sub),
        };
    }

    async refreshToken(refreshToken: string) {
        let payload: IRefreshJwtPayload;
        try {
            payload = this._jwtService.decode(refreshToken, { json: true }) as IRefreshJwtPayload;
        } catch (e) {
            throw new UnauthorizedException();
        }

        const { refreshTokenId } = payload;

        console.log(refreshTokenId);

        let user: User;

        console.log("Usuário", user);

        try {
            user = await this._userService.findOneOrFail({ where: { refreshTokenId } });
            console.log(user);
        } catch (e) {
            console.log("Tá caindo aqui");
            throw new UnauthorizedException();
        }

        const jwtPayload: IJwtPayload = {
            sub: user.id,
            name: user.name,
            email: user.email,
        };

        return {
            token: this._generateToken(jwtPayload),
            refreshToken: this._generateRefreshToken(user.id),
        };
    }

    async validateUser(email: string, password: string): Promise<IJwtPayload> {
        let user: User;

        console.log("Usuário Validade", user);

        try {
            user = await this._userService.findOneOrFail({ where: { email } });
            console.log(user);
        } catch (e) {
            return null;
        }

        const isPasswdValid = compareSync(password, user.password);

        if (!isPasswdValid) return null;

        return {
            sub: user.id,
            name: user.name,
            email: user.email,
        };
    }

    private _generateToken(jwtPayload: IJwtPayload) {
        return this._jwtService.sign(jwtPayload);
    }

    private _generateRefreshToken(userId: number) {
        const refreshTokenId = uuid();
        this._userService.updateRefreshTokenId(userId, refreshTokenId);
        const payload: IRefreshJwtPayload = { refreshTokenId };
        return this._jwtService.sign(payload, { expiresIn: "20s" });
    }
}
