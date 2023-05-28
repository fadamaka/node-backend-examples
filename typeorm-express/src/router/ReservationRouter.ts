import { saveOne } from "../controller/ReservationController";
import { Reservation } from "../entity/Reservation";
import { initRouter } from "./CrudRouter";
import * as passport from "passport";

const auth = passport.authenticate("jwt-authentication", { session: false });

let router = initRouter(Reservation, "saveOne");

router.post("/", auth, saveOne);

export default router;
