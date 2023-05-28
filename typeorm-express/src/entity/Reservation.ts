import { Entity, Column, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Room } from "./Room";
import { User } from "./User";
import { IsDateString, IsNotEmpty } from "class-validator";

@Entity()
export class Reservation extends BaseEntity {
    @ManyToOne(() => Room, (room) => room.reservations)
    @IsNotEmpty()
    room: Room;

    @ManyToOne(() => User, (user) => user.reservations)
    @IsNotEmpty()
    user: User;

    @Column({ type: "date" })
    @IsDateString()
    startDate: string;

    @Column({ type: "date" })
    @IsDateString()
    endDate: string;
}
