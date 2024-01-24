import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user";

@Entity({ name: "images" })
export class Image {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ nullable: true })
    title?: string;

    @Column({ nullable: true })
    link?: string;

    @Column({ nullable: true })
    publicId?: string;

    @OneToOne(() => User, (user: User) => user.image)
    user: User;

    @CreateDateColumn()
    created: Date;
}
