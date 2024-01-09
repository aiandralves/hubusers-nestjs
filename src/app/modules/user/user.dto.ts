import { IsEmail, IsNotEmpty, IsOptional, IsUrl, Matches } from "class-validator";
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

    @IsOptional()
    @IsUrl()
    avatar?: string;

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
    @IsUrl()
    avatar?: string;

    @IsOptional()
    bio?: string;

    @IsOptional()
    dtBirthday?: Date;
}
