import { Entity, Column, OneToMany, JoinColumn } from "typeorm";
import { Reservation } from "./Reservation";
import { IsEmail, IsNotEmpty } from "class-validator";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class User extends BaseEntity {
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

    @OneToMany(() => Reservation, (reservation) => reservation.user, {
        eager: true,
    })
    @JoinColumn()
    reservations: Reservation[];
}
