import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Hotel } from "./Hotel";
import { Reservation } from "./Reservation";

@Entity()
export class Room extends BaseEntity {
    @Column()
    number: number;

    @OneToMany(() => Reservation, (reservation) => reservation.room, {
        eager: true,
    })
    @JoinColumn()
    reservations: Reservation[];

    @ManyToOne(() => Hotel, (hotel) => hotel.rooms)
    hotel: Hotel;
}
