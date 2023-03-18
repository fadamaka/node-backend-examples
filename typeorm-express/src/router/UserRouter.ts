import * as express from "express";
import { Router } from "express";
import {
    saveOne,
    getAll,
    getOne,
    updateOne,
    deleteOne,
} from "../controller/UserController";
import * as passport from "passport";

const auth = passport.authenticate("jwt-authentication", { session: false });

const router: Router = express.Router();

router.get("/", auth, getAll);
//router.post("/", saveOne);
router.get("/:id", auth, getOne);
router.put("/:id", auth, updateOne);
router.delete("/:id", auth, deleteOne);

export default router;
