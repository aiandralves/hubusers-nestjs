import { Controller, Delete, Param } from "@nestjs/common";
import { ImageService } from "./image.service";

@Controller("api/v1/image")
export class ImageController {
    constructor(private readonly _imageService: ImageService) {}

    @Delete("/cloudinary/:id")
    async deleteCloudinaryImage(@Param("id") imageId: number) {
        const image = await this._imageService.findOneOrFail(imageId);
        await this._imageService.deleteCloudinaryImage(image);
    }
}
