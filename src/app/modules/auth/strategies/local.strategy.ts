import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { MessageHelper } from "src/helpers/message.helper";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private _authService: AuthService) {
        super({ usernameField: "email" });
    }

    async validate(email: string, password: string) {
        const user = await this._authService.validateUser(email, password);

        if (!user) throw new UnauthorizedException(MessageHelper.passwdOrEmail);

        return user;
    }
}
