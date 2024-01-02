import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { User } from "../user/user";
import { AuthService } from "./auth.service";

interface AuthRequest extends Request {
    user: User;
}

@Controller("api/v1/auth")
export class AuthController {
    constructor(private readonly _authService: AuthService) {}

    @UseGuards(AuthGuard("local"))
    @Post("login")
    async login(@Req() req: AuthRequest) {
        return await this._authService.login(req.user);
    }
}
