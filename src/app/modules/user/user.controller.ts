import {
    Body,
    ClassSerializerInterceptor,
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
    UseInterceptors,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { User } from "./user";
import { CreateUserDTO, UpdateUserDTO } from "./user.dto";
import { UserFilter } from "./user.filter";
import { UserService } from "./user.service";

interface UserRequest {
    user: User;
}

@Controller("api/v1/users")
export class UserController {
    constructor(private readonly _userService: UserService) {}

    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(AuthGuard("jwt"))
    async find(@Query() filters?: UserFilter) {
        return await this._userService.find(filters);
    }

    @Get(":id")
    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(AuthGuard("jwt"))
    async get(@Param("id") id: number) {
        return await this._userService.get(id);
    }

    @Post()
    async create(@Body() user: CreateUserDTO) {
        return this._userService.create(user).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }

    @Put(":id")
    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(AuthGuard("jwt"))
    async update(@Param("id") id: number, @Body() user: UpdateUserDTO) {
        return this._userService.update(id, user).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(AuthGuard("jwt"))
    async delete(@Param("id") id: number) {
        return this._userService.delete(id).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }
}
