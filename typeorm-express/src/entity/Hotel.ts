import { Entity, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Address } from "./Address";
import { BaseEntity } from "./BaseEntity";
import { Room } from "./Room";

@Entity()
export class Hotel extends BaseEntity {
    @Column()
    name: string;

    @OneToMany(() => Room, (room) => room.hotel, { eager: true })
    @JoinColumn()
    rooms: Room[];

    @OneToOne(() => Address, { eager: true })
    @JoinColumn()
    address: Address;
}
