import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Filter } from "src/app/filters/filter.service";
import { User } from "../user/user";
import { Sector } from "./sector";
import { SectorController } from "./sector.controller";
import { SectorService } from "./sector.service";

@Module({
    imports: [TypeOrmModule.forFeature([User, Sector])],
    providers: [SectorService, Filter],
    controllers: [SectorController],
    exports: [SectorService],
})
export class SectorModule {}
