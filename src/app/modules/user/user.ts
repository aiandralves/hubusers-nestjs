import * as bcrypt from "bcrypt";
import { Exclude } from "class-transformer";
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

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
