import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    country: string;

    @Column()
    city: string;

    @Column()
    street: string;

    @Column()
    streetNumber: number;
}
