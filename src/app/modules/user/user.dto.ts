import { IsEmail, IsNotEmpty, IsOptional, Matches } from "class-validator";
import { MessageHelper } from "src/helpers/message.helper";
import { RegexHelper } from "src/helpers/regex.helper";
import { ImageDTO } from "../image/image.dto";
import { SectorDTO } from "../sector/sector.dto";

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
    stUser?: boolean;

    @IsOptional()
    phone?: string;

    @IsOptional()
    image?: ImageDTO;

    @IsOptional()
    sector?: SectorDTO;

    @IsOptional()
    bio?: string;

    @IsOptional()
    sectorId?: number;

    @IsOptional()
    gnUser?: number;

    @IsOptional()
    dtBirthday?: Date;

    @IsOptional()
    dtHiring?: Date;

    @IsOptional()
    created?: Date;
}
