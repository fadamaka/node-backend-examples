import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Room } from "./Room";
import { User } from "./User";

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Room, (room) => room.reservations)
    room: Room;

    @ManyToOne(() => User, (user) => user.reservations)
    user: User;

    @Column({ type: "date" })
    startDate: string;

    @Column({ type: "date" })
    endDate: string;
}
