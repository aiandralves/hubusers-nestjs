import * as bcrypt from "bcrypt";
import { Exclude } from "class-transformer";
import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Image } from "../image/image";

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn("increment")
    id?: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column({ nullable: true })
    type?: number;

    @Column({ default: true, nullable: true })
    stUser: boolean;

    @Column({ nullable: true })
    phone?: string;

    @Column({ nullable: true })
    imageId?: number;

    @OneToOne(() => Image, (image: Image) => image.user, { cascade: true, onUpdate: "CASCADE", onDelete: "CASCADE" })
    @JoinColumn({ name: "imageId", referencedColumnName: "id" })
    image?: Image;

    @Column({ type: "text", nullable: true })
    bio?: string;

    @Column({ type: "date", nullable: true })
    dtBirthday?: Date;

    @CreateDateColumn()
    created?: Date;

    @BeforeInsert()
    passwordEncrypt() {
        this.password = bcrypt.hashSync(this.password, 10);
    }
}
