import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compareSync } from "bcrypt";
import { User } from "../user/user";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
    constructor(private _userService: UserService, private _jwtService: JwtService) {}

    async login(user: User) {
        const payload = { sub: user.id, email: user.email };

        return {
            token: this._jwtService.sign(payload),
        };
    }

    async validateUser(email: string, password: string) {
        let user: User;

        try {
            user = await this._userService.findOneOrFail({ where: { email: email } });
        } catch (e) {
            return null;
        }

        const isPasswdValid = compareSync(password, user.password);

        if (!isPasswdValid) return null;

        return user;
    }
}
