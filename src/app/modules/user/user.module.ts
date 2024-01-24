import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Filter } from "src/app/filters/filter.service";
import { CloudinaryService } from "src/config/cloud/images/cloudinary.service";
import { Image } from "../image/image";
import { ImageService } from "../image/image.service";
import { User } from "./user";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [TypeOrmModule.forFeature([User, Image])],
    providers: [UserService, Filter, ImageService, CloudinaryService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}
