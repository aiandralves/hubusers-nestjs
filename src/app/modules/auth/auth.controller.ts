import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { IJwtPayload } from "./interfaces/jwt-payload.interface";
import { RefreshTokenDTO } from "./refresh-token.dto";

interface AuthRequest extends Request {
    user: IJwtPayload;
}

@Controller("api/v1/auth")
export class AuthController {
    constructor(private readonly _authService: AuthService) {}

    @UseGuards(AuthGuard("local"))
    @Post("login")
    @HttpCode(HttpStatus.OK)
    login(@Req() req: AuthRequest) {
        return this._authService.login(req.user);
    }

    @Post("refresh-token")
    async refreshToken(@Body() body: RefreshTokenDTO) {
        return await this._authService.refreshToken(body.refreshToken);
    }
}
