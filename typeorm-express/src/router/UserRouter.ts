import * as express from "express";
import { Router } from "express";
import {
    saveOne,
    getAll,
    getOne,
    updateOne,
    deleteOne,
} from "../controller/UserController";

const router: Router = express.Router();

router.get("/", getAll);
router.post("/", saveOne);
router.get("/:id", getOne);
router.put("/:id", updateOne);
router.delete("/:id", deleteOne);

export default router;
