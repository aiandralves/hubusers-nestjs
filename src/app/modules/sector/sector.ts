import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user";

@Entity({ name: "sectors" })
export class Sector {
    @PrimaryGeneratedColumn("increment")
    id?: number;

    @Column({ unique: true })
    name: string;

    @OneToMany(() => User, (user: User) => user.sector)
    users: User[];

    @CreateDateColumn()
    created: Date;
}
