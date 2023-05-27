import { Entity, Column, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Room } from "./Room";
import { User } from "./User";

@Entity()
export class Reservation extends BaseEntity {
    @ManyToOne(() => Room, (room) => room.reservations)
    room: Room;

    @ManyToOne(() => User, (user) => user.reservations)
    user: User;

    @Column({ type: "date" })
    startDate: string;

    @Column({ type: "date" })
    endDate: string;
}
