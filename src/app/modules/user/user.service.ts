import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";

import { Filter } from "src/app/filters/filter.service";

import { CloudinaryService } from "src/config/cloud/images/cloudinary.service";
import { DataSource, FindOneOptions, Like, Repository } from "typeorm";
import { v4 as uuid } from "uuid";
import { ImageService } from "../image/image.service";
import { User } from "./user";
import { UserDTO } from "./user.dto";
import { UserFilter } from "./user.filter";

@Injectable()
export class UserService {
    private readonly _userRepository: Repository<User> = this._dataSource.getRepository(User);

    constructor(
        @InjectDataSource() private readonly _dataSource: DataSource,
        private readonly _filter: Filter,
        private _cloudService: CloudinaryService,
        private _imageService: ImageService,
    ) {}

    async find(filters?: UserFilter) {
        let search = {};

        if (filters) {
            if (filters.query) {
                search = [{ name: Like(`%${filters.query}%`) }, { email: Like(`%${filters.query}%`) }];
            } else {
                search = this._filter.build(filters);
            }
        }

        return await this._userRepository.find({ where: search, relations: ["image"] });
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

    async create(user: UserDTO) {
        const email = await this._userRepository.findOne({ where: { email: user.email } });
        if (email) throw new BadRequestException("E-mail informado já existe.");

        user = await this._saveCloudinaryImage(user);
        return await this._userRepository.save(this._userRepository.create(user));
    }

    async update(id: number, user: UserDTO) {
        await this.get(id);
        user = await this._saveCloudinaryImage(user);
        return await this._userRepository.save(user);
    }

    async delete(id: number) {
        const user = await this._userRepository.findOne({ where: { id } });
        if (!user) throw new NotFoundException("Usuário não encontrado.");
        await this._userRepository.delete(id);
        await this._imageService.deleteImage(user.image);
    }

    private async _saveCloudinaryImage(user: UserDTO) {
        console.log(user);
        if (user.image.base64src) {
            user.image.title = uuid().concat(`_${user.image.title}`);
            console.log(user.image.title);
            user.image = await this._cloudService.uploadImageDto(user.image, `/${user.name}`);
            await this._imageService.save(user.image);
        }
        return user;
    }
}
