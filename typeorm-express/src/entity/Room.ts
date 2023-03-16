import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { Hotel } from "./Hotel";
import { Reservation } from "./Reservation";

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    number: number;

    @OneToMany(() => Reservation, (reservation) => reservation.room)
    @JoinColumn()
    reservations: Reservation[];

    @ManyToOne(() => Hotel, (hotel) => hotel.rooms)
    hotel: Hotel;
}
