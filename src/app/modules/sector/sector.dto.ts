import { IsNotEmpty, IsOptional } from "class-validator";

export class SectorDTO {
    @IsOptional()
    id?: number;

    @IsNotEmpty()
    name?: string;

    @IsOptional()
    created?: Date;
}
