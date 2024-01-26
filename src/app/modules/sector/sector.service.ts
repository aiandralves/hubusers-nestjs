import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { Filter } from "src/app/filters/filter.service";
import { DataSource, Repository } from "typeorm";
import { Sector } from "./sector";
import { SectorDTO } from "./sector.dto";
import { SectorFilter } from "./sector.filter";

@Injectable()
export class SectorService {
    private readonly _sectorRepository: Repository<Sector> = this._dataSource.getRepository(Sector);

    constructor(@InjectDataSource() private readonly _dataSource: DataSource, private _filter: Filter) {}

    async find(filters?: SectorFilter): Promise<Sector[]> {
        return await this._sectorRepository.find({ where: this._filter.build(filters) });
    }

    async get(id: number): Promise<Sector> {
        const user = await this._sectorRepository.findOne({ where: { id } });
        if (!user) throw new NotFoundException("Setor não encontrado.");
        return user;
    }

    async create(sector: SectorDTO) {
        const name = await this._sectorRepository.findOne({ where: { name: sector.name } });
        if (name) throw new BadRequestException("Nome do setor informado já existe.");
        return await this._sectorRepository.save(this._sectorRepository.create(sector));
    }

    async update(id: number, data: SectorDTO) {
        const sector = await this._sectorRepository.findOne({ where: { id } });
        if (!sector) throw new NotFoundException("Setor não encontrado.");

        this._sectorRepository.merge(sector, data);
        return await this._sectorRepository.save(sector);
    }

    async delete(id: number) {
        const sector = await this._sectorRepository.findOne({ where: { id } });
        if (!sector) throw new NotFoundException("Setor não encontrado.");
        await this._sectorRepository.delete(id);
    }
}
