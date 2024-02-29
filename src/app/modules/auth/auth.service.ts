import { BadRequestException, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compareSync } from "bcrypt";
import { MessageHelper } from "src/helpers/message.helper";
import { v4 as uuid } from "uuid";
import { SectorService } from "../sector/sector.service";
import { User } from "../user/user";
import { UserService } from "../user/user.service";
import { IJwtPaylod } from "./interfaces/jwt-payload.interface";
import { IRefreshJwtPayload } from "./interfaces/refresh-token-payload.interface";

@Injectable()
export class AuthService {
    private readonly _logger = new Logger(AuthService.name);

    constructor(
        private _userService: UserService,
        private _jwtService: JwtService,
        private _sectorService: SectorService,
    ) {
        this.createDefaultSector();
    }

    async login(payload: IJwtPaylod) {
        return {
            token: this._generateToken(payload),
            refreshToken: this._generateRefreshToken(payload.sub),
            id: payload.sub,
            name: payload.name,
            email: payload.email,
            link: payload.link,
        };
    }

    async createDefaultSector() {
        this._logger.log("Create default sector");

        const sectors = await this._sectorService.find();
        this._logger.log(`Sectors: ${sectors.length}`);

        if (sectors.length <= 0) {
            await this._sectorService.create({
                name: "Desenvolvimento",
            });
        }
    }

    async refreshToken(refreshToken: string) {
        let payload: IRefreshJwtPayload;
        try {
            payload = this._jwtService.decode(refreshToken, { json: true })["refreshTokenId"] as IRefreshJwtPayload;
        } catch (e) {
            throw new UnauthorizedException();
        }

        const { refreshTokenId } = payload;

        let user: User;

        try {
            user = await this._userService.findOneOrFail({ where: { refreshTokenId } });
        } catch (e) {
            throw new UnauthorizedException();
        }

        const jwtPayload: IJwtPaylod = {
            sub: user.id,
            name: user.name,
            email: user.email,
            link: user?.image?.link,
        };

        return {
            token: this._generateToken(jwtPayload),
            refreshToken: this._generateRefreshToken(user.id),
            id: jwtPayload.sub,
            name: jwtPayload.name,
            email: jwtPayload.email,
            link: jwtPayload.link,
        };
    }

    async validateUser(email: string, password: string): Promise<IJwtPaylod> {
        let user: User;
        try {
            user = await this._userService.findOneOrFail({ where: { email }, relations: { image: true } });
        } catch (e) {
            throw new BadRequestException(MessageHelper.passwdOrEmail);
        }

        const isPasswdValid = compareSync(password, user.password);
        if (!isPasswdValid) throw new BadRequestException(MessageHelper.passwdOrEmail);

        return {
            sub: user.id,
            name: user.name,
            email: user.email,
            link: user.image?.link,
        };
    }

    private _generateToken(user: IJwtPaylod) {
        const payload = { sub: user.sub, email: user.email };
        return this._jwtService.sign(payload);
    }

    private _generateRefreshToken(id: number) {
        const refreshTokenId = uuid();
        const payload = { refreshTokenId };
        this._userService.updateRefreshTokenId(id, refreshTokenId);
        return this._jwtService.sign(payload, { expiresIn: "2h" });
    }
}
