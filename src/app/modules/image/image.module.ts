import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CloudinaryService } from "src/config/cloud/images/cloudinary.service";
import { Image } from "./image";
import { ImageController } from "./image.controller";
import { ImageService } from "./image.service";

@Module({
    imports: [TypeOrmModule.forFeature([Image])],
    providers: [ImageService, CloudinaryService],
    exports: [ImageService],
    controllers: [ImageController],
})
export class ImageModule {}
