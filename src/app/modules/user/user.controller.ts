import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    NotFoundException,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { User } from "./user";
import { UserFilter } from "./user.filter";
import { UserService } from "./user.service";

@Controller("api/v1/users")
@UseGuards(AuthGuard("jwt"))
export class UserController {
    constructor(private readonly _userService: UserService) {}

    @Get()
    async find(@Query() filters?: UserFilter) {
        return await this._userService.find(filters);
    }

    @Get(":id")
    async get(@Param("id") id: number) {
        return await this._userService.get(id);
    }

    @Post()
    async create(@Body() user: User) {
        return this._userService.create(user).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }

    @Put(":id")
    async update(@Param("id") id: number, @Body() user: User) {
        return this._userService.update(id, user).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param("id") id: number) {
        return this._userService.delete(id).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }
}
