import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    JoinColumn,
} from "typeorm";
import { Reservation } from "./Reservation";
import { IsNotEmpty } from "class-validator";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    firstName: string;

    @Column()
    @IsNotEmpty()
    lastName: string;

    @Column()
    @IsNotEmpty()
    age: number;

    @OneToMany(() => Reservation, (reservation) => reservation.user)
    @JoinColumn()
    reservations: Reservation[];
}
