import { IsOptional } from "class-validator";

export class ImageDTO {
    @IsOptional()
    id?: number;

    @IsOptional()
    title?: string;

    @IsOptional()
    base64src?: string;

    @IsOptional()
    link?: string;

    @IsOptional()
    publicId?: string;

    @IsOptional()
    created?: Date;
}
