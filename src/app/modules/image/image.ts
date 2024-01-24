import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({ nullable: true })
    imageId?: number;

    @CreateDateColumn()
    created: Date;
}
