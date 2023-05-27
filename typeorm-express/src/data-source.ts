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
    host: process.env.DB_URL,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Address, Hotel, Reservation, Room, User],
    migrations: [],
    subscribers: [],
    namingStrategy: new SnakeNamingStrategy(),
});
