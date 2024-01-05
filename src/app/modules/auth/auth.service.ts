import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compareSync } from "bcrypt";
import { User } from "../user/user";
import { UserService } from "../user/user.service";
import { AuthResponseDTO } from "./auth-response.dto";
import { IJwtPaylod } from "./interfaces/jwt-payload.interface";

@Injectable()
export class AuthService {
    constructor(private _userService: UserService, private _jwtService: JwtService) {}

    async login(payload: IJwtPaylod): Promise<AuthResponseDTO> {
        return {
            token: this._jwtService.sign(payload),
            user: {
                name: payload.name,
                email: payload.email,
            },
        };
    }

    async validateUser(email: string, password: string): Promise<IJwtPaylod> {
        let user: User;
        try {
            user = await this._userService.findOneOrFail({ where: { email } });
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
}
