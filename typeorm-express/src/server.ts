import * as express from "express";
import authRouter from "./router/AuthRouter";
import "./service/passport";
import { initRouter } from "./router/CrudRouter";
import { User } from "./entity/User";
import { Reservation } from "./entity/Reservation";
import { Hotel } from "./entity/Hotel";
import { Room } from "./entity/Room";
import { Address } from "./entity/Address";

const app = express();
app.use(express.json());

app.use("/users", initRouter(User, "saveOne"));

app.use("/reservations", initRouter(Reservation, "saveOne"));

app.use("/addresses", initRouter(Address));

app.use("/hotels", initRouter(Hotel));

app.use("/rooms", initRouter(Room));

app.use("/auth", authRouter);

export default app;
