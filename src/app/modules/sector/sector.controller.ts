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
import { SectorDTO } from "./sector.dto";
import { SectorFilter } from "./sector.filter";
import { SectorService } from "./sector.service";

@Controller("api/v1/sector")
export class SectorController {
    constructor(private _sectorService: SectorService) {}

    @Get()
    @UseGuards(AuthGuard("jwt"))
    async find(@Query() filters?: SectorFilter) {
        return await this._sectorService.find(filters);
    }

    @Get(":id")
    @UseGuards(AuthGuard("jwt"))
    async get(@Param("id") id: number) {
        return await this._sectorService.get(id).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }

    @Post()
    @UseGuards(AuthGuard("jwt"))
    async create(@Body() sector: SectorDTO) {
        return this._sectorService.create(sector).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }

    @Put(":id")
    @UseGuards(AuthGuard("jwt"))
    async update(@Param("id") id: number, @Body() sector: SectorDTO) {
        return this._sectorService.update(id, sector).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(AuthGuard("jwt"))
    async delete(@Param("id") id: number) {
        return this._sectorService.delete(id).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }
}
