import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    OneToMany,
} from "typeorm";
import { Address } from "./Address";
import { Room } from "./Room";

@Entity()
export class Hotel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Room, (room) => room.hotel)
    @JoinColumn()
    rooms: Room[];

    @OneToOne(() => Address)
    @JoinColumn()
    address: Address;
}
