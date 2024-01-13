import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { Filter } from "src/app/filters/filter.service";
import { DataSource, FindOneOptions, Like, Repository } from "typeorm";
import { User } from "./user";
import { CreateUserDTO, UpdateUserDTO } from "./user.dto";
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

    async findOneOrFail(options?: FindOneOptions<User>) {
        try {
            return await this._userRepository.findOneOrFail(options);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    async get(id: number): Promise<User> {
        const user = await this._userRepository.findOne({ where: { id } });
        if (!user) throw new NotFoundException("Usuário não encontrado.");
        return user;
    }

    async getImage(id: number): Promise<string | null> {
        const user = await this.get(id);
        return user?.avatar || null;
    }

    async create(user: CreateUserDTO) {
        const email = await this._userRepository.findOne({ where: { email: user.email } });

        if (email) throw new Error("E-mail informado já existe.");

        return await this._userRepository.save(this._userRepository.create(user));
    }

    async update(id: number, data: UpdateUserDTO) {
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
