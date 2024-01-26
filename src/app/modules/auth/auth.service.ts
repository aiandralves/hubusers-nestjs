import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compareSync } from "bcrypt";
import { MessageHelper } from "src/helpers/message.helper";
import { SectorService } from "../sector/sector.service";
import { User } from "../user/user";
import { UserService } from "../user/user.service";
import { AuthResponseDTO } from "./auth-response.dto";
import { IJwtPaylod } from "./interfaces/jwt-payload.interface";

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

    async login(payload: IJwtPaylod): Promise<AuthResponseDTO> {
        return {
            token: this._jwtService.sign(payload),
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
}
