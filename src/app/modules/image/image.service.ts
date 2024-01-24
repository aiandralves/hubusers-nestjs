import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { CloudinaryService } from "src/config/cloud/images/cloudinary.service";
import { DataSource, Repository } from "typeorm";
import { Image } from "./image";
import { ImageDTO } from "./image.dto";

@Injectable()
export class ImageService {
    private readonly _imageRepository: Repository<Image> = this._dataSource.getRepository(Image);

    constructor(
        @InjectDataSource() private readonly _dataSource: DataSource,
        private _cloudService: CloudinaryService,
    ) {}

    async save(image: ImageDTO) {
        return await this._imageRepository.save(this._imageRepository.create(image));
    }

    async deleteImage(image: ImageDTO) {
        try {
            const cloudinaryDestroyExecution = await this._cloudService.deleteCloudinaryImage(image);
            console.log(cloudinaryDestroyExecution);

            await this._imageRepository.delete(image.id);
        } catch (error) {
            console.error(error);
        }
    }
}
