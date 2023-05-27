import { Entity, Column } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Address extends BaseEntity {
    @Column()
    country: string;

    @Column()
    city: string;

    @Column()
    street: string;

    @Column()
    streetNumber: number;
}
