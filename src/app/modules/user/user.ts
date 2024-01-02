import * as bcrypt from "bcrypt";
import { IsEmail, IsNotEmpty, IsOptional, Matches } from "class-validator";
import { MessageHelper } from "src/helpers/message.helper";
import { RegexHelper } from "src/helpers/regex.helper";
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn("increment")
    id?: number;

    @Column()
    @IsNotEmpty()
    name: string;

    @Column({ unique: true })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Column()
    @IsNotEmpty()
    @Matches(RegexHelper.password, { message: MessageHelper.passwdValid })
    password: string;

    @Column({ nullable: true })
    @IsOptional()
    type?: number;

    @Column({ default: true, nullable: true })
    stUser: boolean;

    @Column({ nullable: true })
    @IsOptional()
    phone?: string;

    @Column({ type: "text", nullable: true })
    @IsOptional()
    bio?: string;

    @Column({ type: "date", nullable: true })
    @IsOptional()
    dtBirthday?: Date;

    @CreateDateColumn()
    @IsOptional()
    created?: Date;

    @BeforeInsert()
    passwordEncrypt() {
        this.password = bcrypt.hashSync(this.password, 10);
    }
}
