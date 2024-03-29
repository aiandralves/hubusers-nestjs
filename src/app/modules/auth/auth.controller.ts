import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { IJwtPaylod } from "./interfaces/jwt-payload.interface";
import { RefreshTokenDTO } from "./refresh-token.dto";

interface AuthRequest extends Request {
    user: IJwtPaylod;
}

@Controller("api/v1/auth")
export class AuthController {
    constructor(private readonly _authService: AuthService) {}

    @UseGuards(AuthGuard("local"))
    @Post("login")
    @HttpCode(HttpStatus.OK)
    async login(@Req() req: AuthRequest) {
        return await this._authService.login(req.user);
    }

    @Post("refresh-token")
    async refreshToken(@Body() body: RefreshTokenDTO) {
        return await this._authService.refreshToken(body.refreshToken);
    }
}
