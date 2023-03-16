import "reflect-metadata";
import { DataSource } from "typeorm";
import { Address } from "./entity/Address";
import { Hotel } from "./entity/Hotel";
import { Reservation } from "./entity/Reservation";
import { Room } from "./entity/Room";
import { User } from "./entity/User";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3308,
    username: "root",
    password: "root",
    database: "booking",
    synchronize: true,
    logging: false,
    entities: [Address, Hotel, Reservation, Room, User],
    migrations: [],
    subscribers: [],
    namingStrategy: new SnakeNamingStrategy(),
});
