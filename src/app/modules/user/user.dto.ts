import { IsEmail, IsNotEmpty, IsOptional, Matches } from "class-validator";
import { MessageHelper } from "src/helpers/message.helper";
import { RegexHelper } from "src/helpers/regex.helper";
import { ImageDTO } from "../image/image.dto";

export class UserDTO {
    @IsOptional()
    id?: number;

    @IsNotEmpty()
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @Matches(RegexHelper.password, { message: MessageHelper.passwdValid })
    password?: string;

    @IsOptional()
    type?: number;

    @IsOptional()
    stUser?: boolean;

    @IsOptional()
    phone?: string;

    @IsOptional()
    image?: ImageDTO;

    @IsOptional()
    bio?: string;

    @IsOptional()
    dtBirthday?: Date;

    @IsOptional()
    created?: Date;
}
