import { Controller, Post, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { IJwtPaylod } from "./interfaces/jwt-payload.interface";

interface AuthRequest extends Request {
    user: IJwtPaylod;
}

@Controller("api/v1/auth")
export class AuthController {
    constructor(private readonly _authService: AuthService) {}

    @UseGuards(AuthGuard("local"))
    @Post("login")
    async login(@Req() req: AuthRequest) {
        return await this._authService.login(req.user).catch((e) => {
            throw new UnauthorizedException(e);
        });
    }
}
