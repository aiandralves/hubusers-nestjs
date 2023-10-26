import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Filter } from "src/app/filters/filter.service";
import { User } from "./user";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService, Filter],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}
