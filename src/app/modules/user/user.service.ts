import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { Filter } from "src/app/filters/filter.service";
import { DataSource, Like, Repository } from "typeorm";
import { User } from "./user";
import { UserFilter } from "./user.filter";

@Injectable()
export class UserService {
    private readonly _userRepository: Repository<User> = this._dataSource.getRepository(User);

    constructor(@InjectDataSource() private readonly _dataSource: DataSource, private readonly _filter: Filter) {}

    async find(filters?: UserFilter) {
        let search = {};

        if (filters) {
            if (filters.query) {
                search = [{ name: Like(`%${filters.query}%`) }, { email: Like(`%${filters.query}%`) }];
            } else {
                search = this._filter.build(filters);
            }
        }

        return await this._userRepository.find({ where: search });
    }

    async get(id: number): Promise<User> {
        return await this._userRepository.findOne({ where: { id } });
    }

    async findByEmail(email: string): Promise<User> {
        return await this._userRepository.findOne({ where: { email: email } });
    }

    async create(user: User) {
        const email = await this.findByEmail(user.email);

        if (email) throw new Error("E-mail informado já existe.");

        return await this._userRepository.save(this._userRepository.create(user));
    }

    async update(id: number, data: User) {
        const user = await this._userRepository.findOne({ where: { id } });

        if (!user) throw new NotFoundException("Usuário não encontrado.");

        this._userRepository.merge(user, data);
        return await this._userRepository.save(user);
    }

    async delete(id: number) {
        const user = await this._userRepository.findOne({ where: { id } });

        if (!user) throw new NotFoundException("Usuário não encontrado.");

        await this._userRepository.delete(id);
    }
}
