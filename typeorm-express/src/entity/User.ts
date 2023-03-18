import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    JoinColumn,
} from "typeorm";
import { Reservation } from "./Reservation";
import { IsEmail, IsNotEmpty } from "class-validator";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    name: string;

    @Column()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Column()
    @IsNotEmpty()
    password: string;

    @OneToMany(() => Reservation, (reservation) => reservation.user)
    @JoinColumn()
    reservations: Reservation[];
}
