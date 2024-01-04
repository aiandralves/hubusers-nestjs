import { IsEmail, IsNotEmpty, IsOptional, Matches } from "class-validator";
import { MessageHelper } from "src/helpers/message.helper";
import { RegexHelper } from "src/helpers/regex.helper";

export class CreateUserDTO {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsOptional()
    phone?: string;

    @IsNotEmpty()
    @Matches(RegexHelper.password, { message: MessageHelper.passwdValid })
    password: string;
}

export class UpdateUserDTO {
    @IsNotEmpty()
    name: string;

    @IsOptional()
    type?: number;

    @IsOptional()
    stUser: boolean;

    @IsOptional()
    phone?: string;

    @IsOptional()
    bio?: string;

    @IsOptional()
    dtBirthday?: Date;
}
