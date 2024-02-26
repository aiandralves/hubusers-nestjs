import * as bcrypt from "bcrypt";
import { Exclude } from "class-transformer";
import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Image } from "../image/image";
import { Sector } from "../sector/sector";

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
    @Exclude()
    confirmPassword?: string;

    @Column({ default: true, nullable: true })
    stUser: boolean;

    @Column({ nullable: true })
    phone?: string;

    @Column({ nullable: true })
    imageId?: number;

    @OneToOne(() => Image, (image: Image) => image.user, { cascade: true, onUpdate: "CASCADE", onDelete: "CASCADE" })
    @JoinColumn({ name: "imageId", referencedColumnName: "id" })
    image?: Image;

    @Column({ nullable: true })
    sectorId?: number;

    @Column({ nullable: true })
    gnUser?: number;

    @ManyToOne(() => Sector, (sector: Sector) => sector.users, { nullable: true })
    @JoinColumn({ name: "sectorId", referencedColumnName: "id" })
    sector?: Sector;

    @Column({ type: "text", nullable: true })
    bio?: string;

    @Column({ type: "date", nullable: true })
    dtBirthday?: string;

    @Column({ type: "datetime", nullable: true })
    dtHiring?: string;

    @CreateDateColumn()
    created?: Date;

    @Column({ nullable: true })
    refreshTokenId?: string;

    @BeforeInsert()
    passwordEncrypt() {
        this.password = bcrypt.hashSync(this.password, 10);
    }
}
